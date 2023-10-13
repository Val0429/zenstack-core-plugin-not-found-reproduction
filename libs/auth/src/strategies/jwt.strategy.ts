/*
 * File: jwt.strategy.ts
 * File Created: 2023-10-04 02:27:37
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-10-11 02:35:43
 * Modified By: Val Liu
 * -----
 */

import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { IJwtPayload } from "../types/jwt-payload.interface";
import { User } from "@prisma/client";
import { AuthService } from "../auth.service";

/// Strategy for decrypt Jwt from Bearer and validate
/// The return value of validate is to be saved into req.user
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.AUTH_JWT_SECRET,
        });
    }

    validate(payload: IJwtPayload): Promise<User | null> {
        return this.authService.findUser(payload.id);
    }
}
