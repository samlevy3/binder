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
        }
    }]
})

const groupsModel = mongoose.model('groupsModel', groupsSchema);

module.exports = groupsModel;