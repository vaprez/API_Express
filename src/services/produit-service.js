const db = require('../../config/database.js');

const addProduit = async(designation,prix,categorie,image) => {
  try {
    const categorieExist = await db.query('SELECT * FROM categorie WHERE id_categorie = ?', [categorie]);
    if (categorieExist[0].length>0){
        date = new Date();
        db.query('INSERT INTO produits(designation, prix, categorie,image,date_in,date_up) VALUES(?, ?, ?, ?, ?,?)', [designation, prix, categorie,image,date,date]);
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
    console.log(rows);
    return rows;
  } catch (err) {
    console.error(err);
    throw new Error('Error getting produit');
  }
}

const getProduitByCategorie = async(id) => {
  try {
    const [rows] = await db.query('SELECT * FROM produits WHERE categorie = ?', [id]);
    console.log('Produit found', rows);
    return rows;
  } catch (err) {
    console.error(err);
    throw new Error('Error getting produit');
  }
}


const updateProduit = async(id,designation,prix,categorie,image) => {
  try {
        date = new Date();
        const [rows] = await db.query('UPDATE produits SET designation = ?, prix = ?, categorie = ?, image = ?,date_up = ? WHERE id_produit = ?', [designation, prix, categorie,image,date,id]);
        console.log('Produit updated');
        return rows ;
  } catch (err) {
    console.error(err);
    throw new Error('Error updating produit');
  }
}

const deleteProduit = async(id) => {
  try {
    const [rows] = await db.query('DELETE FROM produits WHERE id_produit = ?', [id]);
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
  deleteProduit,
  getProduitByCategorie
}