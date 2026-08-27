//Regression test suite - runs without a live MySQL server.
//The Singleton is filled with a fake connection before any query happens,
//so every SQL statement is recorded instead of executed.

import Database from "./db";
import { PackageBuilder } from "./patterns/Builder";
import { FactorRegistry, Strategy } from "./patterns/Factory";
import { EmailLogin, PhoneLogin, AdminEmailLOgin, AdminPhoneLogin } from "./patterns/Strategy";
import GuestService from "./services/GuestService";
import BookingService from "./services/BookingService";
import PackageService from "./services/PackageService";

// ---------------------------------------------------------------- fake database

type QueryRecord = { sql: string; values: any[] };

class FakeConnection {

    public log: QueryRecord[] = [];
    private handlers: { match: string; result: any }[] = [];

    public reset(): void {
        this.log = [];
        this.handlers = [];
    }

    //Whenever a query contains "match", hand back "result".
    public on(match: string, result: any): void {
        this.handlers.push({ match, result });
    }

    //Same shape mysql2 uses: query(sql,cb) or query(sql,values,cb).
    public query(sql: string, valuesOrCallback: any, maybeCallback?: any): void {

        const callback = typeof valuesOrCallback === "function" ? valuesOrCallback : maybeCallback;
        const values = typeof valuesOrCallback === "function" ? [] : valuesOrCallback;

        this.log.push({ sql, values });

        const handler = this.handlers.find((h) => sql.indexOf(h.match) !== -1);
        const result = handler ? handler.result : { insertId: 1, affectedRows: 1 };

        callback(null, result);
    }

    //Every statement that ran, joined together - handy for substring checks.
    public all(): string {
        return this.log.map((entry) => entry.sql).join(" | ");
    }

    //Safe accessors, so a missing row fails one check instead of aborting the test.
    public sqlAt(index: number): string {
        const entry = this.log[index];
        return entry ? entry.sql : "<no statement>";
    }

    public valuesAt(index: number): any[] {
        const entry = this.log[index];
        return entry ? entry.values : [];
    }
}

const fakeDb = new FakeConnection();

//Pre-load the Singleton so getInstance() never builds a real connection.
(Database as any).instance = { getConnection: () => fakeDb };

// ---------------------------------------------------------------- tiny test harness

let passed: number = 0;
let failed: number = 0;
let currentTest: string = "";

function test(name: string, body: () => void): void {
    currentTest = name;
    fakeDb.reset();
    console.log("\n" + name);
    try {
        body();
    } catch (e) {
        failed++;
        console.log("   FAIL  " + currentTest + " threw: " + e);
    }
}

function check(label: string, condition: boolean): void {
    if (condition) {
        passed++;
        console.log("   PASS  " + label);
    } else {
        failed++;
        console.log("   FAIL  " + label);
    }
}

function equals(label: string, actual: any, expected: any): void {
    check(label + "  (expected " + expected + ", got " + actual + ")", actual === expected);
}

// ---------------------------------------------------------------- 1. Builder

test("TEST 1 - PackageBuilder.build()  [Builder pattern]", () => {

    //(cost_per_night x days) + (travel_cost x 2)
    const travelPackage = new PackageBuilder()
        .setDestination("Cox's Bazar")
        .setHotel("Sea Palace")
        .setTransportation("Bus")
        .setCompany("Green Line")
        .setDays(4)
        .setCostPerNight(5000)
        .setTravelCost(3000)
        .build();

    equals("cost formula", travelPackage.getCost(), 26000);
    equals("destination kept", travelPackage.getDestination(), "Cox's Bazar");
    equals("hotel kept", travelPackage.getHotel(), "Sea Palace");
    equals("transportation kept", travelPackage.getTransportation(), "Bus");
    equals("company kept", travelPackage.getCompany(), "Green Line");
    equals("days kept", travelPackage.getDays(), 4);

    //A zero-day package must not silently borrow the previous total.
    const empty = new PackageBuilder().setDays(0).setCostPerNight(5000).setTravelCost(3000).build();
    equals("zero days still charges return ticket", empty.getCost(), 6000);
});

