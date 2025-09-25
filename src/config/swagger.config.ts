import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const swaggerConfigInit = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('Test Backend')
    .setDescription('API documentation')
    .setVersion('v1.0.0')
    .setContact('Parsa Valizadeh', '', 'parsavalizadeh@yahoo.com')
    .addBearerAuth(SwaggerAuthConfig(), 'Authorization')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
};

const SwaggerAuthConfig = (): SecuritySchemeObject => ({
  type: 'http',
  in: 'header',
  scheme: 'bearer',
  bearerFormat: 'JWT',
});