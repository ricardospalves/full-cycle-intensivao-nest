import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { InvalidRelationError } from '../errors/invalid-relation.error';

@Catch(InvalidRelationError)
export class InvalidRelationExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();

    return response.status(422).json({
      statusCode: 422,
      message: exception.message,
    });
  }
}
