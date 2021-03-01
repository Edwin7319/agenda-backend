const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 60,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 120,
    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = model('user', UserSchema);