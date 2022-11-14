const jwt = require('jsonwebtoken');
const accessTokenSecret = 'not-a-password';
const bcrypt = require('bcrypt');

const authenticateUser = async (req, smu_id, password) => {
    const accounts = await req.models.account.fetchAccountBySmu_id(smu_id);
    console.log('Results of users query', accounts);
    if (accounts.length === 0) {
        console.error(`No account matched the smu_id: ${smu_id}`);
        return null;
    }
    const account = accounts[0];
    const validPassword = await bcrypt.compare(password, account.password);
    if (validPassword) {

        let auth = jwt.sign({ ...account, claims: [account.role_id, account.smu_id] }, accessTokenSecret);
        let user = {
            ...account,
            "token": auth
        };
        return user;
    }
    return null;
}

module.exports = {
    authenticateUser
};