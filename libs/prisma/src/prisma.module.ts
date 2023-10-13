/*
 * File: prisma.module.ts
 * File Created: 2023-09-26 01:07:15
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-10-06 01:29:49
 * Modified By: Val Liu
 * -----
 */

import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Global()
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule {}
