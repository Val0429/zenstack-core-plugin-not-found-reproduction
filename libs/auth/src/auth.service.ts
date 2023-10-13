/*
 * File: auth.service.ts
 * File Created: 2023-09-26 12:46:38
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-10-11 10:24:35
 * Modified By: Val Liu
 * -----
 */

import { UserService } from "@app/user";
import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Prisma, User } from "@prisma/client";
import { IJwtPayload } from "./types/jwt-payload.interface";
import { IJwtAccessToken } from "./types/jwt-access-token.interface";

export interface ILoginDto {
    /**
     * @default Admin
     */
    username: string;
    /**
     * @default Az123567!
     */
    password: string;
}

@Injectable()
export class AuthService {
    constructor(
        @Inject(UserService) private readonly userService: Prisma.UserDelegate,
        private readonly jwtService: JwtService,
    ) {}

    /// validate username / password and return the User.
    /// Used by LocalStrategy, validate user into req.user.
    async validateUser(
        username: string,
        password: string,
    ): Promise<User | null> {
        /// find the user
        const user = await this.userService.findFirst({
            where: { username },
        });

        /// validate
        if (
            user &&
            this.userService.decryptPassword(user.password) === password
        ) {
            return user;
        }
        return null;
    }

    /// Used by JWT Strategy, find id from payload for User.
    async findUser(id: User["id"]): Promise<User | null> {
        const user = await this.userService.findFirst({
            where: { id },
        });
        return user;
    }

    /// Perform login and return access token.
    /// Used by login route.
    login(user: User): IJwtAccessToken {
        const { username, id } = user;
        const payload: IJwtPayload = { id, username };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}
