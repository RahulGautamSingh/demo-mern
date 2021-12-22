const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const AdminSchema = Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
},
    { timestamps: true }
);

AdminSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

AdminSchema.statics.signin = async function (email, password) {
    const admin = await this.findOne({ email });
    console.log({ admin });
    if (admin) {
        const passwordCheck = await bcrypt.compare(password, admin.password);
        console.log(password, admin.password);
        if (passwordCheck) {
            return admin;
        } else {
            console.log('Passwords did not match!');
        }
    } else {
        console.log('This email is yet to sign up!');
    }
}

module.exports = mongoose.model('admin', AdminSchema);