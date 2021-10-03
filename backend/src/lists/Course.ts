const { Text, Select, Relationship, Url } = require('@keystonejs/fields')

const courseFields = {
    fields: {
        title: {
            type: Text,
            isRequired: true
        },
        description: {
            type: Text,
            isRequired: true
        },
        status: {
            type: Select,
            dataType: 'enum',
            options: [
                { value: 'DRAFT', label: 'Draft' },
                { value: 'AVAILABLE', label: 'Available' },
                { value: 'UNAVAILABLE', label: 'Unavailable' }
            ],
            defaultValue: 'DRAFT',
            ui: { displayMode: 'segmented-control' }
        },
        category: {
            type: Select,
            options: [
                { value: 'TESTPREPARATION', label: 'Test Preparation' },
                { value: 'LANGUAGE', label: 'Language' },
                { value: 'PROGRAMMING', label: 'Programming' },
                { value: 'JOBPREPARATION', label: 'Job Preparation' },
                { value: 'CBSE', label: 'Cbse' },
                { value: 'ENGINEERINGCURICCULUM', label: 'Engineering Curicculum' },
                { value: 'LIFELONGLEARNING', label: 'Lifelong Learning' },
            ]
        },
        author: {
            type: Relationship,
            ref: 'User',
            many: false,
            isRequired: true
        },
        Videos: {
            type: Relationship,
            ref: 'CourseVideo.Course',
            many: true,
            isRequired: true
        },
        thumbnail: {
            type: Url,
            isRequired: true
        }
    }
}

module.exports = courseFields;