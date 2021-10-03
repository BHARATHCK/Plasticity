import { relationship, text , select , password, checkbox } from '@keystone-next/keystone/fields';

export const User = {
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
            isFilterable: true
         }),
        isEducator: checkbox({
            defaultValue: false

        }),
        isSubscribed: select({
            dataType: 'string',
            options: [
                { value: 'true', label: 'true' },
                { value: 'false', label: 'false' },
            ],
            defaultValue: 'false',
            ui: { displayMode: 'segmented-control' }
        }),
        subscription: relationship({
            ref: 'Subscription.user'
        })
    }
}