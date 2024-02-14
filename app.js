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

    //const getData = await circulationRepo.get();
    //console.log(getData);
    //assert.equal(getData.length, data.length);

    /*const filterData = await circulationRepo.get({
      Newspaper: getData[5].Newspaper,
    });*/
    //console.log(filterData);
    //assert.deepEqual(filterData[0], getData[5]);

    /*const limitData = await circulationRepo.get(
      {
        Newspaper: getData[5].Newspaper,
      },
      3
    );*/
    //console.log(limitData);

    //const id = getData[5]._id.toString();
    //const byId = await circulationRepo.getById(id);
    //assert.deepEqual(byId, getData[5]);
    //console.log(byId);

    /*const newItem = {
      Newspaper: "El Universal",
      "Daily Circulation, 2004": 2192,
      "Daily Circulation, 2013": 1674,
      "Change in Daily Circulation, 2004-2013": 100,
      "Pulitzer Prize Winners and Finalists, 1990-2003": 0,
      "Pulitzer Prize Winners and Finalists, 2004-2014": 0,
      "Pulitzer Prize Winners and Finalists, 1990-2014": 0,
    };*/
    //const addItem = await circulationRepo.add(newItem);
    // console.log("addItem", addItem);
    //assert(addItem.insertedId);
    //console.log("added", addItem);

    /*const updatedItem = {
      $set: {
        Newspaper: "Últimas Noticias",
        "Daily Circulation, 2004": 2192,
        "Daily Circulation, 2013": 1674,
        "Change in Daily Circulation, 2004-2013": -24,
        "Pulitzer Prize Winners and Finalists, 1990-2003": 1,
        "Pulitzer Prize Winners and Finalists, 2004-2014": 1,
        "Pulitzer Prize Winners and Finalists, 1990-2014": 2,
      },
    };
    const updateItem = await circulationRepo.updateItem(
      addItem.insertedId,
      updatedItem
    );*/
    //console.log(updateItem);

    //const removeItem = await circulationRepo.remove(addItem.insertedId);
    //console.log(removeItem);

    const avgFinalists = await circulationRepo.averageFinalists();
    console.log(`Average finalists: ${avgFinalists}`);

    const avgFinalistsByChange =
      await circulationRepo.averageFinalistsByChange();
    console.log(
      `Average finaliststs by Change Positive: ${avgFinalistsByChange[0].avgFinalists.toFixed(
        2
      )} - Negative: ${avgFinalistsByChange[1].avgFinalists.toFixed(2)}`
    );
  } catch (error) {
    console.log(error);
  } finally {
    //const admin = client.db(dbName).admin();
    await client.db(dbName).dropDatabase();
    client.close();
    // console.log(await admin.serverStatus());
    //console.log(await admin.listDatabases());
    //console.log("results", results.insertedCount);
  }
}

main();
