/*
 * File: base-entity.ts
 * File Created: 2023-09-21 08:27:40
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-10-04 10:23:01
 * Modified By: Val Liu
 * -----
 */

/// Restful API message definition
/// error:
/// { statusCode, message, errors }
/// R:
/// { results: T[], paging, sorting }
/// C:
/// { ...T }
/// U:
/// { ...T }
/// D:
/// { ...T }

/// Base Type
export interface IEntityPrimaryKey {
    id: string | number;
}

export interface IEntityDateInfo {
    createdAt: Date;
    updatedAt: Date;
}

export type IBaseEntity = IEntityPrimaryKey & IEntityDateInfo;

/// Conversion Type
export type BeEntity<T> = IEntityPrimaryKey & T & IEntityDateInfo;

/// CRUD Type
export type CreateDto<T> = Omit<T, keyof IBaseEntity>;
export type CreateOutput<T> = IOutput_C_Result<T>;

export type ReadDto<T> = IInputPaging<
    Omit<RecursivePartial<T>, keyof IEntityDateInfo>
>;
export type ReadOutput<T> = IOutput_R_Result<T>;

export type UpdateDto<T extends { [key in keyof IEntityPrimaryKey]: any }> =
    Pick<T, keyof IEntityPrimaryKey> &
        Omit<
            RecursivePartial<T>,
            keyof IEntityDateInfo | keyof IEntityPrimaryKey
        >;
export type UpdateOutput<T> = IOutput_U_Result<T>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
//export type DeleteDto<T> = Pick<T, keyof IEntityPrimaryKey>;
export type DeleteDto<T extends { [key in keyof IEntityPrimaryKey]: any }> =
    Pick<T, keyof IEntityPrimaryKey>;
export type DeleteOutput<T> = IOutput_D_Result<T>;

/// Helper Type
export type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

/// Paging Type
export interface IInputPagingBase {
    /**
     * @default 1
     */
    page?: number;
    /**
     * @default 10
     */
    pageSize?: number;
}
export interface IOutputPagingBase {
    total: number;
    totalPages: number;
}

/// Sorting Type
export enum ESort {
    asc = "asc",
    desc = "desc",
}

export interface IInputSortingBase<T> {
    sortBy?: keyof T;
    sortOrder?: ESort;
}

/// Input Type
export type IInputPaging<T> = T & IInputPagingBase & IInputSortingBase<T>;

/// Output Type
export interface IOutputResults<T> {
    results: T[];
}
export interface IOutputPaging {
    paging: IInputPagingBase & IOutputPagingBase;
}
export interface IOutputSorting<T> {
    sorting?: IInputSortingBase<T>;
}

/// Output CRUD
export type IOutput_C_Result<T> = T;
export type IOutput_R_Result<T> = IOutputResults<T> &
    IOutputPaging &
    IOutputSorting<T>;
export type IOutput_U_Result<T> = T;
export type IOutput_D_Result<T> = T;

export type IOutputResult<T> =
    | IOutput_C_Result<T>
    | IOutput_R_Result<T>
    | IOutput_U_Result<T>
    | IOutput_D_Result<T>;
