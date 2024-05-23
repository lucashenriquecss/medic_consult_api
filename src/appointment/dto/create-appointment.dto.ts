import { Status } from "src/utils/common/appointment-status.enum";

export class CreateAppointmentDto {
    readonly status: Status[];
    readonly patientId: number;
    readonly doctorId: number;
    readonly appointment_date: Date;

}
