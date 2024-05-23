import { Injectable, Logger } from '@nestjs/common';
import { CronJob } from 'cron';
import { sendMail } from 'src/utils/send-email';
@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor() {
    this.initializeCronJobs();
  }

  private initializeCronJobs() {
    const job = new CronJob('*/10 * * * * *', () => {
        this.handleCronJob();
    });

    // job.start();
  }

  private async handleCronJob() {
    
    await sendMail({
        to:"",
        body:"",
        subject:"",
    })
    this.logger.log('Tarefa executada a cada 10 segundos');
  }
}
