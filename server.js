const server = require("./app")
const { loadData } = require("./data/loadData")
const { mongoConnect } = require("./src/database/db")

const PORT = process.env.PORT || 5000


server.listen(PORT,async ()=>{
    // connecting to database and loading Data before start Server
    await mongoConnect()
    await loadData()
    
    console.log(`App is listen on ${PORT}`)
})
