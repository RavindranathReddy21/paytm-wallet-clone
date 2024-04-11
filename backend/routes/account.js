const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/middleware");
const { Account } = require("../db");
const { User } = require("../db");
const { default: mongoose } = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    const user = await User.findOne({
        _id: req.userId
    });

    res.json({
        balance: account.balance,
        firstname: user.firstName,
        lastname: user.lastName
    })
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction()
    const to = req.body.to;
    const amount = req.body.amount;
    
    const account = await Account.findOne({
        userId: req.userId
    });

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({
        userId: to
    });

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    await Account.updateOne({userId: req.userId}, {$inc:{balance: -amount}});
    await Account.updateOne({userId: to}, {$inc:{balance: amount}});

    session.commitTransaction()

    res.json({
        message: "Transfer successful"
    })
})
module.exports = router;