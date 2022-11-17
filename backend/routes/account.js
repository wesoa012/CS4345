const { json } = require('body-parser');
const bodyParser = require('body-parser');
const express = require('express');
router = express.Router();
router.use(bodyParser.json());



router.get('/:id', async (req, res, next) => {
    let accountId = parseInt(req.params.id);
    //let accountId = req.query.id; //Don't know whether params or body will be used
    if (typeof (accountId) !== 'number' || !accountId) {
        console.log("account_id is not type Number");
        res.status(400).send();
    }
    else {
        const accountByID = await req.models.account.fetchAccountBySmu_id(accountId);
        //will return 404 not found if id does not exist
        if (JSON.stringify(accountByID) == '[]') {
            console.log("No user found with id", accountId)
            res.status(404).send();
        }
        else {
            res.json(accountByID);
        }
    }
    next();
});

router.put('/:id/role', async (req, res, next) => {
    let accountId = parseInt(req.params.id);
    //let accountId = req.query.id; //Don't know whether params or body will be used
    if (typeof (accountId) !== 'number' || !accountId) {
        console.log("account_id is not type Number");
        res.status(400).send();
    }
    else {
        console.log("backend route role_id =", req.body.new_role)
        const accountByID = await req.models.account.changeRole(accountId, req.body.new_role);
        res.status = 200;
        res.json(accountByID);
    }
    next();
});

router.get("/", async (req, res, next) => {
    const accounts = await req.models.account.fetchAllAccounts();
    res.json(accounts)
    next();
});

module.exports = router;