import { relationship, text , select , password, checkbox , integer} from '@keystone-next/keystone/fields';

export const Subscription = {
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
}