const { Text, Select, Checkbox, Relationship, Password } = require('@keystonejs/fields')

const userFields = {
    fields: {
        name: {
            type: Text,
            isRequired: true
        },
        password: {
            type: Password,
            isRequired: true
        },
        email: {
            type: Text,
            isRequired: true
        },
        isAdmin: {
            type: Checkbox,
            isRequired: false
        }
    }
}


module.exports = userFields;