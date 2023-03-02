const Blog = require('../models/Blog');

let date = new Date().toLocaleString()

//create and store new blog
const addBlog = async (req,res) => {
    try {
        let input_data ={
            title: req.body.title,
            message: req.body.message,
            date: date,
            author: req.body.author
        }
        let data = await Blog.create(input_data)
        res.status(201).send(data);
    } catch (err) {
        res.status(400).send(err);
    }
}

const getBlogs = async (req,res) => {   
        let data = await Blog.find()
        if (!data) return res.status(204).json({"message" : "No Blogs Found"})
        res.status(200).send(data); 
}

const getABlog = async (req,res) => {
    if (!req?.params?.id){
        return res.status(400).json({"message" : "ID parameter is required."});
    }
    try {
        let id = req.params.id;
        let selected = await Blog.findOne({_id:id})
        if (!selected){
            return res.status(204).json({"message" : `Employee ID: ${id} not found.`})
        }
        res.status(200).send(selected);
    } catch (err) {
        res.status(400).send(err); 
    }
}

const updateBlog = async (req,res) => {
    if (!req?.params?.id){
        return res.status(400).json({"message" : "ID parameter is required."});
    }
    let id = req.params.id;
    let currentData = await Blog.findOne({_id :id}).exec();
      if (!currentData){
        return res.status(204).json({"message" : `Employee ID: ${id} not found.`})
    }
    try {
        let input_data = {
            title: req.body.title == undefined? currentData.title: req.body.title,
            message: req.body.message == undefined? currentData.message : req.body.message,
            date: date,
            author: req.body.author == undefined? currentData.author: req.body.author
        }
        let data = await currentData.updateOne(input_data);
         res.status(200).send(data);
    } catch (err) {
       res.status(400).send(err);
    }

}

const deleteBlog = async (req,res) => {
    let id = req.params.id;
    if (!req?.params?.id){
        return res.status(400).json({"message" : "ID parameter is required."});
    }
    const selected = await Blog.findOne({_id :id}).exec();
    if (!selected){
        return res.status(204).json({"message" : `Employee ID: ${id} not found.`})
    }
    try {
       const result = await selected.deleteOne({_id:id})
       res.status(200).send(`Blog with id: ${result} has been removed`); 
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