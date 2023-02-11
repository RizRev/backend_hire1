const Pool = require("./../config/db");
const createUsers = (data) => {
    const { users_id, user_name, password, email, shop, otp } = data;
    return new Promise((resolve, reject) => {
      Pool.query(
        `INSERT INTO users(user_id,user_name,password,email,shop,auth,otp) VALUES('${users_id}','${user_name}','${password}','${email}','${shop}',0,${otp})`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      );
    });
  };
  const findEmail = (email) => {
    return new Promise((resolve, reject) =>
      Pool.query(`SELECT * FROM users where email='${email}'`, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      })
    );
  };

  const findUser = (id) => {
    return new Promise((resolve, reject) =>
      Pool.query(`SELECT * FROM users where user_id='${id}'`, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      })
    );
  };
  const verification = (email) =>{
    return new Promise((resolve, reject) =>
      Pool.query(`UPDATE users SET auth=1 where email='${email}'`, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      })
    );
  }

  module.exports =  {createUsers,findEmail,verification,findUser}