// ---------------------------------------------------------------- 2. Factory

test("TEST 2 - FactorRegistry.getFactory()  [Factory pattern]", () => {

    FactorRegistry.finalizeFactories();
    const registry = FactorRegistry.getInstance();

    check("email key builds EmailLogin",
        registry.getFactory(Strategy.email)!.createLogin() instanceof EmailLogin);

    check("phone key builds PhoneLogin",
        registry.getFactory(Strategy.phone)!.createLogin() instanceof PhoneLogin);

    check("aemail key builds AdminEmailLOgin",
        registry.getFactory(Strategy.aemail)!.createLogin() instanceof AdminEmailLOgin);

    check("aphone key builds AdminPhoneLogin",
        registry.getFactory(Strategy.aphone)!.createLogin() instanceof AdminPhoneLogin);

    //An unregistered key must come back empty, not fall through to a default.
    check("unknown key returns undefined",
        registry.getFactory(99 as Strategy) === undefined);

    //The registry itself is a Singleton.
    check("registry is a Singleton",
        FactorRegistry.getInstance() === registry);
});

// ---------------------------------------------------------------- 3. Login

test("TEST 3 - GuestService.login()  [Strategy pattern]", () => {

    fakeDb.on("FROM users WHERE email", [{ user_id: 3, name: "Rafi", email: "rafi@mail.com" }]);
    fakeDb.on("FROM users WHERE phone", [{ user_id: 3, name: "Rafi", phone: "01711111111" }]);

    let emailUser: any = undefined;
    GuestService.login("rafi@mail.com", "1234", "email", (_err: Error | null, user: any) => {
        emailUser = user;
    });

    check("email strategy queries the email column",
        fakeDb.all().indexOf("FROM users WHERE email = ?") !== -1);
    equals("email strategy binds medium then password", String(fakeDb.valuesAt(0)), "rafi@mail.com,1234");
    equals("email login returns the row", emailUser ? emailUser.user_id : null, 3);

    fakeDb.log = [];

    let phoneUser: any = undefined;
    GuestService.login("01711111111", "1234", "phone", (_err: Error | null, user: any) => {
        phoneUser = user;
    });

    check("phone strategy queries the phone column",
        fakeDb.all().indexOf("FROM users WHERE phone = ?") !== -1);
    equals("phone login returns the row", phoneUser ? phoneUser.user_id : null, 3);

    //Wrong password - no rows - must be null, never an object.
    fakeDb.reset();
    fakeDb.on("FROM users WHERE email", []);

    let noUser: any = "not set";
    GuestService.login("rafi@mail.com", "wrong", "email", (_err: Error | null, user: any) => {
        noUser = user;
    });
    equals("bad credentials return null", noUser, null);

    //An unknown strategy name must be rejected by the registry.
    let strategyError: Error | null = null;
    GuestService.login("rafi@mail.com", "1234", "facebook", (err: Error | null) => {
        strategyError = err;
    });
    check("unknown strategy is rejected", strategyError !== null);
});

// ---------------------------------------------------------------- 4. Booking

