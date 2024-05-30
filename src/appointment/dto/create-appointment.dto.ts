import { Status } from "src/utils/common/appointment-status.enum";

export class CreateAppointmentDto {
    readonly status: Status[];
    readonly patientId: number;
    readonly doctorId: number;
    readonly appointment_date: Date;
    readonly booking_notification?:boolean;
    readonly notificatio_before?:boolean;
    readonly notification_day?:boolean;
    readonly hash?:string;


}
