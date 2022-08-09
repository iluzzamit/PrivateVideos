import { get as getUsers, set as setUser, update as updateUser, remove as removeUser, getOne } from '../service/user';
import express from 'express';
import path from 'path';
import fs from 'fs';

const router = express.Router()

// get all videos
router.get('/videos', async (req, res, next) => {
    try {
        const videosPath = path.join(path.resolve(__dirname, '..'), "videos")
        fs.readdir(videosPath, (err, files) => {
            res.status(200).send(files)
        });
    } catch (e) {
        next(e)
    }
})

// get all users
router.get('/', async (req, res, next) => {
    try {
        const users = await getUsers();
        res.send(users);
    } catch (e) {
        next(e)
    }
})

// set new user
router.post('/', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw Error('Missing fields')
        }

        const existingUser = await getOne(email);

        if (existingUser) {
            throw Error('User already exists')
        }

        const user = await setUser(req.body)

        res.status(201).send(user)
    } catch (e) {
        next(e)
    }
})

// update new user
router.put('/', async (req, res, next) => {
    try {
        const user = await updateUser(req.body)
        res.status(200).send(user)
    } catch (e) {
        next(e)
    }
})

// update new user
router.delete('/', async (req, res, next) => {
    try {
        const user = await removeUser(req.body)
        res.status(200).send(user)
    } catch (e) {
        next(e)
    }
})

export default router