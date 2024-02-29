const db = require('../../config/database.js');

const addCategorie = async(designation) => {
    try {
        const [rows] = await db.query('SELECT * FROM categorie WHERE designation = ?', [designation]);
        if (rows.length === 0){
            db.query('INSERT INTO categorie(designation) VALUES(?)', [designation]);
            // console.log('Categorie added', designation);
            return designation;
            // return response.json({message: 'Categorie ajoutée'});
        }
        else{
            throw new Error('Categorie existante');
        }
    } catch (err) {
        console.error(err);
        throw new Error('Error adding categorie');
    }
}

const getCategorie = async()=> {
    try {
        const [rows] = await db.query('SELECT * FROM categorie');
        return rows;
    } catch (err) {
        console.error(err);
        throw new Error('Error getting categorie');
    }
}

const getCategorieById = async(id) => {
    try {
        const [rows] = await db.query('SELECT * FROM categorie WHERE id_categorie = ?', [id]);
        return rows;
    } catch (err) {
        console.error(err);
        throw new Error('Error getting categorie');
    }

}

const updateCategorie = async(id,designation) => {
    try {
        db.query('UPDATE categorie SET designation = ? WHERE id_categorie = ?', [designation,id]);
        console.log('Categorie updated' , id);
        return id,designation;
    } catch (err) {
        console.error(err);
        throw new Error('Error updating categorie');
    }
}

const deleteCategorie = async(id) => {
    try {
        db.query('DELETE FROM categorie WHERE id_categorie = ?', [id]);
        console.log('Categorie deleted');
        return id
    } catch (err) {
        console.error(err);
        throw new Error('Error deleting categorie');
    }

}

module.exports = {
    addCategorie,
    getCategorie,
    getCategorieById,
    updateCategorie,
    deleteCategorie
}