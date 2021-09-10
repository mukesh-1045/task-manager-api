const mongoose = require('mongoose');
// const validator = require('validator'); 
// , useCreateIndex: true

mongoose.connect(process.env.MONGODB_PATH, { useNewUrlParser: true, useUnifiedTopology: true });

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error("Email is invalid");
//             }
//         }
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate(value) {
//             if (value < 0) {
//                 throw new Error("Age shoud be +ve number");
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 7,
//         validate(value) {
//             if (value.toLowerCase().includes('password')) {
//                 throw new Error("password can't be password");
//             }
//         }
//     }
// });

// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         trim: true,
//         required: true,
//     },
//     completed: {
//         type: Boolean,
//         default: false,
//     }
// });

// const task = new Task({
//     description: "is       done",

// })

// task.save().then(() => {
//     console.log(task);
// }).catch((error) => {
//     console.log(error);
// })

// const me = new User({
//     name: 'Mukesh',
//     email: 'Mukesh@gmail.com',
//     password: '3334445'
// });

// me.save().then(() => {
//     console.log('result', me);
// }).catch((error) => {
//     console.log('error ', error);
// });