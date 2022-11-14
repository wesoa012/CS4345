const express = require('express');
const router = express.Router();
const pool = require('../db');
const secret = 'not-a-secret';
const crypto = require('crypto');
const util = require('../util');

const {getUsernameFromId, isUserAuthenticated, getRoleById, validateBody} = require("../util");
// const {uploadImage} = require("../s3");
// const {isUserOnline} = require('../websockets');


// POST /account/register
router.post("/api/account/register", async (req, res, next) => {
    console.log("HEY IM HERE> PLEASE SEND HELP CAUSE I AM WORKING")
    let smu_id = req.body.smu_id;
    let password = req.body.password;
    let email = req.body.email;

    // Check for required parameters
    if(smu_id === undefined || password === undefined){
        console.log("yeah, you are dumb. The smu_id or password is undefined")
        return res.sendStatus(400);
    }

    // Optional parameters
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let roleId = 1;

    if (firstName === undefined){
        firstName = "";
    }
    if(lastName === undefined) {
        lastName = "";
    }
    if(email === undefined) {
        email = "";
    }

    // Hash password
    const hash = crypto
        .createHmac("sha256", secret)
        .update(password)
        .digest("hex");

    // Query DB for an already existing account
    let rows, fields;
    try{
        [rows, fields] = await pool.execute('SELECT * FROM `accounts` WHERE `smu_id` = ?', [smu_id]);
    } catch(error){
        return next(error);
    }

    if(rows.length !== 0){
        // Account already exists.
        res.status(200).json({success: 0, error: "An account already exists with that username."});
        return;
    }

    // Insert new account into DB
    try {
        let [result, _] = await pool.execute('INSERT INTO `accounts`(smu_id, password, first_name, last_name, role_id, email) VALUES (?, ?, ?, ?, ?, ?)',
            [smu_id, hash, firstName, lastName, 1, email]);

    } catch (error) {
        return next(error);
    }

    res.status(200).json({success: 1, error: "", smu_id: smu_id});
});


// POST /account/login
router.post("/api/account/login", async (req, res, next) => {
    let smu_id = req.body.smu_id;
    let password = req.body.password;

    // Check for required parameters
    if(smu_id === undefined || password === undefined){
        return res.sendStatus(400);
    }

    // Hash password
    const hash = crypto
        .createHmac("sha256", secret)
        .update(password)
        .digest("hex");

    // Query DB for credentials
    let rows, fields;
    try{
        [rows, fields] = await pool.execute('SELECT * FROM `accounts` WHERE `smu_id` = ? AND `password` = ?',
            [smu_id, hash]);
    } catch(error){
        return next(error);
    }

    res.status(200);

    if(rows.length === 0){
        res.json({success: 0, error: "Invalid credentials."}).send();
        return next();
    }
    else if(rows.length > 1){
        res.json({success: 0, error: "Multiple accounts with same credentials"}).send();
        return next();
    }

    let user = rows[0];
    smu_id = user.smu_id ? user.smu_id : -1;


    // This initializes the login session.
    req.session.smu_id = user.smu_id;
    res.cookie('smu_id', smu_id);

    // try {
    //     await setStatusOnline(username);
    // } catch(error) {
    //     return next(error);
    // }

    res.json({success: 1, error: "", smu_id: smu_id});
});


// GET /account/logout
router.get("/api/account/logout", isUserAuthenticated, async (req, res, next) => {
    // Clear the login session.

    let smu_id = req.session.smu_id;

    res.cookie('smu_id', "");

    try {
        await setStatusOffline(smu_id);
    } catch(error) {
        logger.info("Failed to update status to offline.");
        return next(error);
    }

    req.session.destroy((err) => {
        if(err) return next(err);
        res.clearCookie('connect.sid', {
            path : "/"
        });
        res.sendStatus(200);
    });
});

module.exports = router;
