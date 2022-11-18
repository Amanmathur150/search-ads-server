const express = require("express")
const { getAdsBySearch, getAllAds } = require("../controllers/adsControllers")

let adsRouter = express.Router()
// Ads Router
adsRouter.get("/search",getAdsBySearch)
adsRouter.get("/",getAllAds)

module.exports = adsRouter