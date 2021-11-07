const Validator = require("validatorjs")

class Book {
	constructor(id, name, authors, year, publisher) {
		this._id = id //modified this to manually set id in mongodb
		this.name = name
		this.authors = authors
		this.year = year
		this.publisher = publisher
	}

	isValid() {
		const rules = {
			_id: 'required|integer',
			name: 'required|string',
			authors: 'required|string',
			year: 'required|integer',
			publisher: 'required|string',
		}
		const validation = new Validator(this, rules);
		return validation.passes();
	};

	/**
	 * save: This method will save your object in the database. 
	 */
	async save(collection) {
		var book = this;
		return new Promise((resolve, reject) => {
			collection.insertOne(book, (err, obj) => {
				console.log("obj" + JSON.stringify(obj))
				
				if (err) reject(err);
				if(obj === undefined){
					reject(err);
				} else {
					console.log(`this book: ${obj.insertedId} is added to the database`);
					resolve({ msg: 'The book was successfully saved in the database' });
				}
			});
		});
	};

	/**
	 * update: This method should update your object in the database 
	 */
	static async update(collection, id, name, authors, year, publisher) {
		let updateBook = {
			name: name,
			authors: authors,
			year: year,
			publisher: publisher
		}
		return new Promise(async (resolve, reject) => {
			collection.updateOne({ "_id": parseInt(id) }, { $set: updateBook }, (err, obj) => {
				if (err) reject(err);
				if(obj.modifiedCount === 0){
					reject(" Book is not update. Please check your body request (if any value is actually updated.). Or {id} on route param was not found.");
				}
				console.log(`${obj.modifiedCount} number of book is updated in the database`);
				resolve({ msg: 'Book successfully updated in the database' });
			});
		});
	};

	/**
	 * delete: This method should delete your object in the database 
	 */
	static async delete(collection, id) {
		var id_delete = id;
		return new Promise(async function (resolve, reject) {
			collection.deleteOne({_id: parseInt(id_delete)}, (err, obj) => {
                if (err) reject('err');
                console.log(`${obj.deletedCount} number of book is deleted in the database`);
                if(obj.deletedCount <=0){
					resolve({msg: "No book is deleted. The database is empty"})
				}
				else{
					resolve({msg: "The book was successfully deleted"})
				}
            });

		});

	};

	/**
	 * getBookById: This method should retrieve all book data from the database using the id 
	 */
	static async getBookById(collection, id) {
		var id_get = id;
		return new Promise(async function (resolve, reject) {
			collection.findOne({ "_id": parseInt(id_get) }, (err, obj) => {
				if (err) reject(err);
				if (obj === null){
					reject(" Unable to find book with id: " + id_get);
				}
				console.log(`this book: ${JSON.stringify(obj)} is retrieved from the database`);
				resolve({ book: obj, msg: 'Book was successfully retrieved from the database' });
			});
		});
	};

	/**
	 * getBooks: This method should retrieve all books from the database.
	 */
	static async getBooks(collection) {
		return new Promise(async (resolve, reject) => {
			collection.find().toArray((err, obj) => {
				if (err) reject(err);
				console.log(`this books: ${JSON.stringify(obj)} is retrieved from the database`);
				resolve({ books: obj, msg: 'Books were successfully retrieved from the database' });
			});
		});
	};

}

module.exports = Book
