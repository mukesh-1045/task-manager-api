// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObejctID = mongodb.ObejctID;

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1"27017';
const databaseName = 'task-manager';

// creating id
// const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log("unable to connect to databse");
    }

    // console.log("connected!!!!!!!!!!!!!!!!");
    const db = client.db(databaseName);

    //insert One
    // db.collection('users').insertOne({ name: 'Mukesh', age: 21 }, (error, result) => {
    //     if (error) {
    //         return console.log('unable to insert');
    //     }
    //     console.log(result.ops);
    // });

    //insert Many
    // db.collection('users').insertMany([{ name: 'rohit', age: 45 }, { name: 'dhanashree', age: 20 }], (error, result) => {
    //     if (error) {
    //         return console.log('unable to insert');
    //     }
    //     console.log(result.ops);
    // });

    // db.collection('task').insertMany([{
    //     desc: 'study',
    //     complete: true
    // },
    // {
    //     desc: 'sleep',
    //     complete: false
    // }], (error, result) => {
    //     if (error) {
    //         return console.log('unable to insert');
    //     }
    //     console.log(result.ops)
    // });


    // insert One with manual id
    // db.collection('users').insertOne({ _id: id, name: 'Mukesh Buldak', age: 20 }, (error, result) => {
    //     if (error) {
    //         return console.log('unable to insert');
    //     }
    //     console.log(result.ops);
    // });

    // find one 
    // db.collection('users').findOne({ name: 'Mukesh' }, (error, user) => {
    //     if (error) {
    //         return console.log('unable to fetach');
    //     }
    //     console.log('user', user);
    // });

    //find multiple
    // db.collection('users').find({ age: 20 }).toArray((error, users) => {
    //     console.log(users);
    // })

    //updating document
    // const updatePromise = db.collection('users').updateOne({ _id: new ObjectID("6137b35001137913845ea6bb") },
    //     {
    //         $set: {
    //             name: 'Hunter'
    //         },
    //         $inc: {
    //             age: 1
    //         }
    //     }
    // );

    // updatePromise.then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

    //delete One


});