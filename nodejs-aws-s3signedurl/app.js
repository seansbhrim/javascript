const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const aws = require('aws-sdk');

//Config
const app = express();
dotenv.config();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Get signed url
app.get('/get-signed-url', async (req, res) => {
    aws.config.update({
        accessKeyId: process.env.S3_ID,
        secretAccessKey: process.env.S3_KEY,
        region: process.env.S3_REGION,
        signatureVersion: 'v4'
    });

    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: 'test/upload_test.mp4',
        Expires: 30 * 60, //30 min
        ContentType: 'video/mp4'
    };

    const options = {
        signatureVersion: 'v4',
        region: process.env.S3_REGION,
        endpoint: new aws.Endpoint(process.env.S3_BUCKET + '.s3-accelerate.amazonaws.com'), 
        useAccelerateEndpoint: true
    };

    const client = new aws.S3(options);

    const signedURL = await (new Promise((resolve, reject) => {
        client.getSignedUrl('putObject', params, (err, data) => {
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        });
    }));

    return res.json({
        signedURL
    });
});

//Routes
app.use('/', require('./routes/index'));


//Port
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));

