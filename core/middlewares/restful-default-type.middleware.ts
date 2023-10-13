/*
 * File: restful-default-type.middleware.ts
 * File Created: 2023-10-02 01:29:23
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-10-04 10:20:00
 * Modified By: Val Liu
 * -----
 */

import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

/// This middleware make default of:
const PAGE_DEFAULT: number = 1,
    PAGE_SIZE_DEFAULT: number = 10,
    PAGE_DEFAULT_S: string = String(PAGE_DEFAULT),
    PAGE_SIZE_DEFAULT_S: string = String(PAGE_SIZE_DEFAULT);

@Injectable()
export class RestfulDefaultTypeMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        /// GET / POST / PUT / PATCH / DELETE
        const method = req.method;
        /// handle pre query default
        if (method === "GET") {
            generate_R_default(req);
        }

        next();
    }
}

/// internal
function generate_R_default(req) {
    /// 1) parse req.url into params
    const header = head(req.url);
    const params: URLSearchParams = new URLSearchParams(tail(req.url));

    /// 2) make default of page / pageSize
    /// 2.1) page
    let page = params.get("page");
    if (page == null) page = PAGE_DEFAULT_S;
    else {
        const p = parseInt(page, 10);
        if (typeof p !== "number" || p < 1) page = PAGE_DEFAULT_S;
    }
    /// 2.2) pageSize
    let pageSize = params.get("pageSize");
    if (pageSize == null) pageSize = PAGE_SIZE_DEFAULT_S;
    else {
        const p = parseInt(pageSize, 10);
        if (typeof p !== "number" || p < 1) pageSize = PAGE_SIZE_DEFAULT_S;
    }

    /// 3) write back to req.url
    params.set("page", page);
    params.set("pageSize", pageSize);
    req.url = `${header}?${params.toString()}`;

    /// 4) and also replace req.query
    if (req.query == null) req.query = {};
    req.query.page = +page;
    req.query.pageSize = +pageSize;
}

function head(url: string): string {
    const index: number = url.indexOf("?");
    return index === -1 ? url : url.substring(0, index);
}
function tail(url: string): string {
    const index: number = url.indexOf("?");
    return index === -1 ? "" : url.substring(index + 1);
}
