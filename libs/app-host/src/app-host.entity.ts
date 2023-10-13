/*
 * File: app-host.entity.ts
 * File Created: 2023-09-22 10:16:36
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-10-11 02:32:24
 * Modified By: Val Liu
 * -----
 */

import { INestApplication, Injectable, Optional } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppHost {
    private _app: INestApplication;
    constructor(@Optional() private readonly config: ConfigService) {}

    set(app: INestApplication) {
        this._app = app;
        this.initial();
    }
    get app(): INestApplication {
        return this._app;
    }

    private initial() {
        /// initial host related config
        const HOST_API_PREFIX = this.config.get("HOST_API_PREFIX");
        if (HOST_API_PREFIX) this.app.setGlobalPrefix(HOST_API_PREFIX);

        /// Shutdown Hooks
        this.app.enableShutdownHooks();
    }
}
