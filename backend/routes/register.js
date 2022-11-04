const bodyParser = require('body-parser');
const express = require('express');
router = express.Router();
router.use(bodyParser.json());

//to create an account. Will all be students, admin will be able to change account type to professor or admin
router.post('/', async (req, res, next) => {
    console.log("recieved -",req.body);
    let smu_id = req.body.smu_id;
    let password = req.body.password;

    if (smu_id === undefined || password === undefined) {
        console.log("smu_id or password is undefined")
        return res.sendStatus(400);
    }

    let email = req.body.email;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let role_id = 1; //student

    if (first_name === undefined) {
        first_name = "";
    }
    if (last_name === undefined) {
        last_name = "";
    }
    if (email === undefined) {
        email = "";
    }

    const accounts = await req.models.account.fetchAccountBySmu_id(smu_id);
    if (accounts.length === 0) {
        console.log(`No account matched the smu_id = ${smu_id}, creating account`);
        const registerAccount = await req.models.register.createAccount
            (smu_id,
                password,
                email,
                first_name,
                last_name,
                role_id);
        res.status=201;
        res.success=1;
        res.sendStatus(201);
        next();
    }
    else if (accounts.length > 0) {
        res.status=400;
        console.log(`Account already created with smu_id = ${smu_id}`);
        return res.sendStatus(400);
    }
    else {
        res.status=401;
        console.log(`Unknown error has occured`);
        return res.sendStatus(401);
    }
});


module.exports = router;