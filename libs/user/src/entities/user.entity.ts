/*
 * File: user.entity.ts
 * File Created: 2023-09-21 08:16:46
 * Author: Val Liu (valuis0429@gmail.com)
 *
 * -----
 * Last Modified: 2023-10-02 01:39:14
 * Modified By: Val Liu
 * -----
 */

//import { tags } from "typia";

export interface IUser {
    username: string;
    //email: string & tags.Format<"email">;
    password: string;
}
