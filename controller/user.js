const User = require('../models/user')

// let users = [
//     { id: 1, nama: "Darrel", email: "Darrel@gmail.com" },
//     { id: 2, nama: "Kukuh", email: "Kukuh@gmail.com" }
// ]

module.exports = {
    index: async (req, res) => {
        try{
            const users = await User.find()
            if (users.length > 0) {
            res.status(200).json({
                status: true,
                data: users,
                method: req.method,
                url: req.url
                })
            }   
            else {
                res.json({
                    status: false,
                    message: "Data masih kosong"
                })
            }
        }
        catch(error){
            res.status(400).json({success: false})
        }
    },
    store: async (req, res) => {
        try {
            const user = await User.create(req.body)
            res.status(200).json({
                status: true,
                data: user,
                method: req.method,
                url: req.url,
                message: "Data berhasil ditambahkan!"
            })
        } 
        catch (error) {
            res.status(400).json({success: false})
        }
    },
    update: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            })
            res.status(200).json({
                status: true,
                data: user,
                method: req.method,
                url: req.url,
                message: "Data berhasil diubah!"
            })
        } 
        catch (error) {
            res.status(400).json({success: false})
        }
        const id = req.params.id
    },
    delete: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json({
                status: true,
                method: req.method,
                url: req.url,
                message: "Data berhasil dihapus!"
            })
        } 
        catch (error) {
            res.status(400).json({success: false})
        }
    }
};