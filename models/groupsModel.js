const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupsSchema = new Schema ({
    course: {
        type: String,
        required: true
    }, 
    members: [{
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }

    }]
})

const groupsModel = mongoose.model('groupsModel', groupsSchema);

module.exports = groupsModel;