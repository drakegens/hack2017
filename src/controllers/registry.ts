// import * as bluebird from 'bluebird'
import { Registry, Item, Contribution } from '../models/Registry'
import User from '../models/User'
const _ = require('lodash')

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

export const getUserRegistry = (req, res) => {
    User.findOne({ registry: req.params.registryId })
    .populate({
        path: 'registry', 
        populate: {
            path: 'items',
            model: 'Item',
            populate: {
                path: 'contributions',
                model: 'Contribution'
            },
        },
    })
    .exec( (err, user) => {
        res.render('registry/view', {
            title: `${user.profile.name}'s Registry`,
            user: user,
        })
    })
}

export const getContribute = (req, res) => {
    Item.findById(req.params.itemId)
        .populate({
            path:'contributions',
            model: 'Contribution',
        })
        .exec((err, item) => {
            res.render('registry/contribute', {
                title: 'Contribute',
                item: item,
            })
        })
}

export const getContributeSuccess = (req, res) => {
    const amount = parseInt(req.query.amount, 10) / 100
    const paymentId = req.query.paymentId

    Contribution.find({ foreignSystemId: paymentId }, (err, contribution) => {
        Item.findById(req.params.itemId)
        .populate({
            path:'contributions',
            model: 'Contribution',
        })
        .exec((err, item) => {
            if (_.isEmpty(contribution) && req.query.paymentStatus === 'APPROVED') {
                contribution = new Contribution({
                    contributorEmail: '',
                    contributorName: '',
                    amount,
                    foreignSystemId: paymentId,
                })
                contribution.save()
                if (_.isNil(item.contributions)) {
                    item.contributions = [contribution]
                } else {
                    item.contributions.push(contribution)
                }

                item.save()
            }
            
            res.render('registry/contribute_success', {
                title: 'Successful contribution',
                item: item,
            })
        })
    })
}