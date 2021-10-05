import { relationship, text , select , password, checkbox , timestamp} from '@keystone-next/keystone/fields';

export const Rating = {
    fields: {
        comment: text({
            isRequired: true
        }),
        timestamp: timestamp({
            isRequired: true
        }),
    }
}