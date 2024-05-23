export class CreateDoctorDto {
    readonly name:string;
    readonly cpf_cnpj:string;
    readonly specialty:string;
    readonly crm:string;
    readonly phone: string ;
    readonly consultation_hours_from: Date;
    readonly consultation_hours_to: Date;

    readonly userId :number;
}
