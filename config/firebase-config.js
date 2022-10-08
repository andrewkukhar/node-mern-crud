let admin = require("firebase-admin");
const serviceAccount = require("./ServiceAccount.json");

const firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
module.exports = firebase