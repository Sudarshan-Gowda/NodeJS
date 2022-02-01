const Product = require("../models/product");

exports.getAddproduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  const product = new Product(title, imageUrl, description, price);
  console.log(product);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Product",
      path: "/admin/products",
    });
  });
};

exports.editProduct = (req, res, next) => {
  console.log("edit Product method called");
  res.redirect("/");
};

exports.deleteProduct = (req, res, next) => {
  console.log("delete Product method called");
  res.redirect("/");
};
