//jshint esversion:

const express = require("express");
const https = require("https");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const { stringify } = require("querystring");

const homeStartingContent = "Manage Life for Personal and Professional Growth. Most people spend a bunch of time thinking about how happy we will be when we “finally make it”. Only a few of us make a plan showing how we will get ourselves the personal and professional growth and development we need to “make it”. It is 100% on you to make sure you get the resources you need to bring yourself and the people you love the growth and success you deserve. This is a refueling depot for that journey. ";
const aboutContent = 'The Circles we Draw...there is a wise telling of how people see themselves in relation to the world around them. Some draw a circle close around with only them inside. Everything outside the circle is a threat, opportunity, or irreverent. Others crave family or a very few close companions who are like family. That same circle grows bigger and surrounds them as well as their kin. A few others draw even bigger circles and care for groups of people they have no direct relation to. I propose that no matter what size our circle is, our purpose is the same. We all must find growth for those within the circles we draw. We must manage everything we do in a way that leads to growth for those within. The Growth and Development of People is the Highest Calling of Leadership. ~Harvey S. Firestone"';
const contactContent = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.";

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-webdev:Webdev2022@cluster0.46xwt9z.mongodb.net/mtgblogDB");

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res) {

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
    });
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose", {});
});

app.post("/compose", function(req, res) {
  
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err){
    if(!err) {
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

  const requestedPostId = req.params.postId;
  
    Post.findOne({_id: requestedPostId}, function(err, post){
      res.render("post", {
        title: post.title,
        content: post.content
      });
    });
  
  });

app.listen(3000, function() {
  console.log("App server up and running on port 3000.")
});
