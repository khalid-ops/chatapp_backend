import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (process.env.NODE_ENV !== 'test') {
      console.log('==================================');
      const { method, body, originalUrl, headers } = req;
      const { statusCode } = res;
      console.log(`${method} ${originalUrl} ${statusCode}`);
      console.log(`${headers['user-agent']}`);
      console.log(body);
      console.log('==================================');
    }
    next();
  }
}
