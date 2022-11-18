const catchAsync = require("../utils/catchAsyn");
const Ads = require("../models/Ads");

module.exports.getAllAds = catchAsync(async (req, res, next) => {
        // send All the ads data to client
  let data = await Ads.aggregate([
    {
      $lookup: {
        from: "companies",
        localField: "companyId",
        foreignField: "_id",
        as: "company",
      },
    },
    { $unwind: "$company" },
  ]);
  if (data) {
    res.status(200).json({ statusCode: 200, status: "success", data });
  } else {
    res
      .status(200)
      .json({ statusCode: 404, status: "fail", message: "No data found" });
  }
});

module.exports.getAdsBySearch = catchAsync(async (req, res, next) => {
        // send data according to keywords
  let searchData = await Ads.aggregate([
    {
      $lookup: {
        from: "companies",
        localField: "companyId",
        foreignField: "_id",
        as: "company",
      },
    },
    { $unwind: "$company" },
    {
      $match: {
        $or: [
          { "company.name": { $regex: req.query.text, $options: "i" } },
          { headline: { $regex: req.query.text, $options: "i" } },
          { primaryText: { $regex: req.query.text, $options: "i" } },
          { description: { $regex: req.query.text, $options: "i" } },
        ],
      },
    },
  ]);
  if (searchData) {
    res
      .status(200)
      .json({ statusCode: 200, status: "success", data: searchData });
  } else {
    res
      .status(404)
      .json({ statusCode: 404, status: "fail", message: "No data found" });
  }
});
