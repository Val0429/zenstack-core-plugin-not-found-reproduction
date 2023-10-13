/*
 * File: prisma.service.ts
 * File Created: 2023-09-26 01:07:15
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-09-27 09:08:09
 * Modified By: Val Liu
 * -----
 */

import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }
}
