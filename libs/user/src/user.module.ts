/*
 * File: user.module.ts
 * File Created: 2023-09-21 08:13:06
 * Author: Val Liu (valuis0429@gmail.com)
 *
 * -----
 * Last Modified: 2023-10-05 05:17:17
 * Modified By: Val Liu
 * -----
 */

import { Module } from "@nestjs/common";
import { UserFactory, UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaService } from "@app/prisma";

@Module({
    controllers: [UserController],
    providers: [
        {
            provide: UserService,
            useFactory: UserFactory,
            inject: [PrismaService],
        },
    ],
    exports: [UserService],
})
export class UserModule {}
