import bcrypt from 'bcryptjs';

const plaintextPassword = 'password';
const saltRounds = 10;

bcrypt.hash(plaintextPassword, saltRounds)
    .then(hash => {
        console.log('Hashed Password:', hash);
    })
    .catch(error => {
        console.error(error);
    });