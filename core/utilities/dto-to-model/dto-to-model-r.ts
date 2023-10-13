/*
 * File: dto-to-model-r.ts
 * File Created: 2023-10-02 09:08:36
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-10-02 12:47:38
 * Modified By: Val Liu
 * -----
 */

import assert from "assert";
import { ESort, ReadDto } from "core/types/base-entity";

export function DtoToModel_R(input: ReadDto<any>): any {
    const { page, pageSize, sortBy } = input;
    let { sortOrder } = input;
    sortOrder = sortOrder ?? ESort.asc;

    /// senity check: assertion
    assert(page != undefined);
    assert(pageSize != undefined);

    /// calculate take / skip
    const take = pageSize;
    const skip = (page - 1) * pageSize;

    /// calculate where
    const where = {
        ...input,
        take: undefined,
        skip: undefined,
        page: undefined,
        pageSize: undefined,
        sortBy: undefined,
        sortOrder: undefined,
    };

    /// calculate orderBy
    const orderBy = sortBy
        ? {
              [sortBy]: sortOrder,
          }
        : undefined;

    return {
        where,
        orderBy,
        take,
        skip,
    };
}
