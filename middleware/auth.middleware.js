const { firebase } = require('../config/firebase-config.js');
const auth = async (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(403).send('Unauthorized');
    }
    firebase.auth().verifyIdToken(token).then((user) => {
        req.user = user;
        next();
    }).catch(() => {
        res.status(403).send('Unauthorazied')
    })
}

module.exports = { auth };