const http = require("http");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
//const expressHbs = require("express-handlebars");

const adminData = require("./routes/admin");
const shopRouter = require("./routes/shop");
const routes = require("./routes");
const rootDir = require("./util/path");

const app = express();

//EJS configuration
app.set("view engine", "ejs");

//Handlebar configuration
// app.engine(
//   "hbs",
//   expressHbs({
//     layoutsDir: "views/layouts/",
//     defaultLayout: "main-layout",
//     extname: "hbs",
//   })
// );
// app.set("view engine", "hbs");

//Pug Configuration
//app.set("view engine", "pug");

app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, "public")));

app.use("/admin", adminData.routes);
app.use(shopRouter);

app.use((req, res, next) => {
  res.render("404", { pageTitle: "Page Not Found" });
});

app.listen(3000);
