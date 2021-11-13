import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestApp } from 'src/shared/infra/http/nestjs/app';

export const nestApp = async () => {
  const nestServerApp = await NestApp
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  nestServerApp.setGlobalPrefix('/api')
  const document = SwaggerModule.createDocument(nestServerApp, options);
  SwaggerModule.setup('swagger', nestServerApp, document);
  return nestServerApp
}
