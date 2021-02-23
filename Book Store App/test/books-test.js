var assert = require('assert');
const Book = require('../models/book');
const request = require('request');
const mongo = require('../utils/db');

var db;
var bookCollection
async function _get_books_collection(db) {
    try {
        return await db.collection('books');
    } catch (err) {
        throw err;
    }
};

// This method runs once and connects to the mongoDB
before(async function () {
    try {
        db = await mongo.connectToDB();
        bookCollection = await _get_books_collection(db);
    } catch (err) {
        throw err;
    }
});
// this method will close your connection to MongoDB after the tests
after(async function () {
    try {
        mongo.closeDBConnection();
    } catch (err) {
        throw err;
    }

});

describe('Testing the Book API', async function () {
   /*  beforeEach(async () => {
        const books = db.collection("books");
        books.drop();
      }); */
    describe('Testing the Book Model - Simple cases', function () {
        let id = 1
        let name = "Harry"
        let authors = "JK"
        let year = 2010
        let publisher = "Nort"
        
        it('Fail 1 - Test creation of a valid Book with parameters matching', function () {
            var book = new Book(id, name, authors, year, publisher);
            assert.strictEqual(book._id, 1);
            assert.strictEqual(book.name, "Harry");
            assert.strictEqual(book.authors, "JK");
            assert.strictEqual(book.year, 2010);
            assert.strictEqual(book.publisher, "Nort");
        });
        it('Fail 2 - Test an invalid Book id', async function () {
            var book = new Book("x", name, authors, year, publisher);
            assert.strictEqual(await book.isValid(), false);
        });
        it('Fail 3 - Test an invalid Book name', async function () {
            var book = new Book(id, 123, authors, year, publisher);
            assert.strictEqual(await book.isValid(), false);
        });
        it('Fail 4 - Test an invalid Book authors', async function () {
            var book = new Book(id, name, 123, year, publisher);
            assert.strictEqual(await book.isValid(), false);
        });
        it('Fail 5 - Test Invalid Book year', async function () {
            var book = new Book(id, name, authors, "year", publisher);
            assert.strictEqual(await book.isValid(), false);
        });
        it('Success 1 - Test the insertion of a valid Book (Book.save) - Success Msg test', () => {
            var book = new Book(id, name, authors, year, publisher);
            return book.save(bookCollection).then((res) => {
                assert.strictEqual(res.msg, 'The book was successfully saved in the database');
            })
        });
        it('Success 2 - Test the update of a valid Book (Book.update) - Success Msg test', function () {
            var book = new Book(id, name, authors, year, publisher);
            let id2 = 1
            let name2 = "Marry"
            let authors2 = "JK"
            let year2 = 2010
            let publisher2 = "Nort"
            return Book.update(bookCollection, id2, name2, authors2, year2, publisher2).then((res) => {
                assert.strictEqual(res.msg, 'Book successfully updated in the database');
            })
        });
        it('Success 3 - Test the deletetion of a valid Book (Book.delete) - Success Msg test', function () {
            var book = new Book(id, name, authors, year, publisher);
            return Book.delete(bookCollection, 1).then((res) => {
                assert.strictEqual(res.msg, 'The book was successfully deleted');
            })
        });
        it('Success 4 - Test the retrieval of a book by id (Book.getBookById) - Success Msg test', function () {
            var book = new Book(id, name, authors, year, publisher);
            return Book.getBookById(bookCollection, id).then((res) => {
                assert.strictEqual(res.msg, 'Book was successfully retrieved from the database');
            })
        });
        it('Success 5 - Test the retrieval of all books (Book.getBooks) - Success Msg test', function () {
            var book = new Book(id, name, authors, year, publisher);
            return Book.getBooks(bookCollection).then((res) => {
                assert.strictEqual(res.msg, 'Books were successfully retrieved from the database');
            })
        });
    });
    describe('Testing the Book API - Complex Cases', () => {
        describe('Contacts', async () => {
            var myurl = 'http://localhost:3000/books';

            it('Success 1 - POST /books, DELETE /books/:id', async () => {
               
                let data = {
                    id: 1,
                    name: "Harry",
                    authors: "JK",
                    year: 2010,
                    publisher: "Nort"
                }

                 // should create a new book using POST
                await request.post({
                    headers: { 'content-type': 'application/json' },
                    url: myurl,
                    body: JSON.stringify(data)
                }, (error, response, body) => {
                    assert.strictEqual(body, '{"msg":"The book was successfully saved in the database"}');
                });

                //then DELETE the same book
                await request.delete({
                    headers: { 'content-type': 'application/json' },
                    url: myurl+"/1",
                    body: JSON.stringify(data)
                }, (error, response, body) => {
                    assert.strictEqual(body, '{"msg":"The book was successfully deleted"}');
                });
            });
            it('Success 2 - POST /books, GET /books (retrieval greater than 1), DELETE /book/:id', async () => {
                /* 
                You should guarantee (using assert) that your book was created, then that the book count is greater than 1, and then it was deleted. */
                let data = {
                    id: 1,
                    name: "Harry",
                    authors: "JK",
                    year: 2010,
                    publisher: "Nort"
                }

                // should create a new book using POST
                await request.post({
                    headers: { 'content-type': 'application/json' },
                    url: myurl,
                    body: JSON.stringify(data)
                }, (error, response, body) => {
                    assert.strictEqual(body, '{"msg":"The book was successfully saved in the database"}');
                });

                //then query all books using a GET request
                await request.get({
                    headers: { 'content-type': 'application/json' },
                    url: myurl
                }, (error, response, body) => {
                    assert.strictEqual(response, '{"msg":"The book was successfully saved in the database"}');
                });

                //then DELETE the same book
                await request.delete({
                    headers: { 'content-type': 'application/json' },
                    url: myurl+"/1",
                    body: JSON.stringify(data)
                }, (error, response, body) => {
                    assert.strictEqual(body, '{"msg":"The book was successfully deleted"}');
                });
            });
        })
    });
});