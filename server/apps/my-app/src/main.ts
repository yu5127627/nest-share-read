import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { Application } from './application';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(Application, {
    cors: true
  });
  // 创建虚拟路径
  app.setGlobalPrefix(`/${process.env.MYAPP_PREFIX}`);

  const options = new DocumentBuilder()
    .setTitle('猿来阅app') // 名字
    .setDescription('全网学习数据分享') // 描述
    .setVersion('0.1') // 版本
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document); // 设置路径

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.MYAPP_PORT || 8001, () => {
    console.log(
      `Server myapp runing http://localhost:${process.env.MYAPP_PORT} port...`
    );
  });
}
bootstrap();
