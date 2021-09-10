const express = require('express');
const app = express();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');


const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const port = process.env.PORT;

//file upload example 
// const multer = require('multer')

// const upload = multer({
//     dest: 'images'
// });

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send();
// })


//middelware example 


// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET Request are disabled');
//     } else {
//         next();
//     }
// });

// maintenance mode creation 
// app.use((req, res, next) => {
//     res.status(500).send("Currently under maintenance");
// })



app.use(express.json());
app.use('/users', userRouter);
app.use('/tasks', taskRouter);


app.listen(port, () => {
    console.log("server is up on , ", port);
});


// jwt token example

// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc32423sef' }, 'this is my new project', { expiresIn: '7 days' });
//     console.log(token);

//     const data = jwt.verify(token, 'this is my new project');
//     console.log(data);
// }

// myFunction()

// const Task = require('./models/task')
// const User = require('./models/user')


// populating / binding of data in models example

// const main = async () => {
//     const task = await Task.findById('613a798e498cb4a44305293d')
//     await task.populate('owner')
//     console.log(task.owner);

//     //613a7988498cb4a443052937 -user

//     const user = await User.findById('613a7988498cb4a443052937');
//     await user.populate('tasks')
//     console.log(user.tasks);
// }

// main()