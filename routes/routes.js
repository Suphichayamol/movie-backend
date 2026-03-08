const express = require("express")

const {
    getMovies,
    createMovie,
    updateMovie,
    deleteMovie
} = require("../controllers/controller")

const { checkManager } = require("../middleware/middleware")

const router = express.Router()

router.get("/", getMovies)

router.post("/", createMovie)

router.put("/:id", updateMovie)

router.delete("/:id", checkManager, deleteMovie)

module.exports = router