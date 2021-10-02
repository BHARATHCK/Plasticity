const dotenv = require("dotenv").config();
const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');

const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const PROJECT_NAME = 'backend';

const adapterConfig = { mongoUri: process.env.DB_URL };

const CourseSchema = require('./src/lists/Course');
const UserSchema = require('./src/lists/User');
const CourseVideoSchema = require('./src/lists/CourseVideo');

const keystone = new Keystone({
    adapter: new Adapter(adapterConfig),
    cookieSecret: process.env.COOKIE_SECRET,
});

// Access control functions
const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin);
const userIsLoggedIn = ({ authentication: { item: user } }) => {
    if (!user) {
        return false;
    }
    return true;
};

keystone.createList('Course', {
    fields: CourseSchema.fields,
    access: {
        read: true,
        create: userIsLoggedIn,
        update: userIsLoggedIn,
        delete: userIsLoggedIn
    }
});
keystone.createList('User', {
    fields: UserSchema.fields,
    access: {
        read: true,
        create: true,
        update: userIsLoggedIn,
        delete: userIsLoggedIn
    }
});

keystone.createList('CourseVideo', {
    fields: CourseVideoSchema.fields,
    access: {
        read: userIsLoggedIn,
        create: userIsLoggedIn,
        update: userIsLoggedIn,
        delete: userIsLoggedIn
    }
});

const authStrategy = keystone.createAuthStrategy({
    type: PasswordAuthStrategy,
    list: 'User',
    config: {
        protectIdentities: process.env.NODE_ENV === 'production',
        identityField: 'email',
        secretField: 'password'
    },
});

module.exports = {
    keystone,
    apps: [
        new GraphQLApp(),
        new AdminUIApp({
            name: PROJECT_NAME,
            enableDefaultRoute: true,
            authStrategy,
            isAccessAllowed: ({ authentication: { item: user } }) => {
                console.log(user);
                return !!user && !!user.isAdmin
            },
        }),
    ],
    statelessSessions: {
        maxAge: 60 * 60 * 24 * 360,
        secret: process.env.COOKIE_SECRET,
    }
};