import { AuthModule } from './../auth/auth.module';
import { JwtStrategy } from './../auth/jwt/jwt.strategy';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }
