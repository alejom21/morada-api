const { compare } = require('bcrypt');
const bcrypt = require('bcrypt');
const pass = "$2b$11$GHyJh3LZsv5hh0lFLK2vp.sS32aLcI4ZF2kraqtl/mzHhqtjjh9j6"

const main = async () => {
    const plainPassword = "hola";
    const match = compare(plainPassword, pass);

    if(match) {
        console.log('match');
    } else {
        console.log('no match');
    }
}
