/*
 * File: index.ts
 * File Created: 2023-10-02 09:08:29
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-10-02 06:12:42
 * Modified By: Val Liu
 * -----
 */

import {
    CreateDto,
    DeleteDto,
    ReadDto,
    UpdateDto,
} from "core/types/base-entity";
import { DtoToModel_R } from "./dto-to-model-r";
import { DtoToModel_C } from "./dto-to-model-c";
import { DtoToModel_U } from "./dto-to-model-u";

// C: UserCreateInput Omit
// R: UserSelect Omit id/ud/cd
// U: UserUpdateInput Omit
// D: id

/// DtoToModel, translate DTO into prisma compatible object
export function DtoToModel(type: "GET", input: ReadDto<any>);
export function DtoToModel(type: "POST", input: CreateDto<any>);
export function DtoToModel(type: "PUT" | "PATCH", input: UpdateDto<any>);
export function DtoToModel(type: "DELETE", input: DeleteDto<any>);
export function DtoToModel(type, input) {
    if (type === "GET") return DtoToModel_R(input);
    if (type === "POST") return DtoToModel_C(input);
    if (type === "PUT" || type === "PATCH") return DtoToModel_U(input);
}
