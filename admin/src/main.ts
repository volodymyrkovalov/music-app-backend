import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import * as AWS from 'aws-sdk';

/*----------------------------------------------------------------
  // TODO: (optional) add CQRS
  // TODO: set up  CI/CD pipeline

------------------------------------------------------------------*/

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
  });

  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Music app backend')
    .setDescription(
      'Here we provide you a quality documentation for our REST api',
    )
    .setVersion('1.0.0')
    .addTag('music')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  const configService = app.get(ConfigService);
  AWS.config.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION'),
  });

  await app.listen(5000);
}
bootstrap();
