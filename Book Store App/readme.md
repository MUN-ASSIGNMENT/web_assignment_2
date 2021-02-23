### To run node app.js
1. make sure you're in the Book Store App directory and run `npm i`
2. make sure mongo is installed
3. run `mongo`
4. in mongo shell: 
    a. run `use my-library`
    b. run `db.createCollection('books')`, and make sure it retun "{ "ok" : 1 }", 
    else: run `db.books.drop()` then `db.createCollection('books')`
5. open a new terminal and locate to Book Store App directory, then run `node app.js`

### To run the test
1. make sure you have another terminal open and is running `node app.js`
2. run `npm test`
3. if there is error. Try: 
    a. run `mongo`
    b. in mongo shell: 
        A. run `use my-library`
        B. run `db.createCollection('books')`, and make sure it retun "{ "ok" : 1 }", 
           else: run `db.books.drop()` then `db.createCollection('books')`
    c. in `node app.js` terminal, re-run `node app.js`
    d. then run `npm test`