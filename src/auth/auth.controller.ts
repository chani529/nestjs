import { SignInDto } from './dto/signin.dto';
import { User } from 'src/entities/User';
import { AuthService } from './auth.service';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async signIn(@Body() body: SignInDto) {
        return this.authService.signin(body);
    }

    @Post()
    async signUp(@Body() body: SignUpDto) {
        this.authService.signUp(body);
        return body;
    }
}
