import { list } from '@keystone-next/keystone';
import { relationship, text , select, integer, timestamp, file} from '@keystone-next/keystone/fields';
import {readFile} from 'fs';
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET
  })

export const Course = list({
    ui: {
        itemView: {
            defaultFieldMode: ({session, item}) => {
                console.log("SESSION ******** : ", session)
                console.log("item ******** : ", item)
                if(session.data.id === item.authorId){
                    return "edit"
                }
                return "hidden"
            }
        }
    },
    fields: {
        title: text({isRequired: true}),
        description: text({isRequired: true}),
        status: select ({
                dataType: 'enum',
                options: [
                    { value: 'DRAFT', label: 'Draft' },
                    { value: 'AVAILABLE', label: 'Available' },
                    { value: 'UNAVAILABLE', label: 'Unavailable' }
                ],
                defaultValue: 'DRAFT',
                ui: { displayMode: 'segmented-control' }
        }),
        category: select({
            options: [
                { value: 'TESTPREPARATION', label: 'Test Preparation' },
                { value: 'LANGUAGE', label: 'Language' },
                { value: 'PROGRAMMING', label: 'Programming' },
                { value: 'JOBPREPARATION', label: 'Job Preparation' },
                { value: 'CBSE', label: 'Cbse' },
                { value: 'ENGINEERINGCURICCULUM', label: 'Engineering Curicculum' },
                { value: 'LIFELONGLEARNING', label: 'Lifelong Learning' },
            ]
        }),
        author: relationship({
            ref: 'User',
            many: false,
            ui: {
                hideCreate: true,
                inlineCreate: {
                    fields: [''],
                },
                listView: {
                    fieldMode: ({session}) => {
                        return "hidden"
                    },
                  }
            }
        }),
        Videos: relationship({
            ref: 'CourseVideo.Course',
            many: true,
        }),
        Community: relationship({ref: "Community.Course", many: false }), 
        thumbnail: file({
            isRequired: true,
            hooks: {
                validateInput: async ({
                    resolvedData,
                  }) => { 
                      console.log("Resolved Data : ",resolvedData);
                      readFile(process.env.BASE_URL_LOCAL+"\\"+resolvedData.thumbnail.filename , (err, data) => {

                        if(err) {
                            console.log(err);
                        }
                        console.log("NO ERROR - Probably read the file");
                        const params = {
                            Bucket: process.env.S3_BUCKET_NAME || "",
                            Key: resolvedData.thumbnail.filename.substring(0, resolvedData.thumbnail.filename.indexOf('png')+3),
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
        comment: relationship({
            ref: 'Comment.course',
            many: true,
            isFilterable: true,
            isOrderable: true,
            ui: {
                itemView: {
                    fieldMode: ({item , session}) => {
                        if(session.data.isAdmin){
                            return 'edit';
                        } else {
                            return 'hidden';
                        }
                    }
                  },
                  createView: {
                      fieldMode: ({session}) => {
                        if(session.data.isAdmin){
                            return 'edit';
                        } else {
                            return 'hidden';
                        }
                      }
                  }
            }
        }),
        rating: integer({ 
            isRequired: true,
            defaultValue: 0,
            ui: {
                itemView: {
                    fieldMode: ({item , session}) => {
                        if(session.data.isAdmin){
                            return 'edit';
                        } else {
                            return 'hidden';
                        }
                    }
                  },
                  createView: {
                      fieldMode: ({session}) => {
                        if(session.data.isAdmin){
                            return 'edit';
                        } else {
                            return 'hidden';
                        }
                      }
                  }
            }
        }),
        ratingCount: integer({
            defaultValue: 0,
            ui: {
                itemView: {
                    fieldMode: ({item , session}) => {
                        if(session.data.isAdmin){
                            return 'edit';
                        } else {
                            return 'hidden';
                        }
                    }
                  },
                  createView: {
                      fieldMode: ({session}) => {
                        if(session.data.isAdmin){
                            return 'edit';
                        } else {
                            return 'hidden';
                        }
                      }
                  }
            }
        }),
        watchedCount: integer({
            defaultValue: 0,
            isFilterable: true,
            isOrderable: true,
            isIndexed: true,
            ui: {
                itemView: {
                    fieldMode: ({item , session}) => {
                        if(session.data.isAdmin){
                            return 'edit';
                        } else {
                            return 'hidden';
                        }
                    }
                  },
                  createView: {
                      fieldMode: ({session}) => {
                        if(session.data.isAdmin){
                            return 'edit';
                        } else {
                            return 'hidden';
                        }
                      }
                  }
            }
        }),
    },
    access: {
        operation: {
            query: ({session, listKey}) => {
                console.log("SESSION ******** :",session);
                console.log("listKey ******** :",listKey);
                return true;
            }

          },
          item : {
              create: async ({context,listKey,operation,originalInput,session}) => {

                if(originalInput.author.connect.id === session.data.id || session.data.isAdmin){
                    return true
                }

                return false;
              },
            update: async ({context, listKey , operation , originalInput , item , session}) => {
                let accessValue = false;
                console.log("originalInput " ,originalInput)
                console.log("item " ,item)
                console.log("session " ,session)
                console.log("operation ** : ", operation);
                if(item.authorId === session.itemId || originalInput?.watchedCount){
                    accessValue = true;
                }
                return accessValue;
            },
            delete: async ({context, listKey , operation , item , session}) => {
                console.log("SESSION ******** :",session);
                console.log("listKey ******** :",listKey);
                console.log("item ******** :",item);
                let accessValue = false;
                if(item.authorId === session.itemId || session.data.isAdmin){
                    accessValue = true;
                }
                return accessValue;
            }
          }
    }
})