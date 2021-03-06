const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = Schema({
    name: {
        type: String,
        required: true
    },
    course: [{
        type: Schema.Types.ObjectId
    }]
},
    { timestamps: true }
);

module.exports = mongoose.model('student', StudentSchema);