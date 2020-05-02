const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

cases = [
    {id: 1, name: "John Paul", gender: "Male", age: 56, address: "Johnson street", city: "Neverland", 
     country: "Nevercountry", status: "Dead", updated: Date.now()},
    {id: 2, name: "Yoko John", gender: "Female", age: 86, address: "Johnson street", city: "Neverland", 
     country: "Nevercountry", status: "Dead", updated: Date.now()},
];

app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});


app.get("/api", (req, res, next) => {
    res.json(cases);
});

app.get("/api/:id", (req, res, next) => {
    let found = cases.find(el => el.id == req.params.id);
    if (found)
        res.json(found);
    else
        res.status(404).send({});
});

app.post("/api", (req, res, next) => {
    req.body.id = cases.length + 1;
    req.body.updated = Date.now();
    cases.push(req.body);
    res.status(201).send(req.body);
});

app.delete("/api/:id", (req, res, next) => {
    let error = true;
    cases.forEach(function(item, index){
        if(item.id == req.params.id){
          //delete cases[index];
          cases.splice(index, 1);
          error = false;
          res.json(item);
        }
    });

    if(error)
        res.status(404).send({});
});

/*
    let found = cases.find(el => el.id === req.params.id);

    let found = cases.find(el => el.id === req.body.id);
    if(found) {
        res.status(409).send("Case id" + req.body.id);
    } else {

    }
*/