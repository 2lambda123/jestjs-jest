/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {tmpdir} from 'os';
import * as path from 'path';
import {cleanup, writeFiles} from '../Utils';
import runJest from '../runJest';

const DIR = path.resolve(tmpdir(), 'jest-path-pattern-reporter-message');

beforeEach(() => cleanup(DIR));
afterEach(() => cleanup(DIR));

test('prints a message with path pattern at the end', () => {
  writeFiles(DIR, {
    '.watchmanconfig': '',
    '__tests__/a.test.js': "test('a', () => {});",
    '__tests__/b.test.js': "test('b', () => {});",
    'package.json': '{}',
  });
  let stderr;

  ({stderr} = runJest(DIR, ['a']));
  expect(stderr).toMatch('Ran all test suites matching a');

  ({stderr} = runJest(DIR, ['a', 'b']));
  expect(stderr).toMatch('Ran all test suites matching a|b');

  ({stderr} = runJest(DIR, ['--testPathPatterns', 'a']));
  expect(stderr).toMatch('Ran all test suites matching a');

  ({stderr} = runJest(DIR, ['--testPathPatterns', 'a|b']));
  expect(stderr).toMatch('Ran all test suites matching a|b');
});
