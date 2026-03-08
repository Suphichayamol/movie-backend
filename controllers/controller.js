const Movie = require("../model/model")
let movies = []
let currentId = 1

exports.getMovies = (req, res) => {
    res.json(movies)
}

exports.createMovie = (req, res) => {

    const { title, year, rating } = req.body

    if(!title || !title.trim()){
        return res.status(400).json({
            message:"Title is required"
        })
    }

    const duplicate = movies.find(
        m => m.title.toLowerCase() === title.toLowerCase()
    )

    if (duplicate) {
        return res.status(400).json({
            message: "Movie title already exists"
        })
    }

    const movie = new Movie(
        currentId++,
        title,
        year,
        rating
    )

    movies.push(movie)

    res.json(movie)
}

exports.updateMovie = (req, res) => {

    const id = Number(req.params.id)
    const { title } = req.body

    if(!title || !title.trim()){
        return res.status(400).json({
            message:"Title is required"
        })
    }

    const duplicate = movies.find(
        m =>
            m.title.toLowerCase() === title.toLowerCase() &&
            m.id !== id
    )

    if (duplicate) {
        return res.status(400).json({
            message: "Movie title already exists"
        })
    }

    movies = movies.map(movie =>
        movie.id === id ? { ...movie, ...req.body } : movie
    )

    res.json({ message: "Movie updated" })
}

exports.deleteMovie = (req, res) => {

    const role = req.headers.role

    if (role !== "MANAGER") {
        return res.status(403).json({
            message: "Only MANAGER can delete movies"
        })
    }

    const id = Number(req.params.id)

    movies = movies.filter(movie => movie.id !== id)

    res.json({ message: "Movie deleted" })
}