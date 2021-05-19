const passport = require('passport');
const LocalStrategy = require('passport-local');

const Admin = require('../models/adminModel');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    const admin = await Admin.findOne({email: email});

    if (!admin)
    {
        return done(null, false, {message: 'Admin not found.'});
    }
    else
    {
        const match = await Admin.matchPassword(password);

        if (match)
        {
            return done(null, admin);
        }
        else
        {
            return done(null, false, {message: 'Incorrect password.'});
        }
    }
}));

passport.serializeAdmin((admin, done) => {
    done(null, admin._id);
});

passport.deserializeAdmin((_id, done) => {
    Admin.findById(_id, (err, admin) => {
        done(err, admin);
    });
});