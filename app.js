const express = require("express")
const bodyParser = require("body-parser")
const _ = require("lodash")
const app = express()

//posts array
const posts = []

//home heading content
const homeContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus ea adipisicing elit. Delectus ea maxime et, unde soluta ducimus maxime et, unde soluta ducimus eum porro aspernatur fugiat incidunt facilis eius odio earum impedit molestiae voluptatem nisi nihil nostrum consequatur velit. Ratione voluptates tempora officia omnis sint, quisquam aut aliquam ullam illo asperiores doloremque sed ex adipisci accusamus Numquam."

// middlewares
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

//Home page route
app.get("/", (req,res) => {
    res.render("home", {heading: "Home Page" , paragraph: homeContent, post: posts})
})

//compose page route
app.get("/compose", (req,res) => {
    res.render("compose")
})

//post the compose page data
app.post("/compose", (req,res) => {
    const post = {
        title: req.body.post_title,
        body: req.body.post_text
    }
    if(post.title === "" && post.body === ""){
        res.redirect("/")
    }else {
        posts.push(post)
    res.redirect("/")
    }
    
})

//posts page route
app.get("/post/:postName", (req,res) => {
    const postName = _.lowerCase(req.params.postName)
    posts.forEach(post => {
        if(_.lowerCase(post.title) === postName){
            res.render("post", {title: post.title, body: post.body})
        }
    })
    
})

app.listen(3000, () => console.log("Server is running on port 3000...."))
