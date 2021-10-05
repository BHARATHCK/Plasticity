import { relationship, text , select, integer} from '@keystone-next/keystone/fields';

export const Course = {
    fields: {
        title: text({isRequired: true}),
        description: text({isRequired: true}),
        status: select ({
                dataType: 'enum',
                options: [
                    { value: 'DRAFT', label: 'Draft' },
                    { value: 'AVAILABLE', label: 'Available' },
                    { value: 'UNAVAILABLE', label: 'Unavailable' }
                ],
                defaultValue: 'DRAFT',
                ui: { displayMode: 'segmented-control' }
        }),
        category: select({
            options: [
                { value: 'TESTPREPARATION', label: 'Test Preparation' },
                { value: 'LANGUAGE', label: 'Language' },
                { value: 'PROGRAMMING', label: 'Programming' },
                { value: 'JOBPREPARATION', label: 'Job Preparation' },
                { value: 'CBSE', label: 'Cbse' },
                { value: 'ENGINEERINGCURICCULUM', label: 'Engineering Curicculum' },
                { value: 'LIFELONGLEARNING', label: 'Lifelong Learning' },
            ]
        }),
        author: relationship({
            ref: 'User',
            many: false,
        }),
        Videos: relationship({
            ref: 'CourseVideo.Course',
            many: true,
        }),
        thumbnail: text({
            isRequired: true,
            ui: {
                displayMode: 'input'
            }
        }),
        comment: relationship({
            ref: 'Comment.course',
            many: true,
            isFilterable: true,
            isOrderable: true
        }),
        rating: integer({ 
            isRequired: true,
            defaultValue: 0
        }),
        ratingCount: integer({
            defaultValue: 0
        })

    }
}