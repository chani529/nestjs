import { SignInDto } from './dto/signin.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signup.dto';
import { UserService } from '../user/user.service'; // user.service 경로 조정 필요
import { Repository } from 'typeorm';
import { User } from 'src/entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async signin(body: SignInDto) {
        const { email, password } = body;
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new UnauthorizedException("회원 정보를 다시 확인해주세요.")
        }
        const isPasswordValidated: boolean = await bcrypt.compare(
            password,
            user.password
        )
        if (!isPasswordValidated) {
            throw new UnauthorizedException("회원 정보를 다시 확인해주세요.")
        }

        const payload = { email: email, sub: user.id }
        return {
            token: this.jwtService.sign(payload)
        }
    }
    async signUp(body: SignUpDto) {

        const existingUser = await this.userRepository.findOne({ where: { email: body.email } });

        if (existingUser) {
            throw new Error('이미 존재하는 이메일입니다.');
        }
        // 비밀번호 암호화
        const hashedPassword = await bcrypt.hash(body.password, 10);

        // 새로운 사용자 엔터티 생성
        const user = this.userRepository.create({
            email: body.email,
            password: hashedPassword,
        });

        console.info(user); // 콘솔로 user 정보 확인

        // 사용자 생성 후 DB에 저장
        return this.userRepository.save(user); // DB에 저장
    }
}
