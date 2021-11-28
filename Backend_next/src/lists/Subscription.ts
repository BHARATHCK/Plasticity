import { list } from '@keystone-next/keystone';
import { relationship, text , select , password, checkbox , integer} from '@keystone-next/keystone/fields';

export const Subscription = list({
    ui: {
        isHidden: true
    },
    access: {
        operation: {
            query: ({ session, context, listKey, operation }) => {
                let accessValue = false;
                if(!session.data.isEducator ){
                    accessValue = true;
                }
                return accessValue;
            },
            create: ({ session, context, listKey, operation ,  }) => {
                return true;
            },
            update: ({ session, context, listKey, operation ,  }) => {
                
                let accessValue = false;
                if(!session.data.isEducator ){
                    accessValue = true;
                }
                return accessValue;
            },
            delete: ({ session, context, listKey, operation ,  }) => {
                
                let accessValue = false;
                if(!session.data.isEducator ){
                    accessValue = true;
                }
                return accessValue;
            },
          }
    },
    fields: {
        price: integer({
            isRequired: true
        }),
        plan: text({
            isRequired: false
        }),
        chargeId: text({
            isRequired: true
        }),
        user: relationship({
            ref: "User.subscription",
        })
    }
})