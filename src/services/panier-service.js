const db = require('../../config/database.js');
const jwt = require('jsonwebtoken');

const addPanier = async(token,id_produit,designation,prix,quantite) => {
  try {
    console.log("le token", token)
    mail_user = jwt.verify(token, process.env.JWT_SECRET).name;
    console.log("service",mail_user);
    console.log(quantite);
    const [rows] = await db.query('SELECT * FROM panier WHERE mail_user = ? AND id_produit = ?', [mail_user,id_produit]);
    if (rows.length === 0){
        if(quantite === undefined){
            quantite = parseInt(1);
        }
        db.query('INSERT INTO panier(mail_user, id_produit, designation, prix, quantite) VALUES(?, ?, ?, ?, ?)', [mail_user,id_produit,designation,prix,quantite]);
        console.log('Produit added', id_produit);
        return id_produit;
    }
    else{
        if(quantite === undefined){
            quantite = parseInt(1) + parseInt(rows[0].quantite);
        }
        else{
           quantite = parseInt(quantite) + parseInt(rows[0].quantite);
           console.log(quantite);
        }
        db.query('UPDATE panier SET quantite = ? WHERE mail_user = ? AND id_produit = ?', [quantite,mail_user,id_produit]);
        console.log('Produit updated');
        return id_produit;
    }
  } catch (err) {
    console.error(err);
    throw new Error('Error adding produit');
  }
}

const getPanier = async(token) => {
  try {
    mail_user = jwt.verify(token, process.env.JWT_SECRET).name;
    const [rows] = await db.query('SELECT * FROM panier WHERE mail_user = ?', [mail_user]);
    return rows;
  } catch (err) {
    console.error(err);
    throw new Error('Error getting produit');
  }
}

 const deletePanier = async(token,id_produit) => {
    try {
       console.log("le token", token)
        mail_user = jwt.verify(token, process.env.JWT_SECRET).name;
        console.log("service",mail_user);
        db.query('DELETE FROM panier WHERE mail_user = ? AND id_produit = ?', [mail_user,id_produit]);
        console.log('Produit deleted');
        return id_produit;
    } catch (err) {
        console.error(err);
        throw new Error('Error deleting produit');
    }
}

const deleteAllPanier = async(token) => {
    try {
       console.log("le token", token)
        mail_user = jwt.verify(token, process.env.JWT_SECRET).name;
        db.query('DELETE FROM panier WHERE mail_user = ?', [mail_user]);
        console.log('Panier deleted');
        return mail_user;
    } catch (err) {
        console.error(err);
        throw new Error('Error deleting panier');
    }
}

module.exports = {
    addPanier,
    getPanier,
    deletePanier,
    deleteAllPanier
};

