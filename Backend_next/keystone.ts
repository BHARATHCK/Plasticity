import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone';
import { statelessSessions } from '@keystone-next/keystone/session';
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
import { Comment } from "./src/lists/Comment";
import { Course } from './src/lists/Course';
import { CourseVideo } from './src/lists/CourseVideo';
import { Subscription } from "./src/lists/Subscription";
import { Community } from './src/lists/Community';
import { User } from './src/lists/User';
import { extendGraphqlSchema } from "./src/mutations";
import { sendEmail } from "./src/utils/sendMail";

const databaseURL = process.env.DB_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';


const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  sessionData: 'id name email isEducator isSubscribed isAdmin',
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
        port: Number(process.env.PORT) || 3000,
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
          Subscription,
          Comment,
          Community
      }),
      extendGraphqlSchema,
      ui: {
          // Show the UI only for poeple who pass this test
          isAccessAllowed: ({ session }) =>{
            return session?.data.isEducator || session?.data.isAdmin ? true : false ;
          }
              
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
        secure: true,
        sameSite: "none",
      })
  })
);
