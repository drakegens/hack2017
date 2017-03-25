// import * as bluebird from 'bluebird'
// import Registry from '../models/Registry'

// const passport = require('passport')

export const getNewRegistry = (req, res) => {
    res.render('registry/new', {
        title: 'New Registy',
    })
}