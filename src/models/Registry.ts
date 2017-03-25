const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    link: String,
    description: String
})

export const Item = mongoose.model('Item', itemSchema);

const registrySchema = new mongoose.Schema({
    userEmail: String,
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
});

export const Registry = mongoose.model('Registry', registrySchema)

const contributionSchema = new mongoose.Schema({
    contributorEmail: String,
    contributorName: String,
    amount: Number
});

export const Contribution = mongoose.model('Contribution', contributionSchema)