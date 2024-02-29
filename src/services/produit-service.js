const db = require('../../config/database.js');

const addProduit = async(designation,prix,categorie) => {
  try {
    const categorieExist = await db.query('SELECT * FROM categorie WHERE id_categorie = ?', [categorie]);
    if (categorieExist[0].length>0){
        date = new Date();
        db.query('INSERT INTO produits(designation, prix, categorie,date_in,date_up) VALUES(?, ?, ?, ?,?)', [designation, prix, categorie,date,date]);
        console.log('Produit added', designation);
        return {designation};
    }
    else{
        throw new Error('Categorie inexistante');
        return 
    }
  } catch (err) {
    console.error(err);
    throw new Error('Error adding produit');
  }
}

const getProduit = async() => {
  try {
    const [rows] = await db.query('SELECT * FROM produits');
    return rows;
  } catch (err) {
    console.error(err);
    throw new Error('Error getting produit');
  }
}

const getProduitById = async(id) => {
  try {
    const [rows] = await db.query('SELECT * FROM produits WHERE id_produit = ?', [id]);
    console.log('Produit found', rows);
    return rows;
  } catch (err) {
    console.error(err);
    throw new Error('Error getting produit');
  }
}

const updateProduit = async(id,designation,prix,categorie) => {
  try {
        date = new Date();
        const [rows] = await db.query('UPDATE produits SET designation = ?, prix = ?, categorie = ?,date_up = ? WHERE id_produit = ?', [designation, prix, categorie,date,id]);
        console.log('Produit updated');
        return rows ;
  } catch (err) {
    console.error(err);
    throw new Error('Error updating produit');
  }
}

const deleteProduit = async(id) => {
  try {
    db.query('DELETE FROM produits WHERE id_produit = ?', [id]);
    console.log('Produit deleted');
    return id;
  } catch (err) {
    console.error(err);
    throw new Error('Error deleting produit');
  }
}

module.exports = {
  addProduit,
  getProduit,
  getProduitById,
  updateProduit,
  deleteProduit
}