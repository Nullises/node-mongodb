const { MongoClient } = require("mongodb");
const assert = require("assert");
const url = "mongodb://127.0.0.1:27017";
const dbName = "circulation";
const circulationRepo = require("./repos/circulationRepo");
const data = require("./circulation.json");
async function main() {
  const client = new MongoClient(url);
  await client.connect();

  try {
    const results = await circulationRepo.loadData(data);
    //assert.equal(results.insertedCount, data.length);

    const getData = await circulationRepo.get();
    //console.log(getData);
    //assert.equal(getData.length, data.length);

    const filterData = await circulationRepo.get({
      Newspaper: getData[5].Newspaper,
    });
    //console.log(filterData);
    //assert.deepEqual(filterData[0], getData[5]);

    const limitData = await circulationRepo.get(
      {
        Newspaper: getData[5].Newspaper,
      },
      3
    );
    console.log(limitData);
  } catch (error) {
    console.log(error);
  } finally {
    //const admin = client.db(dbName).admin();
    //await client.db(dbName).dropDatabase();
    //client.close();
    // console.log(await admin.serverStatus());
    //console.log(await admin.listDatabases());
    console.log("results", results.insertedCount);
  }
}

main();
