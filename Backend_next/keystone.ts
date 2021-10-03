import { config, createSchema } from '@keystone-next/keystone';
import { statelessSessions } from '@keystone-next/keystone/session';
import { lists } from './schema';
import { createAuth } from '@keystone-next/auth';
import { Course } from './src/lists/Course';
import {Subscription} from "./src/lists/Subscription";
import { User } from './src/lists/User';
import { CourseVideo } from './src/lists/CourseVideo';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';
import {sendEmail} from "./src/utils/sendMail";
import {extendGraphqlSchema} from "./src/mutations";

const databaseURL = process.env.DB_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';


const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  sessionData: 'id name email',
  initFirstItem: {
      fields: ['name', 'email', 'password'],
  },
  passwordResetLink: {
      async sendToken(args) {
          // send the email
          console.log(args)
          await sendEmail(args.identity,  process.env.RESET_PASSWORD_URL+args.token , "" , false , "")
      },
  },
});


export default withAuth(
  config({
      // @ts-ignore
      server: {
          cors: {
              origin: [process.env.FRONTEND_URL || ""],
              credentials: true,
          },
      },
      db: {
          provider: "postgresql",
          url: databaseURL,
          async onConnect(keystone) {
              console.log('Connected to the database!');
          },
      },
      lists: createSchema({
          // Schema items go in here
          User,
          CourseVideo,
          Course,
          Subscription
      }),
      extendGraphqlSchema,
      ui: {
          // Show the UI only for poeple who pass this test
          isAccessAllowed: ({ session }) =>
              // console.log(session);
              !!session?.data,
      },
      files: {
        upload: 'local',
        transformFilename: (filename: string) => {
          console.log("File name after upload : ",filename);
          return uuidv4()+"-"+filename;
        },
        local: {
          storagePath: 'public/files',
          baseUrl: 'https://plasticityv1.s3.ap-south-1.amazonaws.com//',
        },
      },
      session: statelessSessions({
        maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
        secret: process.env.COOKIE_SECRET || "",
      })
  })
);
