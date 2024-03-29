/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = jest.createMockFromModule('fs');

const mockFiles = new Map();
function __setMockFiles(newMockFiles) {
  mockFiles.clear();
  for (const fileName of Object.keys(newMockFiles)) {
    mockFiles.set(fileName, newMockFiles[fileName]);
  }
}

fs.__setMockFiles = __setMockFiles;
fs.readFileSync = jest.fn(file => mockFiles.get(file));

module.exports = fs;
