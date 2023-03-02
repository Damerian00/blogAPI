const db = require("../models/index");

const Blogs = db.Blog;
let date = new Date().toLocaleString()
const addBlog = async (req,res) => {
    try {
        let input_data ={
            title: req.body.title,
            message: req.body.message,
            date: date,
            author: req.body.author
        }
        let data = await Blogs.create(input_data)
        res.status(200).send(data);
    } catch (err) {
        res.status(400).send(err);
    }
}

const getBlogs = async (req,res) => {
    try {
        let data = await Blogs.findAll({})
        res.status(200).send(data);
    } catch (err) {
        res.status(400).send(err);       
    }

}

const getABlog = async (req,res) => {
    try {
        let id = req.params.id;
        let data = await Blogs.findOne(
            {where : {id:id}}
        )
        res.status(200).send(data);
    } catch (err) {
        res.status(400).send(err); 
    }
}

const updateBlog = async (req,res) => {
    let id = req.params.id;
        let currentData = await Blogs.findOne(
            {where : {id:id}}
        )            
    try {
        let input_data = {
            title: req.body.title == undefined? currentData.title: req.body.title,
            message: req.body.message == undefined? currentData.message : req.body.message,
            date: date,
            author: req.body.author == undefined? currentData.author: req.body.author
        }
        let data = await Blogs.update(input_data, {
            where: {id: req.params.id}
        })
         res.status(200).send(data);
    } catch (err) {
       res.status(400).send(err);
    }

}

const deleteBlog = async (req,res) => {
    try {
       let id = req.params.id;
       await Blogs.destroy({
        where: {
            id: id
        }
       })
       res.status(200).send(`Blog with id: ${id} has been removed`); 
    } catch (err) {
        res.status(400).send(err); 
    }
}

module.exports = {
    addBlog,
    getBlogs,
    getABlog,
    updateBlog,
    deleteBlog,
}