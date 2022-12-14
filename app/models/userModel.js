const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    mobile: String,
    email: String,
    wallet: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() }
})
const userModel = mongoose.model('user', userSchema);
module.exports = userModel;