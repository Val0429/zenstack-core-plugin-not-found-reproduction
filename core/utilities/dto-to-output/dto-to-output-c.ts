/*
 * File: dto-to-output.r.ts
 * File Created: 2023-10-02 09:19:19
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-10-02 03:23:47
 * Modified By: Val Liu
 * -----
 */

import { ReadDto } from "core/types/base-entity";
import { DtoToModel } from "../dto-to-model";

export interface IDtoToOutput_C_Service {
    create(input: any);
}

/// DtoToOutput, easy translate DTO into final result
export async function DtoToOutput_C(
    input: ReadDto<any>,
    service: IDtoToOutput_C_Service,
) {
    /// 1) DtoToModel
    const data = DtoToModel("POST", input);

    /// 2) Send DB requests via service
    return service.create({ data });
}
