/*
 * File: user.controller.ts
 * File Created: 2023-09-21 09:31:58
 * Author: Val Liu (valuis0429@gmail.com)
 *
 * -----
 * Last Modified: 2023-10-11 11:18:45
 * Modified By: Val Liu
 * -----
 */

import { Controller, Inject } from "@nestjs/common";
import {
    ICreateUserDto,
    ICreateUserOutput,
    IDeleteUserDto,
    IDeleteUserOutput,
    IReadUserDto,
    IReadUserOutput,
    IUpdateUserDto,
    IUpdateUserOutput,
    UserService,
} from "./user.service";
import { TypedBody, TypedQuery, TypedRoute } from "@nestia/core";
import { Prisma } from ".prisma/client";
import { DtoToOutput } from "core/utilities/dto-to-output";

@Controller("user")
export class UserController {
    constructor(
        @Inject(UserService) private readonly userService: Prisma.UserDelegate,
    ) {}

    @TypedRoute.Post()
    create(@TypedBody() createUserDto: ICreateUserDto): ICreateUserOutput {
        /// Encrypt password field
        createUserDto.password = this.userService.encryptPassword(
            createUserDto.password,
        );
        return DtoToOutput("POST", createUserDto, this.userService);
    }

    @TypedRoute.Get()
    read(@TypedQuery() readUserDto: IReadUserDto): IReadUserOutput {
        return DtoToOutput("GET", readUserDto, this.userService);
    }

    @TypedRoute.Put()
    update(@TypedBody() updateUserDto: IUpdateUserDto): IUpdateUserOutput {
        /// Encrypt password field
        if (updateUserDto.password != null)
            updateUserDto.password = this.userService.encryptPassword(
                updateUserDto.password,
            );
        return DtoToOutput("PUT", updateUserDto, this.userService);
    }

    @TypedRoute.Delete()
    delete(@TypedQuery() deleteUserDto: IDeleteUserDto): IDeleteUserOutput {
        return DtoToOutput("DELETE", deleteUserDto, this.userService);
    }
}
