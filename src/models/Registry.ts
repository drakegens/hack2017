const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    link: String,
    description: String,
    pictureUrl: String,
})

const registrySchema = new mongoose.Schema({
    userEmail: String,
    items: [itemSchema],
});

export default mongoose.model('Registry', registrySchema)

