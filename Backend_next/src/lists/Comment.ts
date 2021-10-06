import { list } from '@keystone-next/keystone';
import { relationship, text , select , password, checkbox , timestamp} from '@keystone-next/keystone/fields';

export const Comment = list({
    ui: {
        hideCreate: true,
        hideDelete: true,
        isHidden: true
    },
    fields: {
        comment: text({
            isRequired: true
        }),
        timestamp: timestamp({
            isRequired: true
        }),
        course: relationship({ 
            ref: "Course.comment",
            isFilterable: true
         }),
        user: relationship({
            ref: 'User.comment',
            many: true
        })
    }
})