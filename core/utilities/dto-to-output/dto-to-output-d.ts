/*
 * File: dto-to-output.r.ts
 * File Created: 2023-10-02 09:19:19
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-10-02 06:16:15
 * Modified By: Val Liu
 * -----
 */

import { DeleteDto } from "core/types/base-entity";

export interface IDtoToOutput_D_Service {
    delete(input: any);
}

/// DtoToOutput, easy translate DTO into final result
export async function DtoToOutput_D(
    input: DeleteDto<any>,
    service: IDtoToOutput_D_Service,
) {
    /// 1) Send DB requests via service
    return service.delete({
        where: {
            id: input.id,
        },
    });
}
