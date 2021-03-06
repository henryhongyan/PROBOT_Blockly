// Copyright 2008 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

goog.provide('goog.string.formatTest');
goog.setTestOnly('goog.string.formatTest');

goog.require('goog.string.format');
goog.require('goog.testing.jsunit');

// The discussion on naming this functionality is going on.
var f = goog.string.format;

function testImmediateFormatSpecifier() {
  assertEquals('Empty String', '', f(''));
  assertEquals('Immediate Value', 'Immediate Value', f('Immediate Value'));
}

function testPercentSign() {
  assertEquals('%', '%', f('%'));
  assertEquals('%%', '%', f('%%'));
  assertEquals('%%%', '%%', f('%%%'));
  assertEquals('%%%%', '%%', f('%%%%'));

  assertEquals('width of the percent sign ???', '%%', f('%345%%-67.987%'));
}

function testStringConversionSpecifier() {
  assertEquals('%s', 'abc', f('%s', 'abc'));
  assertEquals('%2s', 'abc', f('%2s', 'abc'));
  assertEquals('%6s', '   abc', f('%6s', 'abc'));
  assertEquals('%-6s', 'abc   ', f('%-6s', 'abc'));
}

function testFloatConversionSpecifier() {
  assertEquals('%f', '123', f('%f', 123));
  assertEquals('%f', '0.1', f('%f', 0.1));
  assertEquals('%f', '123.456', f('%f', 123.456));

  // Precisions, paddings and other flags are handled on a flag to flag basis.

}

function testAliasedConversionSpecifiers() {
  assertEquals('%i vs. %d', f('%i', 123), f('%d', 123));
  assertEquals('%u vs. %d', f('%u', 123), f('%d', 123));
}

function testIntegerConversion() {
  assertEquals('%d', '0', f('%d', 0));

  assertEquals('%d', '123', f('%d', 123));
  assertEquals('%d', '0', f('%d', 0.1));
  assertEquals('%d', '0', f('%d', 0.9));
  assertEquals('%d', '123', f('%d', 123.456));

  assertEquals('%d', '-1', f('%d', -1));
  assertEquals('%d', '0', f('%d', -0.1));
  assertEquals('%d', '0', f('%d', -0.9));
  assertEquals('%d', '-123', f('%d', -123.456));

  // Precisions, paddings and other flags are handled on a flag to flag basis.

}

function testSpaceFlag() {
  assertEquals('zero %+d ', ' 0', f('% d', 0));

  assertEquals('positive % d ', ' 123', f('% d', 123));
  assertEquals('negative % d ', '-123', f('% d', -123));

  assertEquals('positive % 3d', ' 123', f('% 3d', 123));
  assertEquals('negative % 3d', '-123', f('% 3d', -123));

  assertEquals('positive % 4d', ' 123', f('% 4d', 123));
  assertEquals('negative % 4d', '-123', f('% 4d', -123));

  assertEquals('positive % 6d', '   123', f('% 6d', 123));
  assertEquals('negative % 6d', '-  123', f('% 6d', -123));

  assertEquals('positive % f ', ' 123.456', f('% f', 123.456));
  assertEquals('negative % f ', '-123.456', f('% f', -123.456));

  assertEquals('positive % .2f ', ' 123.46', f('% .2f', 123.456));
  assertEquals('negative % .2f ', '-123.46', f('% .2f', -123.456));

  assertEquals('positive % 6.2f', ' 123.46', f('% 6.2f', 123.456));
  assertEquals('negative % 6.2f', '-123.46', f('% 6.2f', -123.456));

  assertEquals('positive % 7.2f', ' 123.46', f('% 7.2f', 123.456));
  assertEquals('negative % 7.2f', '-123.46', f('% 7.2f', -123.456));

  assertEquals('positive % 10.2f', '    123.46', f('% 10.2f', 123.456));
  assertEquals('negative % 10.2f', '-   123.46', f('% 10.2f', -123.456));

  assertEquals('string % s ', 'abc', f('% s', 'abc'));
  assertEquals('string % 3s', 'abc', f('% 3s', 'abc'));
  assertEquals('string % 4s', ' abc', f('% 4s', 'abc'));
  assertEquals('string % 6s', '   abc', f('% 6s', 'abc'));
}

