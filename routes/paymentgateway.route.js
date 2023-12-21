const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());
const path = require("path");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const crypto = require("crypto");
require("dotenv").config();

var razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post('/payAmount', async (req, res, next) => {
    const payment_capture = 1;
    const now = new Date();
    const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    console.log("Booking data sent to RPay: ",timestamp,"-",req.body);
    const amount = parseInt(req.body.total_price * 100);
    const currency = "INR";
    const options = {
        amount,
        currency,
        receipt: shortid.generate(),
        payment_capture,
    };
    try {
        const response = await razorpay.orders.create(options);
        res.status(200).json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        });
    } catch (err) {
        console.log(err);
    }
});
router.post('/foodPayment', async (req, res, next) => {
    const payment_capture = 1;
    const amount = parseInt(req.body.total_price * 100);
    const currency = "INR";
    const options = {
        amount,
        currency,
        receipt: shortid.generate(),
        payment_capture,
    };

    try {
        const response = await razorpay.orders.create(options);
        res.status(200).json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        });
    } catch (err) {
        console.log(err);
    };
});
router.post('/medicalPayment', async (req, res, next) => {
    const payment_capture = 1;
    const amount = parseInt(req.body.total_price * 100);
    const currency = "INR";
    const options = {
        amount,
        currency,
        receipt: shortid.generate(),
        payment_capture,
    };

    try {
        const response = await razorpay.orders.create(options);
        res.status(200).json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        });
    } catch (err) {
        console.log(err);
    }
});
router.post('/travelPayment', async (req, res, next) => {
    const payment_capture = 1;
    const amount = parseInt(req.body.total_price * 100);
    const currency = "INR";
    const options = {
        amount,
        currency,
        receipt: shortid.generate(),
        payment_capture,
    };

    try {
        const response = await razorpay.orders.create(options);
        res.status(200).json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        });
    } catch (err) {
        console.log(err);
    }
})



module.exports = router;