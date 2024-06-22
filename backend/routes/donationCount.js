const express = require("express");
const auth = require("../middlewares/authMiddleware");
const DonationModel = require("../models/donationModel");
const router = express.Router();

router.get("/count", async (req, res) => {
  try {
    let count = await DonationModel.aggregate([
      {
        $facet: {
          healtCount: [
            {
              $match: { category: "health" },
            },
            {
              $count: "count",
            },
          ],
          educationCount: [
            {
              $match: { category: "education" },
            },
            {
              $count: "count",
            },
          ],
          foodCount: [
            {
              $match: { category: "food" },
            },
            {
              $count: "count",
            },
          ],
          indiaDonation: [
            {
              $match: { category: "indiadonation" },
            },
            {
              $count: "count",
            },
          ],
        },
      },
    ]);

    return res.status(200).send(count);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = router;
