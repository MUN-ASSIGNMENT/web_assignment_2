## To run node app.js
1. make sure you're in the Book Store App directory and run `npm i`
2. make sure mongo is installed
3. run `mongo`
4. in mongo shell: 
    a. run `use my-library`
    b. run `db.createCollection('books')`, and make sure it retun "{ "ok" : 1 }", 
    else: run `db.books.drop()` then `db.createCollection('books')`
5. open a new terminal and locate to Book Store App directory, then run `node app.js`

## To communicate with this API
You will need [Postman](https://www.postman.com/downloads/).

Here is some example on what params, body, - url needed for each purpose.

### Add a new book. (POST Method)
- url: 'http://localhost:3000/books'
- body request example: 
```
{
    "id": 1,
    "name": "Testing",
    "authors": "Mr. Test",
    "year": "2021",
    "publisher": "testPublisher"
}
```

### Retrieve the information of a book by id. (GET Method)
- url: 'http://localhost:3000/books/{id}'

### List all books. (GET Method)
- url: 'http://localhost:3000/books'

### Update a book. (PUT Method)
- url: 'http://localhost:3000/books/{id}'
- body request example: 
```
{
    "id": 1,
    "name": "Testing Testing!!",
    "authors": "Mr. Test",
    "year": "2021",
    "publisher": "testPublisher"
}
```

### Delete a book. (DELETE Method)
- url: 'http://localhost:3000/books/{id}'


## To run the test
1. Open a terminal and run `node app.js`
2. Open another terminal and run `npm test`
3. If there is error. Try: 

    a. run `mongo`

    b. in mongo shell: 
    
        A. run `use my-library`

        B. run `db.createCollection('books')`, and make sure it retun "{ "ok" : 1 }", 
           else: run `db.books.drop()` then `db.createCollection('books')`

    c. in `node app.js` terminal, re-run `node app.js`
    d. then run `npm test`
