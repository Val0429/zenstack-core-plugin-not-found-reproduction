/*
 * File: index.ts
 * File Created: 2023-10-02 09:19:11
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-10-02 06:10:47
 * Modified By: Val Liu
 * -----
 */

import {
    CreateDto,
    DeleteDto,
    ReadDto,
    UpdateDto,
} from "core/types/base-entity";
import { DtoToOutput_R, IDtoToOutput_R_Service } from "./dto-to-output-r";
import { DtoToOutput_C, IDtoToOutput_C_Service } from "./dto-to-output-c";
import { DtoToOutput_U, IDtoToOutput_U_Service } from "./dto-to-output-u";
import { DtoToOutput_D, IDtoToOutput_D_Service } from "./dto-to-output-d";

/// DtoToOutput, easy translate DTO into final result
export function DtoToOutput(
    type: "GET",
    input: ReadDto<any>,
    service: IDtoToOutput_R_Service,
);
export function DtoToOutput(
    type: "POST",
    input: CreateDto<any>,
    service: IDtoToOutput_C_Service,
);
export function DtoToOutput(
    type: "PUT" | "PATCH",
    input: UpdateDto<any>,
    service: IDtoToOutput_U_Service,
);
export function DtoToOutput(
    type: "DELETE",
    input: DeleteDto<any>,
    service: IDtoToOutput_D_Service,
);

export function DtoToOutput(type, input, service) {
    if (type === "GET") return DtoToOutput_R(input, service);
    if (type === "POST") return DtoToOutput_C(input, service);
    if (type === "PUT" || type === "PATCH")
        return DtoToOutput_U(input, service);
    if (type === "DELETE") return DtoToOutput_D(input, service);
}
