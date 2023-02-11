const Pool = require("./../config/db");

const insertData = (data) => {
    const {name,stock,price,price_sold,photo,user_id} = data;
    return Pool.query(`INSERT INTO product(product_name,stock,price,price_sold,photo,user_id) VALUES('${name}',${stock},${price},${price_sold},'${photo}','${user_id}')`);
}
const deleteData = id => {
    return Pool.query(`DELETE FROM product where product_id='${id}'`);
}
const productSearch = (search) => {
    return Pool.query(`SELECT * FROM product WHERE name ILIKE '%${search}%'`);
}
const selectData = (page,limit,search) => {
    return Pool.query(`SELECT product.product_id,product.product_name,product.stock,product.price,product.price_sold,product.photo,users.shop as toko FROM product INNER JOIN users ON product.user_id = users.user_id WHERE product.product_name ILIKE '%${search}%' limit ${limit} offset ${(page-1)*limit}`);
}
const selectDatabyId = (id) => {
    return Pool.query(`SELECT product_id,product_name,stock,price,price_sold,photo FROM product WHERE product_id=${id}`);
}
const updateData = (id,data) => {
    const {name,stock,price,price_sold,photo} = data;
    return Pool.query(`UPDATE product SET product_name='${name}',stock='${stock}',price='${price}',price_sold='${price_sold}',photo='${photo}' WHERE product_id='${id}'`);
}
const findProduct = (name) => {
    return new Promise((resolve, reject) =>
      Pool.query(`SELECT * FROM product where product_name='${name}'`, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      })
    );
  };

module.exports = {insertData,deleteData,productSearch,selectData,selectDatabyId,updateData,findProduct};