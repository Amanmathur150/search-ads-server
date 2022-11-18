const fs = require("fs/promises")
const Ads =  require("../src/models/Ads")
const Company = require("../src/models/Company")
const AppError = require("../src/utils/appError")

module.exports.loadData = async ()=>{
    try {
        // to load all giving data 
        const adsData = await fs.readFile(__dirname+"/ads.json","utf-8")
        const companyData = await fs.readFile(__dirname+"/company.json" , "utf-8")
        let ads = await Company.findOne({name: "Colgate"})
        if(ads){
            console.log("Data is Already Loaded")
        }else{
            await Ads.create(JSON.parse(adsData))
            await Company.create(JSON.parse(companyData))
            console.log("Data loaded Successfully")
        }
        
    } catch (error) {
        console.log(error)
        throw new AppError("Something Went Wrong!")
    }
}