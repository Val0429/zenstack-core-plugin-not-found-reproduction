/*
 * File: index.ts
 * File Created: 2023-10-11 10:57:01
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-10-11 11:17:20
 * Modified By: Val Liu
 * -----
 */

import * as path from "path";
import * as fs from "fs";
import * as dotenv from "dotenv";
dotenv.config();

import NESTIA_CONFIG from "./../../../nestia.config";
import { OpenAPIObject } from "@nestjs/swagger";
import { applySecurity } from "./apply-security";

function readDoc(): [string, OpenAPIObject] | undefined {
    /// swagger output path should be defined
    const swaggerPath = NESTIA_CONFIG.swagger?.output;
    if (swaggerPath == undefined) {
        return;
    }
    const loc = path.resolve(swaggerPath);
    const docs: OpenAPIObject = JSON.parse(fs.readFileSync(loc, "utf-8"));
    return [loc, docs];
}

function writeDoc(loc, docs) {
    /// write back
    fs.writeFileSync(loc, JSON.stringify(docs), "utf-8");
}

function main() {
    /// read docs
    const docRtn = readDoc();
    if (docRtn == undefined) return;
    const [loc, docs] = docRtn;

    /// apply security
    applySecurity(docs);

    /// write back
    writeDoc(loc, docs);
}

main();
