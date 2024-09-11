import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ClientModule } from './user-client/client.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import * as process from 'node:process';
import { AuthModule } from './auth/auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000, cookie: false },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const clientConfig = new DocumentBuilder()
    .setTitle('Clothes shop for client')
    .setDescription('Clothes Shop API for clients')
    .setVersion('1.0')
    .addTag('Client')
    .build();

  const clientDocument = SwaggerModule.createDocument(app, clientConfig, {
    include: [ClientModule, AuthModule],
  });

  SwaggerModule.setup('api/docs/client', app, clientDocument);

  const adminConfig = new DocumentBuilder()
    .setTitle('Clothes shop for admin')
    .setDescription('Clothes Shop API for admin')
    .setVersion('1.0')
    .addTag('Admin')
    .build();

  const adminDocument = SwaggerModule.createDocument(app, adminConfig, {
    include: [AppModule],
  });

  SwaggerModule.setup('api/docs/admin', app, adminDocument);

  await app.listen(3000);
}
bootstrap();
