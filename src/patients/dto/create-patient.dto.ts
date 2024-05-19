export class CreatePatientDto {
    
    readonly cpf:string;
    readonly phone:string;
    readonly name:string;
    readonly date_birth: Date;
    readonly gender: string ;
    readonly state:string;
    readonly city:string;
    readonly address:string;
    readonly postal_code:string;
    readonly userId :number;
    
    
}
