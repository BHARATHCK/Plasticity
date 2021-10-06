import { list } from '@keystone-next/keystone';
import { relationship, text , select , password, checkbox } from '@keystone-next/keystone/fields';

export const User = list({
    ui: {
        itemView: {
            defaultFieldMode: ({session , item}) => {
                console.log({session , item})
                if(session.data.isAdmin || session.itemId === item.id){
                    return 'edit';
                } else {
                    return 'hidden';
                }
                
            }
          },
    },
    access: {
        operation: {
            query: ({ session, context, listKey, operation }) => {
                return true;
            },
            create: ({ session, context, listKey, operation ,  }) => {
                console.log("create user : ", session);
                let accessValue = false;
                if(!session || session?.data?.isAdmin){
                    console.log('returning true')
                    accessValue = true;
                }
                return accessValue;
            },
            update: ({ session, context, listKey, operation ,  }) => {
                
                let accessValue = false;
                if(session.data.isAdmin){
                    accessValue = true;
                }
                return accessValue;
            },
            delete: ({ session, context, listKey, operation ,  }) => {
                
                let accessValue = false;
                if(session.data.isAdmin){
                    accessValue = true;
                }
                return accessValue;
            },
          }
    },
    fields: {
        name: text({
            isRequired: true
        }),
        password: password({
            isRequired: true
        }),
        email: text({ 
            isRequired: true,
            isIndexed: "unique",
            isFilterable: true,
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
            },
         }),
        isEducator: checkbox({
            defaultValue: false,
            ui: {
                itemView: {
                    fieldMode: ({item , session}) => {
                        return 'hidden';
                    }
                  },
            },
        }),
        isAdmin: checkbox({
            defaultValue: false,
            ui: {
                itemView: {
                    fieldMode: ({item , session}) => {
                        return 'hidden';
                    }
                  },
            },
        }),
        isSubscribed: select({
            dataType: 'string',
            options: [
                { value: 'true', label: 'true' },
                { value: 'false', label: 'false' },
            ],
            defaultValue: 'false',
            ui: { 
                displayMode: 'segmented-control',
                itemView: {
                    fieldMode: ({item , session}) => {
                        if(session.data.isAdmin){
                            return 'edit';
                        } else {
                            return 'hidden';
                        }
                    }
                  },
            }
        }),
        subscription: relationship({
            ref: 'Subscription.user',
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
            },
        }),
        comment: relationship({
            ref: 'Comment.user',
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
            },
            many: true
        }),
        rating:relationship({
            ref: 'Course',
            many: true,
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
            },
        }),
        coursestaken: relationship({
            ref: 'Course',
            many: true,
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
            },
        })
    }
})