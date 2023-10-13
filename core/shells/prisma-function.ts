/*
 * File: migrate.ts
 * File Created: 2023-09-26 09:03:00
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-10-02 11:04:29
 * Modified By: Val Liu
 * -----
 */

import cp from "child_process";
import typia from "typia";

// - prisma studio
interface IStudio {
    type: "studio";
}

// - prisma generate
interface IGenerate {
    type: "generate";
}

// - prisma migrate dev with name
//   npx prisma migrate dev --schema=./src/prisma/schema.prisma --name init
interface IMigrateDev {
    type: "migrate";
    func: "dev";
    param: string;
}

// - apply migration and seed
//   npx prisma migrate reset
interface IMigrateReset {
    type: "migrate";
    func: "reset";
}

// - prod environment, deploy
//   npx prisma migrate deploy
interface IMigrateDeploy {
    type: "migrate";
    func: "deploy";
}

// - prod environment, resolve if failed
//   npx prisma migrate resolve
interface IMigrateResolve {
    type: "migrate";
    func: "resolve";
}

type IPrismaScript =
    | IStudio
    | IGenerate
    | IMigrateDev
    | IMigrateReset
    | IMigrateDeploy
    | IMigrateResolve;

const ps: IPrismaScript = {
    type: process.argv[2],
    func: process.argv[3],
    param: process.argv[4],
} as any;

const command = `npx prisma ${ps.type} ${
    (ps as any).func ?? ""
} --schema=src/prisma/schema.prisma`;

if (typia.equals<IGenerate>(ps)) {
    console.log("generate started.");
    cp.execSync(command);
} else if (typia.equals<IStudio>(ps)) {
    console.log("studio started.");
    cp.execSync(command);
} else if (typia.equals<IMigrateDev>(ps)) {
    const cmd = `${command} --name "${ps.param}"`;
    console.log("migrate dev started.", cmd);
    cp.execSync(cmd);
} else if (typia.equals<IMigrateReset>(ps)) {
    console.log("migrate reset started.");
    cp.execSync(`${command} --force`);
} else if (typia.equals<IMigrateDeploy>(ps)) {
    console.log("migrate deploy started.");
    cp.execSync(command);
} else if (typia.equals<IMigrateResolve>(ps)) {
    console.log("migrate resolve started.");
    cp.execSync(command);
} else {
    console.error("Does not match any migration script.");
}
