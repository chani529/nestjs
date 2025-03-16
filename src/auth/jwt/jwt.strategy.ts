import { Payload } from './jwt.payload';
import { validate } from 'class-validator';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from 'src/entities/User';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secret',
            ignoreExpiration: false,
        });
    }

    async validate(payload: Payload) {
        console.info("payload")
        console.info(payload);
        const user = await this.userRepository.findOne({ where: { id: payload.sub } });
        console.info("XXXXX")
        console.info(user)
        if (user) {
            return user;
        } else {
            throw new UnauthorizedException('접근 오류');
        }
    }

}