// import * as bluebird from 'bluebird'
import Registry from '../models/Registry'
import User from '../models/User'
import Item from '../models/Registry'
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

export const saveRegistry = (req, res) => {
const item = new Item({
    name: req.body.nameOfItem,
    price: req.body.itemPrice,
    link: req.body.itemURL,
    description: req.body.itemDescription
})

item.save();

const registry = new Registry({
    userEmail: req.user.email,
    items: [item._id]
})

registry.save();

User.findById(req.user.id, (err, user) => {
user.registry = registry.id;
user.save();

res.redirect(`/registry/${registry.id}`)
});


}