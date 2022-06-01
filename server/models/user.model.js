const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: String
    },
    username: {
        type: String
    },
    password:{
        type: String
    }
}, {
    collection: 'User'
})

module.exports = mongoose.model('userSchema', userSchema)