function testPlusFlag() {
  assertEquals('zero %+d ', '+0', f('%+d', 0));

  assertEquals('positive %+d ', '+123', f('%+d', 123));
  assertEquals('negative %+d ', '-123', f('%+d', -123));

  assertEquals('positive %+3d', '+123', f('%+3d', 123));
  assertEquals('negative %+3d', '-123', f('%+3d', -123));

  assertEquals('positive %+4d', '+123', f('%+4d', 123));
  assertEquals('negative %+4d', '-123', f('%+4d', -123));

  assertEquals('positive %+6d', '+  123', f('%+6d', 123));
  assertEquals('negative %+6d', '-  123', f('%+6d', -123));

  assertEquals('positive %+f ', '+123.456', f('%+f', 123.456));
  assertEquals('negative %+f ', '-123.456', f('%+f', -123.456));

  assertEquals('positive %+.2f ', '+123.46', f('%+.2f', 123.456));
  assertEquals('negative %+.2f ', '-123.46', f('%+.2f', -123.456));

  assertEquals('positive %+6.2f', '+123.46', f('%+6.2f', 123.456));
  assertEquals('negative %+6.2f', '-123.46', f('%+6.2f', -123.456));

  assertEquals('positive %+7.2f', '+123.46', f('%+7.2f', 123.456));
  assertEquals('negative %+7.2f', '-123.46', f('%+7.2f', -123.456));

  assertEquals('positive %+10.2f', '+   123.46', f('%+10.2f', 123.456));
  assertEquals('negative %+10.2f', '-   123.46', f('%+10.2f', -123.456));

  assertEquals('string %+s ', 'abc', f('%+s', 'abc'));
  assertEquals('string %+3s', 'abc', f('%+3s', 'abc'));
  assertEquals('string %+4s', ' abc', f('%+4s', 'abc'));
  assertEquals('string %+6s', '   abc', f('%+6s', 'abc'));
}

function testPrecision() {
  assertEquals('%.5d', '0', f('%.5d', 0));

  assertEquals('%d', '123', f('%d', 123.456));
  assertEquals('%.2d', '123', f('%.2d', 123.456));

  assertEquals('%f', '123.456', f('%f', 123.456));
  assertEquals('%.2f', '123.46', f('%.2f', 123.456));

  assertEquals('%.3f', '123.456', f('%.3f', 123.456));
  assertEquals('%.6f', '123.456000', f('%.6f', 123.456));
  assertEquals('%1.2f', '123.46', f('%1.2f', 123.456));
  assertEquals('%7.2f', ' 123.46', f('%7.2f', 123.456));

  assertEquals('%5.6f', '123.456000', f('%5.6f', 123.456));
  assertEquals('%11.6f', ' 123.456000', f('%11.6f', 123.456));

  assertEquals('%07.2f', '0123.46', f('%07.2f', 123.456));
  assertEquals('%+7.2f', '+123.46', f('%+7.2f', 123.456));
}

function testZeroFlag() {
  assertEquals('%0s', 'abc', f('%0s', 'abc'));
  assertEquals('%02s', 'abc', f('%02s', 'abc'));
  assertEquals('%06s', '   abc', f('%06s', 'abc'));

  assertEquals('%0d', '123', f('%0d', 123));
  assertEquals('%0d', '-123', f('%0d', -123));
  assertEquals('%06d', '000123', f('%06d', 123));
  assertEquals('%06d', '-00123', f('%06d', -123));
  assertEquals('%010d', '0000000123', f('%010d', 123));
  assertEquals('%010d', '-000000123', f('%010d', -123));
}

function testFlagMinus() {
  assertEquals('%-s', 'abc', f('%-s', 'abc'));
  assertEquals('%-2s', 'abc', f('%-2s', 'abc'));
  assertEquals('%-6s', 'abc   ', f('%-6s', 'abc'));

  assertEquals('%-d', '123', f('%-d', 123));
  assertEquals('%-d', '-123', f('%-d', -123));
  assertEquals('%-2d', '123', f('%-2d', 123));
  assertEquals('%-2d', '-123', f('%-2d', -123));
  assertEquals('%-4d', '123 ', f('%-4d', 123));
  assertEquals('%-4d', '-123', f('%-4d', -123));

  assertEquals('%-d', '123', f('%-0d', 123));
  assertEquals('%-d', '-123', f('%-0d', -123));
  assertEquals('%-4d', '123 ', f('%-04d', 123));
  assertEquals('%-4d', '-123', f('%-04d', -123));
}

function testExceptions() {
  var e = assertThrows(goog.partial(f, '%f%f', 123.456));
  assertEquals('[goog.string.format] Not enough arguments', e.message);

  e = assertThrows(f);
  assertEquals('[goog.string.format] Template required', e.message);
}

function testNonParticipatingGroupHandling() {
  // Firefox supplies empty string instead of undefined for non-participating
  // capture groups. This can trigger bad behavior if a demuxer only checks
  // isNaN(val) and not also val == ''. Check for regressions.
  var format = '%s %d %i %u';
  var expected = '1 2 3 4';
  // Good types
  assertEquals(expected, goog.string.format(format, 1, '2', '3', '4'));
  // Bad types
  assertEquals(expected, goog.string.format(format, '1', 2, 3, 4));
}

function testMinusString() {
  var format = '%0.1f%%';
  var expected = '-0.7%';
  assertEquals(expected, goog.string.format(format, '-0.723'));
}
