const bodyParser = require('body-parser');
const express = require('express');
router = express.Router();
router.use(bodyParser.json());

router.post('/', async (req, res, next) => {
   try {
        const body = req.body;
        let result = await req.models.login.authenticateUser(req, body.smu_id, body.password);
        if(result != null){
            result.status = 200;
            result.success = 1;
            res.status(200).json(result);
        }
        else
        {
            res.status = 401;
            res.status(401).json("Password does not match the id given"); 
        }
   } catch (err) {
       res.status = 401;
       console.error('Failed to authenticate user:', err);
       res.status(401).json({ message: err.toString() });
   }
   next();
})

module.exports = router;