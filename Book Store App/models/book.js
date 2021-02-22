const Validator = require("validatorjs")

async function _get_books_collection (db){
    try{
		return await db.collection('books');
	}catch(err){
		throw err;
	}    
};

class Book {
	constructor(id, name, authors, year, publisher) {
		this.id        = id
		this.name      = name
		this.authors   = authors
		this.year      = year
		this.publisher = publisher
	}

	isValid(){
		const rules = {
			id: 	   'required|integer',
			name:      'required|string',
			authors:   'required|string',
			year:      'required|integer',
			publisher: 'required|string',
		}
		const validation = new Validator(this, rules);
		return validation.passes();		
	};
	
	async save(db) {
		var book =  this;
		return new Promise(async function (resolve, reject){
			/**
			 * Write your code here
			 */
		});
	};

	static async update(db, id, name, authors, year, publisher) {
		return new Promise(async function (resolve, reject){
			/**
			 * Write your code here
			 */			
		});
	};

	static async delete(db, id) {
		var id_delete = id;
		return new Promise(async function (resolve, reject){
			/**
			 * Write your code here
			 */
		});
		
	};
	
	static async getBookById(db, id) {
		var id_get = id;
		return new Promise(async function (resolve, reject){
			/**
			 * Write your code here
			 */
		});
	};

	static async getBooks(db) {
		return new Promise(async function (resolve, reject){
			/**
			 * Write your code here
			 */
		});
	};
	
}

module.exports = Book
