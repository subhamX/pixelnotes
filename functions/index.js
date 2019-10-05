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
    let docRef = db.collection('notes').doc(""+data.id);
    try{
        var doc = await docRef.get();
        if (!doc.exists) {
            // Case: No Document Exists
            console.log('No such document!');
            // Creating a dummy entry
            var newDoc = await docRef.set({ops:[], id:data.id});
            response.send(newDoc);
        } else {
            // Case: Document Exists
            response.send(doc.data()); 
        }
    }catch(err){
        // Sending Error
        response.send(err);
    }
});

// Recieves Note id and tries to update new data
app.post('/updatedata/', async (req, res)=> {
    let data = req.body;
    let docRef = db.collection('notes').doc(""+data.id);
    try{
        let setData = await docRef.update(data);
        res.send(setData);
    }catch(err){
        res.send(err);
    }
});


// Exporting app
exports.api = functions.https.onRequest(app);
