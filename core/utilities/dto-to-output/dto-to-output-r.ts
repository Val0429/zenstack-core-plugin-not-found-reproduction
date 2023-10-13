/*
 * File: dto-to-output.r.ts
 * File Created: 2023-10-02 09:19:19
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-10-02 01:53:00
 * Modified By: Val Liu
 * -----
 */

import {
    IInputSortingBase,
    IOutputPaging,
    ReadDto,
    ReadOutput,
} from "core/types/base-entity";
import { DtoToModel } from "../dto-to-model";

export interface IDtoToOutput_R_Service {
    findMany(input: any);
    count(input: any);
}

/// DtoToOutput, easy translate DTO into final result
export async function DtoToOutput_R(
    input: ReadDto<any>,
    service: IDtoToOutput_R_Service,
) {
    /// 1) DtoToModel
    const rtm = DtoToModel("GET", input);

    /// 2) Send DB requests via service
    const [results, total] = await Promise.all([
        service.findMany(rtm),
        service.count(rtm),
    ]);

    /// 3) Attach paging
    return DataToPagingOutput(input, results, total);
}

export function DataToPagingOutput(
    input: ReadDto<any>,
    results: any,
    total: number,
): ReadOutput<any> {
    const { page, pageSize, sortBy, sortOrder } = input;
    const rtn: ReadOutput<any> = {
        results,
        /// page / pageSize
        paging: generatePaging(page, pageSize, total),
        /// sortBy / sortOrder
        sorting: generateSorting(sortBy, sortOrder),
    } as any;
    return rtn;
}

/// internal
function generatePaging(page, pageSize, total): IOutputPaging["paging"] {
    /// page / pageSize / total already asserted
    return {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
    };
}

function generateSorting(
    sortBy,
    sortOrder,
): IInputSortingBase<any> | undefined {
    if (!sortBy && !sortOrder) return undefined;
    return { sortBy, sortOrder };
}
