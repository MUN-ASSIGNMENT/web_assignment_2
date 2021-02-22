const Book = require('./models/book')
const MongoClient = require("mongodb").MongoClient
const uri ="mongodb://localhost:27017";
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function get_collection(){
    try {
        await client.connect();
        let db = client.db('my-library');;
        return await db.collection('books');
    }catch(err){
        console.log(err);
    }    
}

async function run(){
    let id       = 1
    let name     = "Harry"
    let authors  = "JK"
    let year     = 2010
    let publisher= "Nort"
    var book = new Book(id, name, authors, year, publisher);
    var collection_save = await get_collection();

    book.save(collection_save).then(obj => {
        console.log(obj);
    }).catch(obj => {
        console.log(obj);
    });

}
run();