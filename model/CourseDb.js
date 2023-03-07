// importing 
const mongoose = require("mongoose");
//connect database
mongoose.connect("mongodb+srv://aliyapsubeer:aliyapsubeer@cluster0.e2ivnqo.mongodb.net/?retryWrites=true&w=majority");
const Schema = mongoose.Schema;
var courseschema = new Schema({
    Moviename : String,
    Actor : String,
    Actress: String,
    Director : String,
    Language: String,
    Year: String
});
var Courseinfo = mongoose.model("courses",courseschema);
module.exports = Courseinfo;
