const Book = require('./models/book')
const MongoClient = require("mongodb").MongoClient
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function get_collection() {
    try {
        await client.connect();
        let db = client.db('my-library');;
        return await db.collection('books');
    } catch (err) {
        console.log(err);
    }
}

async function run() {
    let id = 10
    let name = "Harry"
    let authors = "JK"
    let year = 2010
    let publisher = "Nort"
    var book = new Book(id, name, authors, year, publisher);
    var collection_save = await get_collection();

   await book.save(collection_save).then(obj => {
        console.log(obj);
    }).catch(obj => {
        console.log(obj);
    });

    let _id = 10
    let name2 = "HarrTTTXXXXXXx"
    let authors2 = "JK"
    let year2 = 2010
    let publisher2 = "Nort"
    await book.update(collection_save, _id, name2, authors2, year2, publisher2).then(obj => {
        console.log(obj);
    }).catch(obj => {
        console.log(obj);
    });
    await book.getBooks(collection_save).then(obj => {
        console.log(obj);
    }).catch(obj => {
        console.log(obj);
    });
    await book.delete(collection_save, 10).then(obj => {
        console.log(obj);
    }).catch(obj => {
        console.log(obj);
    });
    await book.getBooks(collection_save).then(obj => {
        console.log(obj);
    }).catch(obj => {
        console.log(obj);
    });

   /*  await book.getBookById(collection_save,1).then(obj => {
        console.log(obj);
    }).catch(obj => {
        console.log(obj);
    }); */

}
run();