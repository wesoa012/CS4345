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
    let username = req.body.username;
    let password = req.body.password;

    // Check for required parameters
    if(username === undefined || password === undefined){
        console.log("yeah, you are dumb. The username or password is undefined")
        return res.sendStatus(400);
    }

    // Optional parameters
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let roleId;

    if (firstName === undefined){
        firstName = "";
    }
    if(lastName === undefined) {
        lastName = "";
    }

    // let roles;

    // try{
    //     roles = await findRole(util.STUDENT_ROLE_TYPE, schoolId,  null);

    //     if(!roles || roles.length === 0){
    //         roleId = await createRole(util.STUDENT_ROLE_TYPE, schoolId, null);
    //         if(roleId === undefined){
    //             res.status(500).send("Failed to make new role");
    //             return;
    //         }
    //     }
    //     else {
    //         roleId = roles[0].role_id;
    //     }

    // } catch(error) {
    //     return next(error);
    // }


    // Hash password
    const hash = crypto
        .createHmac("sha256", secret)
        .update(password)
        .digest("hex");

    // Query DB for an already existing account
    let rows, fields;
    try{
        [rows, fields] = await pool.execute('SELECT * FROM `accounts` WHERE `username` = ?', [username]);
    } catch(error){
        return next(error);
    }

    if(rows.length !== 0){
        // Account already exists.
        res.status(200).json({success: 0, error: "An account already exists with that username."});
        return;
    }

    // Insert new account into DB
    let accountId;
    try {
        let [result, _] = await pool.execute('INSERT INTO `accounts`(username, password, first_name, last_name, role_id) VALUES (?, ?, ?, ?, ?)',
            [username, hash, firstName, lastName, 1]);

        accountId = result.insertId;

    } catch (error) {
        return next(error);
    }

    res.status(200).json({success: 1, error: "", accountId: accountId});
});


// POST /account/login
router.post("/api/account/login", async (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    // Check for required parameters
    if(username === undefined || password === undefined){
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
        [rows, fields] = await pool.execute('SELECT * FROM `accounts` WHERE `username` = ? AND `password` = ?',
            [username, hash]);
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
    let accountId = user.account_id ? user.account_id : -1;
    let roleType = "";

    if(user.role_id) {
        let role = await getRoleById(user.role_id);
        if(role)
            roleType = role.role_type;
    }

    // This initializes the login session.
    req.session.accountId = user.account_id;
    req.session.username = username;
    req.session.roleType = roleType;
    res.cookie('username', username);
    res.cookie('role_type', roleType);
    res.cookie('account_id', accountId);

    try {
        await setStatusOnline(username);
    } catch(error) {
        return next(error);
    }

    res.json({success: 1, error: "", username: username, account_id: user.account_id});
});


// GET /account/logout
router.get("/api/account/logout", isUserAuthenticated, async (req, res, next) => {
    // Clear the login session.

    let username = req.session.username;

    res.cookie('username', "");
    res.cookie('account_id', "");

    try {
        await setStatusOffline(username);
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
