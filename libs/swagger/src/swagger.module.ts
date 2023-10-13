/*
 * File: swagger.module.ts
 * File Created: 2023-09-22 10:34:16
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified:
 * Modified By:
 * -----
 */

import { Module } from "@nestjs/common";
import { SwaggerService } from "./swagger.service";
import { AppHostModule } from "@app/app-host";

@Module({
    imports: [AppHostModule],
    providers: [SwaggerService],
    exports: [SwaggerService],
})
export class SwaggerModule {}
