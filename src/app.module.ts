/*
 * File: app.module.ts
 * File Created: 2023-09-21 08:12:46
 * Author: Val Liu (valuis0429@gmail.com)
 *
 * -----
 * Last Modified: 2023-10-06 08:53:10
 * Modified By: Val Liu
 * -----
 */

import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "@app/user";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { TypiaTypeErrorFilter } from "core/filters/typia-type-error.filter";
import { GenericErrorFilter } from "core/filters/generic-error.filter";
import { AppHostModule } from "@app/app-host";
import { SwaggerModule } from "@app/swagger";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "@app/prisma";
import { RestfulDefaultTypeMiddleware } from "core/middlewares/restful-default-type.middleware";
import { AuthModule } from "@app/auth";
import { JwtAuthGuard } from "@app/auth/guards/jwt-auth.guard";

@Module({
    imports: [
        /// Core Modules
        ConfigModule.forRoot({ isGlobal: true }),
        AppHostModule,
        PrismaModule,
        SwaggerModule,
        /// Custom Modules
        UserModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        { provide: APP_FILTER, useClass: GenericErrorFilter },
        { provide: APP_FILTER, useClass: TypiaTypeErrorFilter },
        { provide: APP_GUARD, useClass: JwtAuthGuard },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RestfulDefaultTypeMiddleware).forRoutes("*");
    }
}
