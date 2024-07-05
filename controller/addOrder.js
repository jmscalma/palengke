const env = require('../config/db.config')
const mysql = require('mysql')

const pool = mysql.createPool({
    host: env.host,
    port: env.port,
    user: env.user,
    database: env.db
});


const handler = (event, callback) => {

    const product_id = event.body.product_id;
    const customer_name = event.body.customer_name;
    const email = event.body.email;
    const number = event.body.number;
    const quantity = event.body.quantity;
    const total_price  = event.body.total_price;

    const addOrderQuery = `call add_order('${product_id}', '${customer_name}', '${email}', '${number}', '${quantity}', '${total_price}');`;

    pool.getConnection((err, connection) => {
      
        if(err){
            callback.status(400).send({message: "error"})
            return
        }

        connection.query(addOrderQuery, (error, results, fields) => {
            if(error){
                console.log("something went wrong")
                callback.status(400).send({message: "something error"})
                console.log(error)
            }

            else{
                callback.status(200).send({message: "successfully added"})
            }
        })

    })

}

module.exports = handler