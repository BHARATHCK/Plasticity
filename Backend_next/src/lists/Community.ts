import { list } from '@keystone-next/keystone';
import { relationship, text , select, integer, timestamp} from '@keystone-next/keystone/fields';

export const Community = list({
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
        whatsapp: text({isRequired: true}),
        discord: text({isRequired: true}),
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
        Course: relationship({
            ref: 'Course.Community',
            many: true,
        }),
        thumbnail: text({
            isRequired: true,
            ui: {
                displayMode: 'input'
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

                if(originalInput.author.connect.id === session.data.id){
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
                if(item.authorId === session.itemId){
                    accessValue = true;
                }
                return accessValue;
            }
          }
    }
})