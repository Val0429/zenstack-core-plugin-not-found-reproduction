/*
 * File: main.ts
 * File Created: 2023-09-20 08:27:25
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-10-04 10:40:13
 * Modified By: Val Liu
 * -----
 */

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AppHost, AppHostModule } from "@app/app-host";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    /// AppHost
    app.select(AppHostModule).get(AppHost).set(app);

    /// Start Server
    await app.listen(3000);
}
bootstrap();
