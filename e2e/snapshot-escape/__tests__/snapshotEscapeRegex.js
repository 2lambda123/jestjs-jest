/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

const regex = /\dd \s+ \w \\\[ \. blahzz.* [x-z]+/;

test('escape regex', () => expect(regex).toMatchSnapshot());

test('escape regex nested in object', () => {
  const objectContainingRegex = {regex};
  expect(objectContainingRegex).toMatchSnapshot();
});
