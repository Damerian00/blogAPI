
module.exports = (sequelize, DataTypes) => {
    const Blogs = sequelize.define("Blog", {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        title : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message : {
            type: DataTypes.STRING,
            allowNull : false,
        },
        date : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author : {
            type: DataTypes.STRING,
            allowNull: false,
        }

    })
    return Blogs;
}