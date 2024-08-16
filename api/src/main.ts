import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './utils/all-exception.filter';
import { TransformInterceptor } from './utils/transform.interceptor';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  // 全局注册错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  //静态资源
  app.useStaticAssets(join(__dirname, '../assets'), {
    prefix: '/assets/', //设置虚拟前缀路径
    maxAge: 1000 * 60, //设置缓存时间
  });
  await app.listen(3000);
}
bootstrap();
