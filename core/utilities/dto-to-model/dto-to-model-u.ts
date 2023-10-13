/*
 * File: dto-to-model-r.ts
 * File Created: 2023-10-02 09:08:36
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-10-02 05:22:43
 * Modified By: Val Liu
 * -----
 */

import { UpdateDto } from "core/types/base-entity";

export function DtoToModel_U(input: UpdateDto<any>): any {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rtn } = input;
    return rtn;
}
