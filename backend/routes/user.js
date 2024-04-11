const express = require("express");
const { User } = require("../db");
const { Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECERT } = require("../config");
const { authMiddleware } = require("../middlewares/middleware");
let router = express.Router();
const zod = require("zod");

const signupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

router.post("/signup", async (req, res) => {
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;

    const parsedObject = signupBody.safeParse(req.body)

    if(!parsedObject.success){
        return res.status(411).json({
            msg: "Pass valid inputs"
        });
    }

    const existingUser = await User.findOne({
        username: username
    })

    if(existingUser){
        return res.status(411).json({
            msg: "User already exists"
        });
    }

    const user = await User.create({
        username: username,
        firstName: firstName,
        lastName: lastName,
        password: password
    })

    await Account.create({
        userId: user._id,
        balance: Math.floor(Math.random()*10000)+1
    })

    const token = jwt.sign({
            userId: user._id
            }, JWT_SECERT);
    
    res.status(200).json({
        message: "User created successfully",
        token: token
    });
})

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

router.post("/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const parsedObject = signinBody.safeParse(req.body)

    if(!parsedObject.success){
        return res.status(411).json({
            msg: "Pass valid inputs"
        });
    }

    const user = await User.findOne({
        username: username,
        password: password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECERT);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateBody = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().optional()
})

router.put("/update", authMiddleware, async (req, res) => {

    const parsedInput = updateBody.safeParse(req.body);
    if(!parsedInput.success){
        return res.json({
            message: "Error while updating information"
        })
    }
    await User.updateOne({_id: req.userId},
        req.body);

    res.json({
        message: "Updated successfully"
    });
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        users: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;