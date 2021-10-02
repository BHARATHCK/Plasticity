const { Text, Relationship, File, Url } = require('@keystonejs/fields')
const { S3Adapter } = require('@keystonejs/file-adapters');
const dotenv = require("dotenv").config();

const fileAdapter = new S3Adapter({
    bucket: process.env.S3_BUCKET_NAME,
    publicUrl: ({ id, filename, _meta }) =>
        `http://plasticityv1.s3-website.ap-south-1.amazonaws.com/${filename}`,
    s3Options: {
        // Optional paramaters to be supplied directly to AWS.S3 constructor
        apiVersion: '2006-03-01',
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET,
        region: process.env.S3_REGION,
    },
    uploadParams: ({ filename, id, mimetype, encoding }) => ({
        Metadata: {
            keystone_id: `${id}`,
        },
    }),
});


const CourseVideo = {
    fields: {
        video: { type: File, adapter: fileAdapter, label: 'Source', collapse: true, autoCleanup: true, isRequired: true },
        thumbnail: { type: Url, isRequired: true },
        Course: { type: Relationship, ref: 'Course.Videos', isRequired: true },
        description: { type: Text, isRequired: true },
    }
}

module.exports = CourseVideo;