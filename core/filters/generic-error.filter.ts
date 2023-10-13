/*
 * File: nestia-type-error.filter.ts
 * File Created: 2023-09-21 03:42:10
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-10-04 08:41:30
 * Modified By: Val Liu
 * -----
 */

import { ArgumentsHost, Catch, HttpException } from "@nestjs/common";
import { Response } from "express";
import { BaseExceptionFilter } from "@nestjs/core";
import {
    PrismaClientInitializationError,
    PrismaClientKnownRequestError,
    PrismaClientRustPanicError,
    PrismaClientUnknownRequestError,
    PrismaClientValidationError,
} from "@prisma/client/runtime/library";

type AllException = any;

@Catch()
export class GenericErrorFilter extends BaseExceptionFilter {
    catch(exception: AllException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let statusCode: number;
        let type: string;
        let message: string;
        switch (exception.constructor) {
            case PrismaClientKnownRequestError:
            case PrismaClientRustPanicError:
            case PrismaClientUnknownRequestError:
            case PrismaClientInitializationError:
                statusCode = 400;
                type = exception.constructor.name;
                message = exception.message;
                break;
            case PrismaClientValidationError:
                statusCode = 422;
                type = exception.constructor.name;
                message = exception.message;
                break;
            case HttpException:
                statusCode = exception.getStatus();
                type = exception.constructor.name;
                exception = exception.getResponse();
                message = exception.message;
                break;
            default:
                /// Generic Error Handler
                statusCode = exception.statusCode ?? exception.getStatus?.();
                type = exception.constructor?.name ?? "GenericError";
                message = exception.message;
                if (exception.getResponse) exception = exception.getResponse();
                break;
        }

        /// transform Exceptions to general format
        /// Val: todo, logging
        if (statusCode != undefined && message != undefined) {
            /// handle message not exist
            response.status(statusCode).json({
                statusCode,
                message,
                type,
                error: exception,
            });
        } else {
            /// fallback to default
            /// Val: todo. should not fallback.
            console.error("should not fallback to default error", exception);
            super.catch(exception, host);
        }
    }
}
