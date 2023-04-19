const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const app = express(); // instance

const dbURI = "mongodb+srv://user-1:user-1@blogwebsite.ei8s5ar.mongodb.net/BlogWebsite";
mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log("connected to db"), app.listen(3000))
    .catch((err) => console.log(err));

//register view engine
app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log("in the next middleware");
    next();
});

app.get("/", (req, res) => {
    res.redirect("/blogs");
    // res.sendFile("./views/index.html", { root: __dirname });

    // const blogs = [
    //     { title: "Yoshi finds eggs", snippet: "Lorem ipsum dolor sit amet consectetur" },
    //     { title: "Mario finds stars", snippet: "Lorem ipsum dolor sit amet consectetur" },
    //     { title: "How to defeat bowser", snippet: "Lorem ipsum dolor sit amet consectetur" },
    // ];
    // res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
    res.render("about", { title: "About" });
});

//blog routes

// app.get("/about-us", (req, res) => {
//     res.redirect("/about");
// });

app.use("/blogs", blogRoutes);

app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
});

/*
    //mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) => { //copied one more time 
    const blog = new Blog({
        title: "new blog",
        snippet: "about myy new blog",
        body: "more about my new blog",
    });

    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        }); //save to the database
});
app.get("/add-blog", (req, res) => {
    const blog = new Blog({
        title: "new blog 3",
        snippet: "about my new blog 3",
        body: "more about my new blog 3",
    });

    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        }); //save to the database
});
app.get("/all-blogs", (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/all-blogs", (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.use((req, res, next) => {
    console.log("new request made");
    console.log("host: ", req.hostname);
    console.log("path: ", req.path);
    console.log("method: ", req.method);
    next();
});
 */
