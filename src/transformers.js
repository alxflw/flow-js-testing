/*
 * Flow JS Testing
 *
 * Copyright 2021 Dapper Labs, Inc.
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

import { getServiceAddress } from "./manager";

export const importManager = async () => {
  const serviceAddress = await getServiceAddress();
  return `import FlowManager from ${serviceAddress}`;
};

export const importExists = (contractName, code) => {
  return new RegExp(`import\\s+${contractName}`).test(code);
};

export const ADDRESS_BOOK = {
  "0x01": "Alice",
  "0x02": "Bob",
  "0x03": "Charlie",
  "0x04": "Dave",
  "0x05": "Eve",
};

export const builtInMethods = async (code) => {
  let injectedImports = code;
  if (!importExists("FlowManager", code)) {
    const imports = await importManager();
    injectedImports = `
      ${imports}
      ${code}  
  `;
  }
  const updatedCode = injectedImports.replace(/getCurrentBlock\(\)./g, `FlowManager.$&`);
  return updatedCode;
};

export const playgroundImport = async (code) => {
  let injectedImports = code;
  if (!importExists("FlowManager", code)) {
    const imports = await importManager();
    injectedImports = `
      ${imports}
      ${code}  
  `;
  }
  const updatedCode = injectedImports.replace(/getAccount\(\)./g, `FlowManager.$&`);

  // TODO: use ADDRESS_BOOK to replace calls

  return updatedCode;
};

export const setBlockOffset = async (offset) => {

}