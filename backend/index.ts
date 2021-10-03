import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import {
    withItemData,
    statelessSessions,
} from '@keystone-next/keystone/session';
import { CourseSchema } from './src/lists/Course';
import { UserSchema } from './src/lists/User';
import { CourseVideoSchema } from './src/lists/CourseVideo';
import 'dotenv/config';

const databaseURL = process.env.DB_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360,
    secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password'],
    },
    passwordResetLink: {
        async sendToken(args) {
            // send the email
            await sendPasswordResetEmail(args.token, args.identity);
        },
    },
});


export default withAuth(
    config({
        // @ts-ignore
        server: {
            cors: {
                origin: [process.env.FRONTEND_URL],
                credentials: true,
            },
        },
        db: {
            adapter: 'mongoose',
            url: databaseURL,
            async onConnect(keystone) {
                console.log('Connected to the database!');
            },
        },
        lists: createSchema({
            // Schema items go in here
            UserSchema,
            CourseSchema,
            CourseVideoSchema
        }),
        ui: {
            // Show the UI only for poeple who pass this test
            isAccessAllowed: ({ session }) =>
                // console.log(session);
                !!session?.data,
        },
        session: withItemData(statelessSessions(sessionConfig), {
            // GraphQL Query
            User: 'id name email',
        }),
    })
);