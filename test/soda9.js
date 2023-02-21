/* Copyright (c) 2018, 2022, Oracle and/or its affiliates. */

/******************************************************************************
 *
 * This software is dual-licensed to you under the Universal Permissive License
 * (UPL) 1.0 as shown at https://oss.oracle.com/licenses/upl and Apache License
 * 2.0 as shown at https://www.apache.org/licenses/LICENSE-2.0. You may choose
 * either license.
 *
 * If you elect to accept the software under the Apache License, Version 2.0,
 * the following applies:
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * NAME
 *   177. soda9.js
 *
 * DESCRIPTION
 *   sodaCollection Class
 *
 *****************************************************************************/
'use strict';

const oracledb = require('oracledb');
const assert    = require('assert');
const dbconfig = require('./dbconfig.js');
const sodaUtil = require('./sodaUtil.js');
const testsUtil = require('./testsUtil.js');

describe('177. soda9.js', () => {

  before(async function() {
    const runnable = await testsUtil.isSodaRunnable();
    if (!runnable) {
      this.skip();
      return;
    }

    await sodaUtil.cleanup();
  });

  it('177.1 insertOne() with a document content', async () => {
    let conn, collection;

    try {
      conn = await oracledb.getConnection(dbconfig);
      let soda = conn.getSodaDatabase();
      collection = await soda.createCollection("soda_test_177_1");
      let inContent = { id: 2000, name: "Paul",  office: "Singapore" };
      await collection.insertOne(inContent);

      // fetch back
      let outDocuments = await collection.find().getDocuments();
      let outContent = outDocuments[0].getContent();
      assert.deepEqual(outContent, inContent);

    } catch (err) {
      assert.fail(err);
    } finally {
      await conn.commit();

      if (collection) {
        let res = await collection.drop();
        assert.strictEqual(res.dropped, true);
      }

      if (conn) {
        try {
          await conn.close();
        } catch (err) {
          assert.fail(err);
        }
      }
    }

  }); // 177.1

  it('177.2 insertOne() with a document', async () => {
    let conn, collection;

    try {
      conn = await oracledb.getConnection(dbconfig);
      let soda = conn.getSodaDatabase();
      collection = await soda.createCollection("soda_test_177_2");
      let inContent = { id: 2000, name: "Paul",  office: "Singapore" };
      let inDocument = soda.createDocument(inContent);
      await collection.insertOne(inDocument);

      // fetch back
      let outDocuments = await collection.find().getDocuments();
      let outContent = outDocuments[0].getContent();
      assert.deepEqual(outContent, inContent);

    } catch (err) {
      assert.fail(err);
    } finally {
      await conn.commit();

      if (collection) {
        let res = await collection.drop();
        assert.strictEqual(res.dropped, true);
      }

      if (conn) {
        try {
          await conn.close();
        } catch (err) {
          assert.fail(err);
        }
      }
    }
  }); // 177.2

  it('177.3 insertOneAndGet() with a document content', async () => {
    let conn, collection;

    try {
      conn = await oracledb.getConnection(dbconfig);
      let soda = conn.getSodaDatabase();
      collection = await soda.createCollection("soda_test_177_3");

      let inContent = { id: 2000, name: "Paul",  office: "Singapore" };
      let middleDocument = await collection.insertOneAndGet(inContent);
      assert(middleDocument);
      let middleContent = middleDocument.getContent();
      assert.ifError(middleContent);

      // Fetch it back
      let outDocuments = await collection.find().getDocuments();
      let outContent = outDocuments[0].getContent();
      assert.deepEqual(outContent, inContent);

    } catch (err) {
      assert.fail(err);
    } finally {
      await conn.commit();

      if (collection) {
        let res = await collection.drop();
        assert.strictEqual(res.dropped, true);
      }

      if (conn) {
        try {
          await conn.close();
        } catch (err) {
          assert.fail(err);
        }
      }
    }
  }); // 177.3

  it('177.4 insertOneAndGet() with a document', async () => {
    let conn, collection;

    try {
      conn = await oracledb.getConnection(dbconfig);
      let soda = conn.getSodaDatabase();
      collection = await soda.createCollection("soda_test_177_4");

      let inContent = { id: 2000, name: "Paul",  office: "Singapore" };
      let inDocument = soda.createDocument(inContent);
      let middleDocument = await collection.insertOneAndGet(inDocument);
      assert(middleDocument);
      let middleContent = middleDocument.getContent();
      assert.ifError(middleContent);

      // Fetch it back
      let outDocuments = await collection.find().getDocuments();
      let outContent = outDocuments[0].getContent();
      assert.deepEqual(outContent, inContent);

    } catch (err) {
      assert.fail(err);
    } finally {
      await conn.commit();

      if (collection) {
        let res = await collection.drop();
        assert.strictEqual(res.dropped, true);
      }

      if (conn) {
        try {
          await conn.close();
        } catch (err) {
          assert.fail(err);
        }
      }
    }
  }); // 177.4

  it('177.5 createDocument() followd by getContent() i.e. without being inserted', async () => {

    let conn;

    try {
      conn = await oracledb.getConnection(dbconfig);
      let soda = conn.getSodaDatabase();

      let inContent = { id: 2000, name: "Paul",  office: "Singapore" };
      let inDocument = soda.createDocument(inContent);

      // Get content without being inserted
      let outContent = inDocument.getContent();
      assert.deepEqual(outContent, inContent);

    } catch (err) {
      assert.fail(err);
    } finally {
      await conn.commit();
      if (conn) {
        try {
          await conn.close();
        } catch (err) {
          assert.fail(err);
        }
      }
    }

  }); // 177.5
});
