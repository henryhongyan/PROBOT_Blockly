// Copyright 2006 The Closure Library Authors. All Rights Reserved.
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

goog.provide('goog.structs.HeapTest');
goog.setTestOnly('goog.structs.HeapTest');

goog.require('goog.structs');
goog.require('goog.structs.Heap');
goog.require('goog.testing.jsunit');

function getHeap() {
  var h = new goog.structs.Heap();
  h.insert(0, 'a');
  h.insert(1, 'b');
  h.insert(2, 'c');
  h.insert(3, 'd');
  return h;
}


function getHeap2() {
  var h = new goog.structs.Heap();
  h.insert(1, 'b');
  h.insert(3, 'd');
  h.insert(0, 'a');
  h.insert(2, 'c');
  return h;
}


function testGetCount1() {
  var h = getHeap();
  assertEquals('count, should be 4', h.getCount(), 4);
  h.remove();
  assertEquals('count, should be 3', h.getCount(), 3);
}

function testGetCount2() {
  var h = getHeap();
  h.remove();
  h.remove();
  h.remove();
  h.remove();
  assertEquals('count, should be 0', h.getCount(), 0);
}


function testKeys() {
  var h = getHeap();
  var keys = h.getKeys();
  for (var i = 0; i < 4; i++) {
    assertTrue('getKeys, key ' + i + ' found', goog.structs.contains(keys, i));
  }
  assertEquals('getKeys, Should be 4 keys', goog.structs.getCount(keys), 4);
}


function testValues() {
  var h = getHeap();
  var values = h.getValues();

  assertTrue('getKeys, value "a" found', goog.structs.contains(values, 'a'));
  assertTrue('getKeys, value "b" found', goog.structs.contains(values, 'b'));
  assertTrue('getKeys, value "c" found', goog.structs.contains(values, 'c'));
  assertTrue('getKeys, value "d" found', goog.structs.contains(values, 'd'));
  assertEquals('getKeys, Should be 4 keys', goog.structs.getCount(values), 4);
}


function testContainsKey() {
  var h = getHeap();

  for (var i = 0; i < 4; i++) {
    assertTrue('containsKey, key ' + i + ' found', h.containsKey(i));
  }
  assertFalse('containsKey, value 4 not found', h.containsKey(4));
}


function testContainsValue() {
  var h = getHeap();

  assertTrue('containsValue, value "a" found', h.containsValue('a'));
  assertTrue('containsValue, value "b" found', h.containsValue('b'));
  assertTrue('containsValue, value "c" found', h.containsValue('c'));
  assertTrue('containsValue, value "d" found', h.containsValue('d'));
  assertFalse('containsValue, value "e" not found', h.containsValue('e'));
}


function testClone() {
  var h = getHeap();
  var h2 = h.clone();
  assertTrue('clone so it should not be empty', !h2.isEmpty());
  assertTrue('clone so it should contain key 0', h2.containsKey(0));
  assertTrue('clone so it should contain value "a"', h2.containsValue('a'));
}


function testClear() {
  var h = getHeap();
  h.clear();
  assertTrue('cleared so it should be empty', h.isEmpty());
}


function testIsEmpty() {
  var h = getHeap();
  assertFalse('4 values so should not be empty', h.isEmpty());

  h.remove();
  h.remove();
  h.remove();
  assertFalse('1 values so should not be empty', h.isEmpty());

  h.remove();
  assertTrue('0 values so should be empty', h.isEmpty());
}


function testPeek1() {
  var h = getHeap();
  assertEquals('peek, Should be "a"', h.peek(), 'a');
}


function testPeek2() {
  var h = getHeap2();
  assertEquals('peek, Should be "a"', h.peek(), 'a');
}


function testPeek3() {
  var h = getHeap();
  h.clear();
  assertEquals('peek, Should be "undefined"', h.peek(), undefined);
}


function testPeekKey1() {
  var h = getHeap();
  assertEquals('peekKey, Should be "0"', h.peekKey(), 0);
}


function testPeekKey2() {
  var h = getHeap2();
  assertEquals('peekKey, Should be "0"', h.peekKey(), 0);
}


function testPeekKey3() {
  var h = getHeap();
  h.clear();
  assertEquals('peekKey, Should be "undefined"', h.peekKey(), undefined);
}


function testRemove1() {
  var h = getHeap();

  assertEquals('remove, Should be "a"', h.remove(), 'a');
  assertEquals('remove, Should be "b"', h.remove(), 'b');
  assertEquals('remove, Should be "c"', h.remove(), 'c');
  assertEquals('remove, Should be "d"', h.remove(), 'd');
}


function testRemove2() {
  var h = getHeap2();

  assertEquals('remove, Should be "a"', h.remove(), 'a');
  assertEquals('remove, Should be "b"', h.remove(), 'b');
  assertEquals('remove, Should be "c"', h.remove(), 'c');
  assertEquals('remove, Should be "d"', h.remove(), 'd');
}


function testInsertPeek1() {
  var h = new goog.structs.Heap();

  h.insert(3, 'd');
  assertEquals('peek, Should be "d"', h.peek(), 'd');
  h.insert(2, 'c');
  assertEquals('peek, Should be "c"', h.peek(), 'c');
  h.insert(1, 'b');
  assertEquals('peek, Should be "b"', h.peek(), 'b');
  h.insert(0, 'a');
  assertEquals('peek, Should be "a"', h.peek(), 'a');
}


function testInsertPeek2() {
  var h = new goog.structs.Heap();

  h.insert(1, 'b');
  assertEquals('peak, Should be "b"', h.peek(), 'b');
  h.insert(3, 'd');
  assertEquals('peak, Should be "b"', h.peek(), 'b');
  h.insert(0, 'a');
  assertEquals('peak, Should be "a"', h.peek(), 'a');
  h.insert(2, 'c');
  assertEquals('peak, Should be "a"', h.peek(), 'a');
}
