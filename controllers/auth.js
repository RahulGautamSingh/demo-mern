const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const newAdmin = new Admin({ email, password });
        await newAdmin.save();
        return res.json({ admin: newAdmin });
    } catch (err) {
        console.error(err.message);
        return res.json({ err: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const admin = await Admin.signin(email, password);
        if (admin) {
            const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);
            res.cookie('admin', token, { expire: new Date() + 9999 });
            return res.json({ token, admin });
        } else {
            return res.status(400).json({ error: 'Something went wrong!' });
        }
    } catch (err) {
        console.log(err);
        return res.json({ err });
    }
}

exports.logout = function (req, res) {
    res.clearCookie('admin');
    return res.json({ msg: 'You have been signed out successfuly!' });
}