const jwt = require ('jsonwebtoken');

const secret = "millavesecreta";

const payload={
    nombre: 'alejo',
    id: 123456,
    perfil: 'administrador'
}

const token = jwt.sign(payload, secret, { expiresIn: '1m'});
console.log(token);

// decodificar token
const decoded = jwt.verify(token, secret);
console.log(decoded);