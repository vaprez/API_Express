const db = require('../../config/database.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authenticateUser = async (email, password) => {
    const [rows] = await db.query('SELECT * FROM user WHERE mail = ?' , [email]); 
    if(rows.length > 0){
        if(bcrypt.compare(password, rows[0].mdp)){
            return genToken(rows[0].mail, rows[0].role);
        }
    } else {
     
        throw new Error('Identifiants incorrects');
    }
};

const registerUser = async (email, password, name, firstname) => {
    try{
        await db.query('INSERT INTO user(mail, mdp, nom, prenom, role) VALUES(?, ?, ?, ?, "visiteur")', [email, password, name, firstname]); 
        return genToken(email, "visiteur");
    } catch (err) {
        console.error(err);
        throw new Error('erreur durant l inscription');
    }
};

function genToken(name, role){
    const token = jwt.sign(
        { 
            name: name,
            role: role
        },

        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
    return token;
}

function verifyToken(token){
    
    try {
        if (!token) {
            throw new Error('Token invalide: Token is missing');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (err) {
        console.error(err);
        throw new Error('Token invalide');
    }
}

async function userExist(email){
    const [rows] = await db.query('SELECT * FROM user WHERE mail = ?' , [email]); 
    return rows.length > 0;
}

async function isTokenBlacklisted(token){
    const [rows] = await db.query('SELECT * FROM liste_noire WHERE valeur = ?', [token]);
    console.log(rows, "cc")
    const a = rows.length > 0;
    console.log(a, "zz")
    return a;
}

async function invalidateToken(token){
    try {
        //test si le token est belle est bien valide
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded, "iii");
        const currentdate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        db.query('INSERT INTO liste_noire(valeur, date) VALUES(?, "")', [token, currentdate]);
        return decoded;
    } catch (err) {
        console.error(err);
        throw new Error('Token invalide');
    }

}

module.exports = {
    authenticateUser,
    registerUser,
    userExist,
    verifyToken,
    isTokenBlacklisted,
    invalidateToken
};