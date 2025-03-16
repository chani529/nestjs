import { SuccessInterceptor } from './common/interceptor/success.Interceptor';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { Controller, Get, Req, UseFilters, HttpException, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
@UseInterceptors(SuccessInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    // throw new HttpException("TEST", 401);
    return this.appService.getHello();
  }
}
