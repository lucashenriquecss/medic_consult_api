import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseFormatMiddleware } from './utils/common/middlewares/response.format-middleware';
import { AllExceptionsFilter } from './utils/common/middlewares/exception-middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(new ResponseFormatMiddleware().use);
  app.useGlobalFilters(new AllExceptionsFilter());
  const config = new DocumentBuilder()
  .setTitle('Consult API')
  .setDescription('API para consulta online')
  .setVersion('1.0')
  .addTag('Consult')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
 
}
bootstrap();
