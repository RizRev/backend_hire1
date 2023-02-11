const Modelusers = require("../model/users")
const {findEmail,createUsers,verification}=require("../model/users")
const { response } = require("../middleware/common");
const { v4: uuidv4 } = require("uuid");
const {generateToken} = require("../helpers/auth")
const bcrypt = require("bcryptjs");
const email = require("../middleware/email");
const Host = process.env.HOST;
const Port = process.env.PORT;

const usersController = {
    getusers: (req, res, next) => {
        Modelusers.getusers()
          .then((result) =>
            response(res, 200, true, result.rows, "get data success")
          )
          .catch((err) => response(res, 404, false, err, "get data fail"));
      },
      createUsers: async (req, res, next) => {
        let {
          rows: [users],
        } = await findEmail(req.body.email);
        if (users) {
          return response(res, 404, false, "email already use", "register fail");
        }
    
        let digits = "0123456789";
        let otp = "";
        for (let i = 0; i < 6; i++) {
          otp += digits[Math.floor(Math.random() * 10)];
        }
    
        let salt = bcrypt.genSaltSync(10);
        let password = bcrypt.hashSync(req.body.password);
        let password1 = req.body.password;
        let confirm = req.body.confirm;
    
        let data = {
          users_id: uuidv4(),
          email: req.body.email,
          password,
          user_name: req.body.name,
          shop: req.body.toko,
          confirm,
          otp,
        };
        if (password1 !== confirm)
          return response(res, 417, false, null, "password tidak sesuai");
        try {
          const result = await createUsers(data);
          if (result) {
            console.log(result);
            let sendEmail = await email(
              data.email,
              otp,
              `https://${Host}:${Port}/${email}/${otp}`,
              data.fullname
            );
            if (sendEmail == "email not sent!") {
              return response(res, 404, false, null, "register fail");
            }
            response(
              res,
              200,
              true,
              { email: data.email },
              "register success please check your email"
            );
          }
        } catch (err) {
          console.log(err);
          response(res, 404, false, err, "register fail");
        }
      },
      login: async (req,res,next)=>{
        console.log('email',req.body.email)
        console.log('password',req.body.password)
        let {rows:[users]} = await findEmail(req.body.email)
        if(!users){
            return response(res, 404, false, null," email not found")
        }
        const password = req.body.password
        const validation = bcrypt.compareSync(password,users.password)
        if(!validation){
            return response(res, 404, false, null,"wrong password")
        }
        delete users.password
        console.log(users.validation)
        if (users.auth == 0) {
            return response(res, 404, false, null, "account not verified");
          }
        delete users.password
        let payload = {
            id: users.user_id,
            name: users.name,
            email: users.email,
            shop: users.shop
        }
        users.token = generateToken(payload)
        response(res, 200, false, users,"login success")
},findUserdetail: (req, res, next) => {
  const id = req.payload.id
  Modelusers.findUser(id)
    .then((result) =>
      response(res, 200, true, result.rows, "get user detail success")
    )
    .catch((err) => response(res, 404, false, err, "get user detail fail"));
},verif: async (req, res) => {
  const { email, otp } = req.params;
  const {
    rows: [users],
  } = await Modelusers.findEmail(email);
  if (!users) {
    return response(res, 404, false, null, "email not found");
  }

  if (users.otp == otp) {
    await verification(email);
    return response(
      res,
      200,
      true,
      req.body.email,
      "verification account success"
    );
  }
  return response(res, 404, false, null, "wrong otp please check your email");
}}

exports.usersController = usersController;