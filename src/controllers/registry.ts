// import * as bluebird from 'bluebird'
// import Registry from '../models/Registry'
import User from '../models/User'

// const passport = require('passport')

export const getNewRegistry = (req, res) => {
    res.render('registry/new', {
        title: 'New Registy',
    })
}

export const getSearchRegistry = (req, res) => {
    const userRegex = new RegExp(`.*${req.query.search}.*`, 'i')
    User.find({ 'profile.name': userRegex }, (err, users) => {
        if (err) {
            users = []
        }
        res.render(`registry/search`, {
            title: 'Find Registry',
            search: req.query.search,
            users: users,
        })
    })
}

export const getUserRegistry = (req, res) => {
    User.findById(req.params.userId, (err, user) => {
        res.render('registry/view', {
            title: `${user.profile.name}'s Registry`,
            user: user,
        })
    })
}