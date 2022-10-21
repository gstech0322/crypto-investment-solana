const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require('firebase-admin/firestore');
require('dotenv').config();
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert({
    project_id: process.env.project_id,
    private_key_id: process.env.private_key_id,
    private_key: process.env.private_key,
    client_email: process.env.client_email,
    client_id: process.env.client_id,
    client_x509_cert_url: process.env.auth_provider_x509_cert_url,
  }),
  databaseURL: 'https://crypto-tra-491d2-default-rtdb.firebaseio.com',
});

const db = getFirestore();

module.exports = { admin, db };
