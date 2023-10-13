/*
 * File: app-host.module.ts
 * File Created: 2023-09-22 10:15:44
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-09-22 10:18:54
 * Modified By: Val Liu
 * -----
 */

import { Module } from "@nestjs/common";
import { AppHost } from "./app-host.entity";

@Module({
    providers: [AppHost],
    exports: [AppHost],
})
export class AppHostModule {}
