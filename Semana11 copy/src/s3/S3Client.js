let AWS_KEY = 'AWS_KEY';
let AWS_SECRET = 'AWS_SECRET';

const { S3Client, ListBucketsCommand, UploadPartCommand, PutObjectCommand, GetObjectCommand} = require('@aws-sdk/client-s3');
const fs = require('fs');
const {
    getSignedUrl, 
  } = require("@aws-sdk/s3-request-presigner");

// UPLOAD FILE TO S3
const uploadFile = async (file) => {
    console.log('CHAMEI A FUNCAO PARA FAZER O UPLOAD DO ARQUIVO')
    const s3 = new S3Client({ 
        region: "us-east-1",
        credentials: {
            accessKeyId: AWS_KEY,
            secretAccessKey: AWS_SECRET,
        },
     });
    
     const fileData = fs.readFileSync(file.filepath);

     const params = {
        Bucket: 'webii-2023-2',
        Key: file.newFilename,
        Body: fileData,
    };
    const command = new PutObjectCommand(params);

    const result = await s3.send(command);
    
    console.log({ result })
    return result;
}

// GET SIGNED URL
const createPresignedUrlWithClient = async ({ bucket, key }) => {
  const client = new S3Client({ region: 'us-east-1', credentials: {
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET,
}, });
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  return await getSignedUrl(client, command, { expiresIn: 3600 });
};


module.exports = { uploadFile, createPresignedUrlWithClient }


