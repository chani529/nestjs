import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './entities/User';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb', // MariaDB 사용
      host: 'localhost', // DB 호스트
      port: 3306, // MariaDB 기본 포트
      username: 'root', // DB 사용자명
      password: '1111', // DB 비밀번호
      database: 'study', // 사용할 DB 이름
      entities: [User], // 사용할 엔터티 배열
      synchronize: true, // 애플리케이션 실행 시 DB와 동기화
    }),
    UserModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
