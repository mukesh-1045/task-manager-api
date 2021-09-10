const express = require('express');
require('../db/mongoose');
const User = require('../models/user');
// const bcrypt = require('bcryptjs');
const router = new express.Router()
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');
const { sendWelcomeEmail, sendCancelEmail } = require('../emails/account');


const upload = multer({
    // dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        // cb(new Error('File must be a image'))  // wrong file 
        // cb(undefined , true)                  // sucessfully uploaded
        // cb(undefined,false)                     // direct reject

        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('File must be a jpg , jpeg or png'));
        }
        cb(undefined, true)

    }
});

router.post('/', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }


    // user.save().then(() => {
    //     res.status(201).send(user);
    // }).catch((error) => {
    //     res.status(400).send(error);
    // })



    // console.log(req.body);
    // res.send('testing perfect');
})
    .get('/me', auth, async (req, res) => {

        const user = req.user;    // changed to all user to only one user i.e profile
        res.send(user);

        // try {
        //     const users = await User.find({});
        //     res.status(201).send(users);
        // } catch (error) {
        //     res.status(500).send(error);
        // }
        // User.find({}).then((users) => {
        //     res.status(201).send(users);
        // }).catch((error) => {
        //     res.status(500).send(error);
        // });
    })
    // as we know don't want to see all users profile 
    // .get('/:id', async (req, res) => {
    //     // req.params
    //     const _id = req.params.id;

    //     try {
    //         const user = await User.findById(_id);
    //         if (!user) {
    //             return res.status(404).send();
    //         }
    //         res.status(201).send(user);
    //     } catch (error) {
    //         res.status(500).send(error);
    //     }
    //     // User.findById(_id).then((user) => {
    //     //     if (!user) {
    //     //         return res.status(404).send();
    //     //     }
    //     //     res.status(201).send(user);
    //     // }).catch((error) => {
    //     //     res.status(500).send(error);
    //     // });
    // })
    .patch('/me', auth, async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdate = ['name', 'email', 'age', 'password'];
        const isValidOperation = updates.every((item) => {
            return allowedUpdate.includes(item);
        });

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!!!!!!' })
        }

        try {
            // const user = await User.findById(req.params.id);


            updates.forEach((item) => {
                req.user[item] = req.body[item]
            })

            await req.user.save()

            // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            // if (!user) {
            //     res.status(404).send();
            // }
            res.send(req.user);
        } catch (error) {
            res.status(400).send(error);
        }
    })
    .delete('/me', auth, async (req, res) => {
        try {
            // const user = await User.findByIdAndDelete(req.user._id);
            // if (!user) {
            //     res.status(404).send()
            // }
            await req.user.remove()
            sendCancelEmail(req.user.email, req.user.name);
            res.send(req.user);
        } catch (error) {
            res.status(500).send(error);
        }
    })
    .post('/login', async (req, res) => {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password);

            const token = await user.generateAuthToken();


            res.send({ user, token });
        } catch (error) {
            res.status(400).send();
        }
    })
    .post('/logout', auth, async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.token
            })
            await req.user.save();
            res.send();
        } catch (error) {
            res.status(500).send();
        }
    })
    .post('/logoutAll', auth, async (req, res) => {
        try {
            req.user.tokens = [];
            await req.user.save();
            res.send();
        } catch (error) {
            res.status(500).send()
        }
    })
    .post('/me/avatar', auth, upload.single('avatar'), async (req, res) => {
        //pre process by sharp

        const buffer = await sharp(req.file.buffer).png().resize({ width: 250, height: 250 }).toBuffer()

        req.user.avatar = buffer
        await req.user.save()
        res.send(req.user);
    }, (error, req, res, next) => {
        res.status(400).send({ error: error.message })
    })
    .delete('/me/avatar', auth, async (req, res) => {
        req.user.avatar = undefined
        await req.user.save()
        res.send();
    })
    .get('/:id/avatar', async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
            if (!user || !user.avatar) {
                throw new Error()
            }

            res.set('Content-Type', 'image/png');
            res.send(user.avatar);

        } catch (error) {
            res.status(400).send()
        }
    });


module.exports = router;