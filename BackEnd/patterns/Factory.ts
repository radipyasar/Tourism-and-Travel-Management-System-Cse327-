import { Login, EmailLogin, PhoneLogin, AdminEmailLOgin, AdminPhoneLogin } from "./Strategy";

export enum Strategy {
    phone,
    email,
    aphone,
    aemail
}

export abstract class LoginFactory {
    abstract createLogin():Login;
}

export class EmailLoginFctory extends LoginFactory{
    createLogin(): Login {
        return new EmailLogin();
    }
}

export class PhoneLoginFactory extends LoginFactory{
    createLogin(): Login {
        return new PhoneLogin();
    }
}

export class AdminEmailLOginFactory extends LoginFactory {
    createLogin(): Login {
        return new AdminEmailLOgin();
    }
}

export class AdminPhoneLoginFactory extends LoginFactory {
    createLogin(): Login {
        return new AdminPhoneLogin();
    }
}

export class FactorRegistry {
    private static instance: FactorRegistry;
    private factories: Map<Strategy,LoginFactory>;

    private constructor(){
        this.factories = new Map();
    }

    public static getInstance():FactorRegistry{
        if(!FactorRegistry.instance){
            FactorRegistry.instance = new FactorRegistry();
        }
        return FactorRegistry.instance;
    }

    public registerFactory(strategy:Strategy,factory:LoginFactory):void {
        this.factories.set(strategy,factory);
    }

    public getFactory(strategy:Strategy):LoginFactory | undefined {
        return this.factories.get(strategy);
    }
    public static finalizeFactories():void{
        const registry = FactorRegistry.getInstance();
        registry.registerFactory(Strategy.phone, new PhoneLoginFactory());
        registry.registerFactory(Strategy.email, new EmailLoginFctory());
        registry.registerFactory(Strategy.aphone, new AdminPhoneLoginFactory());
        registry.registerFactory(Strategy.aemail, new AdminEmailLOginFactory());
    }
}
