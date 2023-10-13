/*
 * File: type-guard-error.filter.ts
 * File Created: 2023-09-21 03:16:02
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-10-02 04:39:44
 * Modified By: Val Liu
 * -----
 */

import { ArgumentsHost, Catch, HttpStatus } from "@nestjs/common";
import { TypeGuardError } from "typia";
import { Response } from "express";
import { BaseExceptionFilter } from "@nestjs/core";

@Catch(TypeGuardError)
export class TypiaTypeErrorFilter extends BaseExceptionFilter {
    catch(exception: TypeGuardError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const statusCode = HttpStatus.BAD_REQUEST;
        response.status(statusCode).json({
            statusCode,
            message: "Test data is not following the promised type.",
            error: {
                ...exception,
                message: exception.message,
            },
        });
    }
}

// @Catch(HttpException)
// export class TypeGuardErrorFilter implements ExceptionFilter {
//     catch(exception: HttpException, host: ArgumentsHost) {
//         const ctx = host.switchToHttp();
//         const response = ctx.getResponse<Response>();
//         const statusCode = HttpStatus.BAD_REQUEST;

//         console.log("got the error", exception);
//         exception.

//         response.status(statusCode).json({
//             statusCode,
//             message: "Bad Request",
//             error: exception,
//         });
//     }
// }
