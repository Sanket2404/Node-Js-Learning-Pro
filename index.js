const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

//get task
app.get('/', function(req,res){
    fs.readdir(`./files`, function(err, files){
        console.log(files);
        res.render('index', {files:files});    
    })
})

//Create task
app.post('/create', function(req,res){  
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.detail, function(err){
        res.redirect("/");
    })
})

//get file data
app.get('/file/:filename', function(req,res){
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function(err,filedata){
      res.render('show', {filename:req.params.filename, filedata:filedata});
    })
})

//edit file route
app.get('/edit/:filename', function(req,res){
    // fs.readFile(`./files/${req.params.filename}`, "utf-8", function(err,filedata){
    //   res.render('show', {filename:req.params.filename, filedata:filedata});
    // })
    res.render('edit',{filename:req.params.filename});
})

//edit file name
app.post('/edit', function(req,res){
    fs.rename(`./files/${req.body.pretitle}`, `./files/${req.body.Newtitle}`, function(err){
       res.redirect('/');
    })
 })

app.listen(3000);