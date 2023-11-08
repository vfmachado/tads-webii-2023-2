// if (process.env.NODE_ENV == 'prod') {
//     console.log = () => {};
// }

const express = require('express');
const { userValidationSchema } = require('./validators/user-validator');

const app = express();

const morgan = require('morgan');
const {formidable} = require('formidable');
const { uploadFile, createPresignedUrlWithClient } = require('./s3/S3Client');

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.urlencoded());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ msg: 'Hello World' });
});

app.post('/imagem', (req, res) => {
    // with formidable
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        console.log({
            fields,
            files,
        })
        const locations = [];
        for (const file of files['my-image']) {
            const location = await uploadFile(file);
            locations.push(location);
        }
        res.json({ locations, fields, files });
    });
});

app.get('/imagem', async (req, res) => {
    const result = await createPresignedUrlWithClient({
        bucket: 'webii-2023-2',
        key: '95588c58b527c341001a90f00',
    });
    res.json({ result });
});



// CUSTOM VALIDATOR
// NESTED VALIDATION (validacao de um objeto do objeto)

// espero os dados do usuario
// nome > 3
// email
// senha
app.post('/', async (req, res) => {
    console.log(new Date() + ' - POST NA ROTA /');
    const user = req.body;
    console.log('DADOS RECEBIDOS: ', user);

    const { value, error } = userValidationSchema.validate(user);
    if (error) {
        console.error('ERRO DE VALIDACAO: ', error.message)
        return res.status(400).json({
            msg: error.message,
            dados: {
                error
            }
        });
    
    }
    res.json({
        msg: "DEU TUDO CERTO OU NAO",
        dados: {
            value
        }
    });
});

app.listen(3000);