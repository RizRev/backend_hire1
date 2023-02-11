const ModelProduct = require("../model/products");
const { response } = require("../middleware/common");
require("dotenv").config();

const ProductController = {
    getProduct: (req,res,next)=>{ 
        // const users_id = req.payload.id
        const page = req.query.page || 1
        const limit = req.query.limit || 5
        const search = req.query.search || ''
        console.log(req.query)
        ModelProduct.selectData(page,limit,search)
        .then((result) => response(res, 200, true, result.rows,"get data success"))
        .catch((err) => response(res, 404, false, err.routine,"get data fail"));
    },
    delete: (req,res,next)=>{
        ModelProduct.deleteData(req.params.id)
        .then((result) => response(res, 200, true, result.rows,"delete data success"))
        .catch((err) => response(res, 404, false, err.routine,"delete data fail"));
    },
    // getProduct: (req,res,next)=>{ 
    //     const sortby = req.query.sortby || 'id'
    //     const sort = req.query.sort || 'asc'
    //     const page = req.query.page || 1
    //     const limit = req.query.limit || 5
    //     ModelProduct.selectData(sortby,sort,page,limit)
    //     .then((result) => response(res, true, 200, result.rows,"get data success"))
    //     .catch((err) => response(res, false, 404, err,"get data fail"));
    // },
    // getProduct: (req,res,next)=>{ 
    //     const users_id = req.payload.id
    //     const sortby = req.query.sortby || 'id'
    //     const sort = req.query.sort || 'asc'
    //     const page = req.query.page || 1
    //     const limit = req.query.limit || 5
    //     const search = req.query.search || ''
    //     console.log(req.query)
    //     ModelProduct.selectData(sortby,sort,page,limit,search
    //         // ,users_id
    //         )
    //     .then((result) => response(res, 200, true, result.rows,"get data success"))
    //     .catch((err) => response(res, 404, false, err.routine,"get data fail"));
    // },
    insert: async (req,res,next)=>{
        let {
            rows: [product],
          } = await ModelProduct.findProduct(req.body.name);
          if (product) {
            return response(res, 404, false, "name product already use", "input product fail");
          }
        const user_id = req.payload.id
        const {
            photo: [photo],
          } = req.files;
          req.body.photo = photo.path;
        const {name,price_sold,stock,price,} = req.body
        data = {
            user_id,
            photo: photo.path,
            name,
            price_sold,
            stock,
            price
        }
        ModelProduct.insertData(data)
        .then((result) => response(res, 200, true, data,"insert data success"))
        .catch((err) => response(res, 404, false, err,"insert data fail"));
    },
    getProductDetail: (req,res,next)=>{ 
        ModelProduct.selectDatabyId(req.params.id)
        .then((result) => {
        // client.setEx(`product/${req.params.id}`,60*60,JSON.stringify(result.rows))
        response(res, 200, true, result.rows,"get data detail success")})
        .catch((err) => response(res, 404, false, err.routine,"get data detail fail"));
    },
    update: (req,res,next)=>{
        const id = req.params.id;
        const {
            photo: [photo],
          } = req.files;
          req.body.photo = photo;
          const {name,price_sold,stock,price,} = req.body
          data = {
            //   id,
              photo: photo.path,
              name,
              price_sold,
              stock,
              price
          }
        ModelProduct.updateData(id,data)
        .then((result) => response(res, 200, true, result.rows,"update data success"))
        .catch(err=> res.send({message:'error',err}))
    }
    // getProductAll: (req,res,next)=>{ 
    //     const users_id = req.payload.id
    //     const sortby = req.query.sortby || 'id'
    //     const sort = req.query.sort || 'asc'
    //     const page = req.query.page || 1
    //     const limit = req.query.limit || 5
    //     const search = req.query.search || ''
    //     console.log(req.query)
    //     const data = {sortby,sort,page,limit,search}
    //     console.log(id)
    //     ModelProduct.selectDataSeller(users_id)
    //     .then((result) => response(res, 200, true, result.rows,"get data success"))
    //     .catch((err) => response(res, 404, false, err,"get data fail"));
    // }
}

    exports.ProductController = ProductController