const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    link: String,
    description: String
})

module.exports = mongoose.model('Item', itemSchema);

const registrySchema = new mongoose.Schema({
    userEmail: String,
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
});

export default mongoose.model('Registry', registrySchema)

