
const bcrypt = require('bcrypt');
const saltRounds = 10;

bcrypt.hash("123456", saltRounds, function(err, hash) {
    console.log({ hash });
});


const exec = async () => {
    const hash = await bcrypt.hash("1234", saltRounds);
    console.log({ hash });

    const isMatch = await bcrypt.compare("1234", hash);
    console.log({ isMatch });

    const isMatch2 = await bcrypt.compare("1234567", hash);
    console.log({ isMatch2 });
}

exec();