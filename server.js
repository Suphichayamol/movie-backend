const express = require("express")
const cors = require("cors")

const movieRoutes = require("./routes/routes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/movies", movieRoutes)

app.listen(5000, () => {
 console.log("Server running on port 5000")
})