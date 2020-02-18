import { NestFactory } from '@nestjs/core';
import { Application } from './Application';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(Application, {
    cors: true
  });
  app.useStaticAssets('upload', {
    prefix: '/upload/'
  });
  // 创建虚拟路径
  app.setGlobalPrefix(`/${process.env.MANAGE_PREFIX}`);

  const options = new DocumentBuilder()
    .setTitle('猿来阅') // 名字
    .setDescription('全网学习数据分享') // 描述
    .setVersion('0.1') // 版本
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document); // 设置路径

  // 添加管道验证
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.MANAGE_PORT || 8001, () => {
    console.log(
      `Server manage runing http://localhost:${process.env.MANAGE_PORT} port...`
    );
  });
}
bootstrap();
