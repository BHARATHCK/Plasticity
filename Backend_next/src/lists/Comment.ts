import { relationship, text , select , password, checkbox , timestamp} from '@keystone-next/keystone/fields';

export const Comment = {
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
}