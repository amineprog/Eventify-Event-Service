import { ExceptionFilter, Catch, ArgumentsHost, HttpException, LoggerService } from '@nestjs/common';
import { Request, Response } from 'express';
import logger from './logger.factory';


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {


    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const requestId = request.headers['x-request-id'] as string;
        const errorResponse = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exception.message || null,
            requestId
        };

        logger.error({
            context: 'HttpExceptionFilter',
            message: `HTTP Exception: ${JSON.stringify(errorResponse)}`,
            requestId,
        });

        response.status(status).json(errorResponse);
    }
}
