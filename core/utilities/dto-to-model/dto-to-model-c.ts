/*
 * File: dto-to-model-r.ts
 * File Created: 2023-10-02 09:08:36
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-10-02 05:18:36
 * Modified By: Val Liu
 * -----
 */

import { CreateDto } from "core/types/base-entity";

export function DtoToModel_C(input: CreateDto<any>): any {
    return input;
}