test("TEST 4 - BookingService.createBooking()  [Decorator pattern]", () => {

    fakeDb.on("INSERT INTO booking", { insertId: 55 });
    fakeDb.on("UPDATE booking SET guide", { affectedRows: 1 });
    fakeDb.on("INSERT INTO payment", { insertId: 9 });

    //Guide requested - plain booking is wrapped, so the row gets updated after insert.
    let withGuide: any = null;
    BookingService.createBooking(3, 7, true, "bKash", 26000, (_err: Error | null, result: any) => {
        withGuide = result;
    });

    equals("three statements run with a guide", fakeDb.log.length, 3);
    check("booking inserted first", fakeDb.sqlAt(0).indexOf("INSERT INTO booking") !== -1);
    check("decorator adds the guide", fakeDb.sqlAt(1).indexOf("UPDATE booking SET guide = TRUE") !== -1);
    equals("guide update targets the new booking_id", fakeDb.valuesAt(1)[0], 55);
    check("payment recorded last", fakeDb.sqlAt(2).indexOf("INSERT INTO payment") !== -1);
    equals("booking confirmed", withGuide ? withGuide.message : null, "Booking confirmed");

    //No guide - the decorator must not run at all.
    fakeDb.log = [];
    BookingService.createBooking(3, 7, false, "bKash", 26000, () => { });

    equals("two statements without a guide", fakeDb.log.length, 2);
    check("no guide update is issued", fakeDb.all().indexOf("UPDATE booking SET guide") === -1);

    //Backend validation must not depend on the React form.
    fakeDb.log = [];
    let missingFieldError: Error | null = null;
    BookingService.createBooking(3, 7, false, "", 26000, (err: Error | null) => {
        missingFieldError = err;
    });

    check("empty payment method is rejected", missingFieldError !== null);
    equals("nothing is written when validation fails", fakeDb.log.length, 0);
});

// ---------------------------------------------------------------- 5. Package creation

test("TEST 5 - PackageService.createPackage()  [Builder + Observer]", () => {

    fakeDb.on("SELECT cost_per_night FROM hotel", [{ cost_per_night: 5000 }]);
    fakeDb.on("SELECT cost FROM transportation", [{ cost: 3000 }]);
    fakeDb.on("INSERT INTO package", { insertId: 7 });
    fakeDb.on("SELECT user_id FROM subscribers", [{ user_id: 1 }, { user_id: 2 }]);
    fakeDb.on("INSERT INTO updates", { insertId: 1 });

    let created: any = null;
    PackageService.createPackage("Cox's Bazar", "Sea Palace", "Bus", "Green Line", 4, (_err: Error | null, result: any) => {
        created = result;
    });

    equals("cost built from looked-up prices", created ? created.cost : null, 26000);
    check("package row inserted", fakeDb.all().indexOf("INSERT INTO package") !== -1);

    //Observer - both subscribers get their own row in updates.
    const updateRows = fakeDb.log.filter((entry) => entry.sql.indexOf("INSERT INTO updates") !== -1);
    equals("one update per subscriber", updateRows.length, 2);
    equals("first subscriber notified", updateRows[0] ? updateRows[0].values[0] : null, 1);
    equals("second subscriber notified", updateRows[1] ? updateRows[1].values[0] : null, 2);
    equals("message names the destination", updateRows[0] ? updateRows[0].values[1] : null, "New Package Added: Cox's Bazar");

    //A hotel that is not in the table must stop the whole flow.
    fakeDb.reset();
    fakeDb.on("SELECT cost_per_night FROM hotel", []);

    let hotelError: Error | null = null;
    PackageService.createPackage("Sylhet", "Ghost Hotel", "Bus", "Green Line", 3, (err: Error | null) => {
        hotelError = err;
    });

    check("unknown hotel is rejected", hotelError !== null);
    check("no package is inserted after a failed lookup", fakeDb.all().indexOf("INSERT INTO package") === -1);

    //Missing days must be caught before any query runs.
    fakeDb.reset();
    let daysError: Error | null = null;
    PackageService.createPackage("Sylhet", "Sea Palace", "Bus", "Green Line", 0, (err: Error | null) => {
        daysError = err;
    });

    check("zero days is rejected", daysError !== null);
    equals("no query runs when validation fails", fakeDb.log.length, 0);
});

// ---------------------------------------------------------------- summary

console.log("\n----------------------------------------");
console.log("Passed: " + passed + "   Failed: " + failed);
console.log("----------------------------------------");

process.exit(failed === 0 ? 0 : 1);