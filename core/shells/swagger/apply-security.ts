/*
 * File: authentication.ts
 * File Created: 2023-10-11 11:10:43
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-10-11 11:17:22
 * Modified By: Val Liu
 * -----
 */

import { OpenAPIObject } from "@nestjs/swagger";
import { PathItemObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { PublicKeyword } from "./../../../libs/auth/src/guards/public-gate";

export function applySecurity(docs: OpenAPIObject) {
    /// detect security requirements
    const security = process.env["SWAGGER_SECURITY_REQUIREMENT"];

    /// remove the public scheme, which is just a hint.
    delete docs.components?.securitySchemes?.["public"];

    /// add security requirements
    if (security != null) {
        Object.values(docs.paths).forEach((path: PathItemObject) => {
            ["get", "put", "post", "delete", "patch"].forEach(
                (method: string) => {
                    if (path[method] == null) return;
                    const o = path[method];
                    if (isPublicExists(o.security)) {
                        o.security = [];
                    } else {
                        o.security = [{ [security]: [] }];
                    }
                },
            );
        });
    }
}

/// internal
function isPublicExists(security: Array<{ [index: string]: any }> | undefined) {
    if (security == undefined || !Array.isArray(security)) return false;
    /// security is array
    const got = security.findIndex((value) => {
        return value[PublicKeyword] != null ? true : false;
    });
    return got >= 0 ? true : false;
}
