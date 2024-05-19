import { Roles } from "src/utils/common/user-roles.enum";

export class CreateUserDto {
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly roles: Roles[];
    
}
export class CreatePatientUserDto {
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly roles: Roles[];
    readonly cpf:string;
    readonly phone:string;
    readonly date_birth: Date;
    readonly gender: string ;
    readonly city:string;
    readonly address:string;
    readonly postal_code:string;
    readonly userId :number;
}