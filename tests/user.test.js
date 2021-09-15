const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'hunter',
    email: "hunter@gmail.com",
    password: 'hello@123',
    tokens: [
        {
            token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
        }
    ]
}


beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()

})

// afterEach(() => {
//     console.log("after");
// })

test('should sign up a new user', async () => {
    const res = await request(app).post('/users').send({
        name: 'mukesh',
        email: 'mukesh@gmail.com',
        password: 'asdfg@123'
    }).expect(201)

    const user = await User.findById(res.body.user._id)
    expect(user).not.toBeNull()

    expect(res.body).toMatchObject({
        user: {
            name: "mukesh",
            email: "mukesh@gmail.com",

        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('asdfg@123')
})


test('should login exisitin user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password,
    }).expect(200)
})


test('should not login exisitin user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'sdfhksdlfjklahfkhf',
    }).expect(400)
})


test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(404)
})

test('Should delete user profile ', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})


test('should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/bn.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})