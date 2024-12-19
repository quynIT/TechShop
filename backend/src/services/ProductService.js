const Product = require("../models/ProductModel")

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description } = newProduct
        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            //Kiểm tra tên sản phẩm đã tồn tại rồi
            if(checkProduct !== null){
                resolve({
                    status: 'OK',
                    message: 'The name of product is already'
                })
            }
            const newProduct = await Product.create({
                name, 
                image, 
                type, 
                price, 
                countInStock, 
                rating, 
                description
            })
            if(newProduct){
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newProduct
                })
            }
        }catch(e) {
            reject(e)
        }
    })
}

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })

            //Kiểm tra id sản phẩm không tồn tại
            if(checkProduct === null){
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }
            
            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedProduct
            })
        }catch(e) {
            reject(e)
        }
    })
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })

            //Kiểm tra sản phẩm không tồn tại
            if(checkProduct === null){
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }
            
            await Product.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete product success'
            })
        }catch(e) {
            reject(e)
        }
    })
}

const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })

            //Kiểm tra sản phẩm không tồn tại
            if(product === null){
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }
            
            resolve({
                status: 'OK',
                message: 'Success',
                data: product
            })
        }catch(e) {
            reject(e)
        }
    })
}

const getAllProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allProduct = await Product.find()
            resolve({
                status: 'OK',
                message: 'Success',
                data: allProduct
            })
        }catch(e) {
            reject(e)
        }
    })
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct
}