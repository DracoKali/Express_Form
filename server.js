let session = require('express-session');
let express = require('express');
let app = express();
let bodyParser = require("body-parser");
let port = 8000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + "/static"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'tata',
    // resave: true,
    // saveUninitialized: true,
    // cookie: { secure: true }
}));


app.get("/", (req, res) => {
    return res.render("home")
});

app.get("/result", (req, res) => {
    console.log(req.session.name);
    return res.render("result", { context: req.session.user })
});

app.post("/show", (req, res) => {
    console.log(req.body);
    req.session.user = req.body;
    return res.redirect("/result")

});
app.post('/goback', function (req, res) {
    res.redirect('/');
})


app.listen(port, () => {
    console.log(`Running on port ${port} .....`)
});