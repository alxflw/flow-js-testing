/*
 * Flow JS Testing
 *
 * Copyright 2020 Dapper Labs, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as t from "@onflow/types";
import { getManagerAddress } from "./init-manager";
import { getScriptCode } from "./file";
import { executeScript } from "./interaction";
/**
 * Gets a contract address by contract name.  Can look up contracts
 * Used to look up contracts deployed using `deployContractByName`
 * @param {string} name - The name of the contract.
 */
export const getContractAddress = async (name) => {
  const managerAddress = await getManagerAddress();

  const addressMap = {
    FlowManager: managerAddress,
  };

  let contractAddress;
  try {
    const code = await getScriptCode({
      name: "get-contract-address",
      service: true,
      addressMap,
    });
    const args = [
      [name, t.String],
      [managerAddress, t.Address],
    ];
    contractAddress = await executeScript({
      code,
      args,
    });
  } catch (e) {
    console.error("failed to get account address:", e);
  }

  return contractAddress;
};
