/*
 * File: user.service.ts
 * File Created: 2023-09-21 08:13:06
 * Author: Val Liu (valuis0429@gmail.com)
 *
 * -----
 * Last Modified: 2023-10-06 08:41:44
 * Modified By: Val Liu
 * -----
 */

import {
    CreateDto,
    CreateOutput,
    DeleteDto,
    DeleteOutput,
    ReadDto,
    ReadOutput,
    UpdateDto,
    UpdateOutput,
} from "core/types/base-entity";
import { User } from ".prisma/client";
import { PrismaService } from "@app/prisma";
import { AESDecrypt, AESEncrypt } from "core/utilities/aes-crypto";

export const UserService = Symbol("UserService");

type OBJ = User;

export type ICreateUserDto = CreateDto<OBJ>;
export type ICreateUserOutput = CreateOutput<OBJ>;

export type IReadUserDto = ReadDto<Omit<OBJ, "password">>;
export type IReadUserOutput = ReadOutput<Omit<OBJ, "password">>;

export type IUpdateUserDto = UpdateDto<OBJ>;
export type IUpdateUserOutput = UpdateOutput<OBJ>;

export type IDeleteUserDto = DeleteDto<OBJ>;
export type IDeleteUserOutput = DeleteOutput<OBJ>;

/// Extend UserService
//let tt: Prisma.UserDelegate;
declare module "@prisma/client" {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    export namespace Prisma {
        export interface UserDelegate {
            encryptPassword(password: string): string;
            decryptPassword(encrypted: string): string;
        }
    }
}

export const UserFactory = (ps: PrismaService) => {
    Object.assign(ps.user, {
        encryptPassword: (password: string) => {
            return AESEncrypt(password);
        },
        decryptPassword: (encrypted: string) => {
            return AESDecrypt(encrypted);
        },
    });
    return ps.user;
};
