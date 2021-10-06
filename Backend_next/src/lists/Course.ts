import { list } from '@keystone-next/keystone';
import { relationship, text , select, integer} from '@keystone-next/keystone/fields';

export const Course = list({
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
        }),
        Videos: relationship({
            ref: 'CourseVideo.Course',
            many: true,
        }),
        thumbnail: text({
            isRequired: true,
            ui: {
                displayMode: 'input'
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
        })

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
    }
})