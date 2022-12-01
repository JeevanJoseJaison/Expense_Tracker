const express = require("express");
const Transaction = require("../models/Transaction");
const router = express.Router();
const moment = require("moment");

router.post("/addtransaction", async function (req, res) {
  try {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    res.send("Transaction Added Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/getalltransactions", async function (req, res) {
  const { frequency, range ,type} = req.body;
  try {
    let transactions;
    if (frequency !== "0") 
    {
      if (frequency === "custom") {
        transactions = await Transaction.find({
          date: {
            $gte: range[0],
            $lte: range[1]
          },
          userID: req.body.userID,...(type!=="all"&&{type})
        });
      } 
      else {
        transactions = await Transaction.find({
          date: {
            $gt: moment().subtract(Number(frequency), "d").toDate(),
          },
          userID: req.body.userID,...(type!=="all"&&{type})
        });
      }
    } 
    
    else {
      transactions = await Transaction.find({ userID: req.body.userID,...(type!=="all"&&{type}) });
    }
    res.send(transactions);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

module.exports = router;
