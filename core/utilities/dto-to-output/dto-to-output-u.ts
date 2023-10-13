/*
 * File: dto-to-output.r.ts
 * File Created: 2023-10-02 09:19:19
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-10-02 06:10:21
 * Modified By: Val Liu
 * -----
 */

import { UpdateDto } from "core/types/base-entity";
import { DtoToModel } from "../dto-to-model";

export interface IDtoToOutput_U_Service {
    update(input: any);
}

/// DtoToOutput, easy translate DTO into final result
export async function DtoToOutput_U(
    input: UpdateDto<any>,
    service: IDtoToOutput_U_Service,
) {
    /// 1) DtoToModel
    const data = DtoToModel("PUT", input);
    /// 2) Send DB requests via service
    return service.update({
        where: {
            id: input.id,
        },
        data,
    });
}
