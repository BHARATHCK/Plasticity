import { list } from '@keystone-next/keystone';
import { relationship, text , select , password, checkbox , timestamp} from '@keystone-next/keystone/fields';

export const Rating = list({
    ui: {
        isHidden: true,
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
                
                let accessValue = false;
                if(!session.data.isEducator ){
                    accessValue = true;
                }
                return accessValue;
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
        comment: text({
            isRequired: true
        }),
        timestamp: timestamp({
            isRequired: true
        }),
    }
})