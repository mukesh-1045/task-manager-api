const express = require('express');
const router = new express.Router()
require('../db/mongoose');
const Task = require('../models/task');
const auth = require('../middleware/auth');


router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body);
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
    // task.save().then(() => {
    //     res.status(201).send(task);
    // }).catch((error) => {
    //     res.status(201).send(task);
    // })
    // console.log(req.body);
    // res.send('testing perfect');
})
    .get('/tasks', auth, async (req, res) => {
        const match = {}
        const sort = {}
        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':');
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        }
        // req.query.completed
        if (req.query.completed) {
            match.completed = req.query.completed === 'true'
        }
        try {

            // or can do 
            await req.user.populate({
                path: 'tasks',
                match,
                options: {
                    limit: parseInt(req.query.limit),
                    skip: parseInt(req.query.skip),
                    sort
                }
            })
            // const tasks = await Task.find({ owner: req.user._id })
            // if (!tasks) {
            //     return res.status(404).send();
            // }
            res.status(201).send(req.user.tasks);
        } catch (error) {
            res.status(500).send(error);
        }
        // Task.find({}).then((tasks) => {
        //     res.status(201).send(tasks);
        // }).catch((error) => {
        //     res.status(500).send(error);
        // });
    })
    .get('/tasks/:id', auth, async (req, res) => {
        // req.params
        const _id = req.params.id;

        try {
            const task = await Task.findOne({ _id, owner: req.user._id })


            if (!task) {
                return res.status(404).send();
            }
            res.status(201).send(task);
        } catch (error) {
            res.status(500).send(error);
        }
        // Task.findOne({ description }).then((task) => {
        //     if (!task) {
        //         return res.status(404).send();
        //     }
        //     res.status(201).send(task);
        // }).catch((error) => {
        //     res.status(500).send(error);
        // });
    })
    .patch('/tasks/:id', auth, async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdate = ['description', 'completed'];
        const isValidOperation = updates.every((item) => {
            return allowedUpdate.includes(item);
        });

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!!!!!!' })
        }

        try {

            // const task = await Task.findById(req.params.id);
            const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

            // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!task) {
                res.status(404).send();
            }
            updates.forEach((item) => {
                task[item] = req.body[item]
            })
            await task.save();
            res.send(task);
        } catch (error) {
            res.status(400).send(error);
        }
    })
    .delete('/tasks/:id', auth, async (req, res) => {
        try {
            const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
            if (!task) {
                res.status(404).send()
            }
            res.send(task);
        } catch (error) {
            res.status(500).send(error);
        }
    });


module.exports = router;