// Copyright 2010 The Closure Library Authors. All Rights Reserved.
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

goog.provide('goog.debug.LogBufferTest');
goog.setTestOnly('goog.debug.LogBufferTest');

goog.require('goog.debug.LogBuffer');
goog.require('goog.debug.Logger');
goog.require('goog.testing.jsunit');

var DUMMY_LEVELS = [
  goog.debug.Logger.Level.INFO,
  goog.debug.Logger.Level.WARNING,
  goog.debug.Logger.Level.SEVERE];
var DUMMY_MESSAGES = ['a', 'b', 'c'];
var DUMMY_NAMES = ['X', 'Y', 'Z'];

var buffer;
var dummyIndex = 0;

function setUp() {
  goog.debug.LogBuffer.CAPACITY = 4;
  goog.debug.LogBuffer.instance_ = null;
  buffer = goog.debug.LogBuffer.getInstance();
}

function verifyRecord(expectedIndex, record) {
  var index = expectedIndex % DUMMY_MESSAGES.length;
  var message = DUMMY_MESSAGES[index];
  var level = DUMMY_LEVELS[index];
  var name = DUMMY_NAMES[index];
  assertEquals('Wrong level for record ' + expectedIndex, level,
      record.getLevel());
  assertEquals('Wrong message for record ' + expectedIndex, message,
      record.getMessage());
  assertEquals('Wrong name for record ' + expectedIndex, name,
      record.getLoggerName());
}

function addAndVerifyRecord() {
  var index = dummyIndex % DUMMY_MESSAGES.length;
  var level = DUMMY_LEVELS[index];
  var message = DUMMY_MESSAGES[index];
  var name = DUMMY_NAMES[index];
  var record = buffer.addRecord(level, message, name);
  verifyRecord(dummyIndex, record);
  dummyIndex++;
}

function addSomeRecords(howMany) {
  for (var i = 0; i < howMany; i++) {
    addAndVerifyRecord();
  }
}

function testAddRecord() {
  addSomeRecords(goog.debug.LogBuffer.CAPACITY * 3);
}

function testIsFull() {
  assertFalse('Should not be full.', buffer.isFull_);
  addSomeRecords(goog.debug.LogBuffer.CAPACITY * 1.5);
  assertTrue('Should be full.', buffer.isFull_);
  buffer.clear();
  assertFalse('Should not be full after clear().', buffer.isFull_);
  addSomeRecords(goog.debug.LogBuffer.CAPACITY - 1);
  assertFalse('Should not be full but almost full.', buffer.isFull_);
}

function testForEachRecord() {
  // Test with it half full.
  var howMany1 = goog.debug.LogBuffer.CAPACITY / 2;
  addSomeRecords(howMany1);
  var counter1 = 0;
  buffer.forEachRecord(function(record) {
    verifyRecord(counter1++, record);
  });
  assertEquals('Wrong number of records when half full.', howMany1, counter1);

  // Test with it full.
  var howMany2 = goog.debug.LogBuffer.CAPACITY;
  addSomeRecords(howMany2);
  var index = counter1;
  buffer.forEachRecord(function(record) {
    verifyRecord(index++, record);
  });
  assertEquals('Wrong number of records when full.', howMany1 + howMany2,
      index);
}
