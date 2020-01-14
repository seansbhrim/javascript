const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const aws = require('aws-sdk');

//Config
const app = express();
const router = express.Router();
dotenv.config();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const s3 = new aws.S3({
    accessKeyId: process.env.S3_ID,
    secretAccessKey: process.env.S3_KEY
});

//Put json file to s3
app.post('/upload-json', async (req, res) => {
    console.log(req.body);

    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: 'test/upload_test.json',
        Body: JSON.stringify(req.body),
        ContentType: 'application/json'
    };

    s3.putObject(params, (err, data) => {
        if(err){
            throw err
        }else{
            console.log('File successfully uploaded!')
        }
    })

    res.send('Upload success.');
    
});

//Router
app.use('/', router.get('/', (req, res) => res.render('index')));

//Port
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));

