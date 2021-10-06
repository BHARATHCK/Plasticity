import 'dotenv/config';
import { relationship, text , file} from '@keystone-next/keystone/fields';
import AWS from 'aws-sdk';
import {readFile} from 'fs';
import { list } from '@keystone-next/keystone';


const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET
  })

export const CourseVideo = list({
  ui: {
    isHidden: true
  },
  access: {
    operation: {
        query: () => {
            return true;
        },
        create: ({ session, context, listKey, operation ,  }) => {
            
            let accessValue = false;
            if(session.data.isEducator){
                accessValue = true;
            }
            return accessValue;
        }
      },
      item : {
        update: async ({context, listKey , operation , originalInput , item , session}) => {
            let accessValue = false;
            console.log("originalInput " ,originalInput)
            console.log("item " ,item)
            console.log("session " ,session)
            if(item.authorId === session.itemId){
                accessValue = true;
            }
            return accessValue;
        },
        delete: async ({context, listKey , operation , item , session}) => {
            let accessValue = false;
            if(item.authorId === session.itemId){
                accessValue = true;
            }
            return accessValue;
        }
      }
},
    fields: {
        video: file({
            isRequired: true,
            hooks: {
                validateInput: async ({
                    resolvedData,
                  }) => { 
                      console.log("Resolved Data : ",resolvedData.video.filename);
                      readFile(process.env.BASE_URL_LOCAL+"\\"+resolvedData.video.filename , (err, data) => {

                        if(err) {
                            console.log(err);
                        }
                        console.log("NO ERROR - Probably read the file");
                        const params = {
                            Bucket: process.env.S3_BUCKET_NAME || "",
                            Key: resolvedData.video.filename.substring(0, resolvedData.video.filename.indexOf('mp4')+3),
                            Body: data
                          }

                          s3.upload(params, (err: any, data: any) => {
                            if (err) {
                              console.log(err)
                            }
                            console.log(data.Location)
                          })
                      })
                      
                  },
            }
        }),
        thumbnail: text({isRequired: true}),
        Course: relationship({ref: "Course.Videos" }), 
        description: text({isRequired: true}) 
    }
})