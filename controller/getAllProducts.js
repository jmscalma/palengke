const env = require('../config/db.config')
const mysql = require('mysql')

const pool = mysql.createPool({
    host: env.host,
    port: env.port,
    user: env.user,
    database: env.db
});

exports.getAllProducts = (req, res) => {

    pool.getConnection((err, connection) => {
        
        if(err){
            console.log("Connection Error")
            res.status(500).json({error: 'Connection error'});
            return
        }
        else{
            connection.release();
            connection.query(`call get_all_products()`, (error, results) => {
                if(error){
                    console.log("error")
                    res.status(500).json({error: 'error occured'});
                }
                else{
                    const products = results[0];
                    res.json(products);
                }
            } 
        )} 

    });

}

exports.getSpecificProduct = (req, res) => {

    const product_id = req.params.product_id;

    pool.getConnection((err, connection) => {
        if(err){
            res.status(500).json({error: "error"});
            return
        }
        else{
            connection.release()
            connection.query(`call get_specific_product(${product_id})`, (error, results) => {
                if(error){
                    res.status(500).json({error: "error"});
                }else{
                    const product = results[0];
                    res.json(product)
                }
            })
        }
    })
}