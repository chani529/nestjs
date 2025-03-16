// 모듈 생성 후 작업해야 자동 입력됨
nest g mo users // 모듈 자동 생성

nest g s users  // 서비스 자동 생성
nest g co users // 컨트롤러 자동 생성
nest g interface users/user // 인터페이스 자동 생성

// nest logger middleware 추가
nest g middleware logger

// 슈파베이스
npm install @supabase/supabase-js dotenv

// exception
throw new HttpException('message', 500)


``` http-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const error = exception.getResponse();

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                error,
            });
    }
}
```