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

	async save(collection) {
		var book = this;
		return new Promise((resolve, reject) => {
			/**
			 * Write your code here
			 * save: This method will save your object in the database. 
			 */
			collection.insertOne(book, (err, obj) => {
				if (err) reject(err);
				console.log(`this book: ${obj.insertedId} is added to the database`);
				resolve({ msg: 'The book was successfully saved in the database' });
			});
		});
	};

	static async update(collection, id, name, authors, year, publisher) {
		let updateBook = {
			name: name,
			authors: authors,
			year: year,
			publisher: publisher
		}
		return new Promise(async (resolve, reject) => {
			/**
			 * Write your code here
			 * update: This method should update your object in the database 
			 */
			collection.updateOne({ "_id": parseInt(id) }, { $set: updateBook }, (err, obj) => {
				if (err) reject(err);
				console.log(`${obj.modifiedCount} number of book is updated in the database`);
				resolve({ msg: 'Book successfully updated in the database' });
			});
		});
	};

	static async delete(collection, id) {
		var id_delete = id;
		return new Promise(async function (resolve, reject) {
			/**
			 * Write your code here
			 * delete: This method should delete your object in the database 
			 */
			collection.deleteOne({_id: parseInt(id_delete)}, (err, obj) => {
                if (err) reject('err');
                console.log(`${obj.deletedCount} number of book is deleted in the database`);
                resolve({msg: "The book was successfully deleted"})
            });

		});

	};

	static async getBookById(collection, id) {
		var id_get = id;
		return new Promise(async function (resolve, reject) {
			/**
			 * Write your code here
			 * getBookById: This method should retrieve all book data from the database using the id 
			 */
			collection.findOne({}, { "_id": parseInt(id_get) }, (err, obj) => {
				if (err) reject(err);
				console.log(`this book: ${JSON.stringify(obj)} is retrieved from the database`);
				resolve({ obj: obj, msg: 'Book was successfully retrieved from the database' });
			});
		});
	};

	static async getBooks(collection) {
		return new Promise((resolve, reject) => {
			/**
			 * Write your code here
			 * getBooks: This method should retrieve all books from the database.
			 */
			collection.find().toArray((err, obj) => {
				if (err) reject(err);
				console.log(`this books: ${JSON.stringify(obj)} is retrieved from the database`);
				resolve({ obj: obj, msg: 'Books were successfully retrieved from the database' });
			});
		});
	};

}

module.exports = Book
