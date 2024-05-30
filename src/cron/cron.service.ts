import { Injectable, Logger } from '@nestjs/common';
import { CronJob } from 'cron';
import { AppointmentService } from 'src/appointment/appointment.service';
import { sendMail } from 'src/utils/send-email';
@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(private readonly appointmentService: AppointmentService) {
    
    this.initializeCronJobs();
  }

  private initializeCronJobs() {
    const job = new CronJob('*/10 * * * * *', () => {
        this.handleCronJob();
    });

    // job.start(); DESATIVADO
  }

  private async handleCronJob() {
    
    const resultAppointment =  await this.appointmentService.findAll({status:'pending'});

    for (let i = 0; i < resultAppointment.length; i++) {
      const element = resultAppointment[i];
      const diffentDays = await checkDate(new Date(), element.appointment_date);
      if(diffentDays == 1){
        if (!element.notification_before) {
          await sendMail({
            to:element.patient.user.email,
            body:`Sua consulta com o doutor(A) ${element.doctor.name} é amanha as ${element.appointment_date}. Não esqueça`,
            subject:"Lembrete: Sua consulta é amanha!",
          });
          await this.appointmentService.update(element.id,{notificatio_before:true})
        }
      }else if(diffentDays == 0){
        if (!element.notification_day) {
          
          await sendMail({
            to:element.patient.user.email,
            body:`Sua consulta com o doutor(A) ${element.doctor.name} é hoje as ${element.appointment_date}`,
            subject:"Lembrete: Sua consulta é hoje!",
          });
           await this.appointmentService.update(element.id,{notification_day:true})
        }
      }
   
    }
  }
}

async function checkDate(dateNow: Date, dateBooking: Date){
  const dayMS = 1000 * 60 * 60 * 24;
  const diffent = Math.abs(dateNow.getTime() - dateBooking.getTime());
  return Math.round(diffent / dayMS);
}