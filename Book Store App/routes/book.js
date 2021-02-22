const express = require('express')
const router  = express.Router()

const book_controller = require("../controllers/books.js")

router.post("/", book_controller.create)
router.get("/", book_controller.all)
router.get("/:id", book_controller.getOne)
router.put('/:id', book_controller.updateOne)
router.delete('/:id', book_controller.deleteOne)

module.exports = router
