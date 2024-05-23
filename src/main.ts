import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseFormatMiddleware } from './utils/common/middlewares/response.format-middleware';
import { AllExceptionsFilter } from './utils/common/middlewares/exception-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(new ResponseFormatMiddleware().use);
  app.useGlobalFilters(new AllExceptionsFilter());
  
  await app.listen(3000);
 
}
bootstrap();
