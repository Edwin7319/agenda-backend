const {Schema, model} = require('mongoose');

const EventSchema = Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 120,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    notes: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
});

module.exports = model('event', EventSchema);