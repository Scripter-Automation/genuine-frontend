import { UserCredential } from "firebase/auth";
import { WhereFilterOp } from "firebase/firestore";

// global.d.ts
type Profile ={
    email:string,
    identifier:string,
    role:string[],
    uid:string,
    expiration:number
    user_name?:string,
    telephone?:number,
}

interface ExpiringCredential extends UserCredential {
    expiration: number;
}

type Account ={
    account_num:number,
    bank:string,
    owner_id:string
}

type QueryParams = {
    identifier:string,
    operation:WhereFilterOp,
    value:any
}

// global.d.ts
export {Profile,ExpiringCredential,Account,QueryParams};
