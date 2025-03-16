import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService
        , private readonly authService: AuthService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return await this.userService.getUsers();
    }
}
