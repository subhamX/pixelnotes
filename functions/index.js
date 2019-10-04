// Imports
const functions = require('firebase-functions');
const express  = require('express');
const admin = require('firebase-admin');
const cors = require('cors')
const app = express();

// Whitelisting Requests From All Origin
app.use(cors({origin:true}));

// Using JSON middleware
app.use(express.json());

// Initializing Firebase DB 
let serviceAccount = require('./admin-key.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
let db = admin.firestore();

// Recieves Note id and tries to fetch data with that id
app.post('/getdata/', async (request, response) => {
    let data = request.body;
    console.log(data.id);
    try{
        let docRef = db.collection('notes').doc(data.id);
        var doc = await docRef.get();
        if (!doc.exists) {
            // Case: No Document Exists
            console.log('No such document!');
            // Creating a dummy entry
            var newDoc = await docRef.set({ops:[], id:data.id});
            response.send(newDoc);
        } else {
            // Case: Document Exists
            console.log('Document data:', doc.data());
            response.send(doc.data()); 
        }
    }catch(err){
        // Sending Error
        response.send(err);
    }
});

// Exporting app
exports.api = functions.https.onRequest(app);
