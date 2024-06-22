const express = require("express");
const graphRouter = express.Router();
const DonationModel = require("../models/donationModel");

graphRouter.get("/", async (req, res) => {
  try {

      let donation = await DonationModel.find();
  
      let counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  
      for (let i = 0; i < donation.length; i++) {
        let id = donation[i]._id;
        const bookData = await bookings.aggregate([
          {
            $match: {
              property_id: id,
              isactive: constants.CONTENT_STATE.IS_ACTIVE,
            },
          },
          {
            $group: {
              _id: { $dateToString: { format: "%Y-%m", date: "$booked_on" } },
              count: { $sum: 1 },
            },
          },
        ]);
  
        for (let j = 0; j < bookData.length; j++) {
          let data = bookData[j];
          let monthIndex = new Date(data._id).getMonth();
          counts[monthIndex] += data.count;
        }
      }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = dashboardRouter;
