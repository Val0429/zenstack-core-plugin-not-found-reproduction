/*
 * File: current-user.decorator.ts
 * File Created: 2023-10-04 08:27:06
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-10-04 08:42:39
 * Modified By: Val Liu
 * -----
 */

import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { User } from "@prisma/client";

export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return <User>request.user;
    },
);
