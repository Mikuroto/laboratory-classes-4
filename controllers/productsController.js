const Product = require("../models/Product");
const { MENU_LINKS } = require("../constants/navigation");
const { STATUS_CODE } = require("../constants/statusCode");

const getProductsView = (_request, response) => {
  const products = Product.getAll();
  response.render("products.ejs", {
    headTitle: "Shop - Products",
    path: "/products",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/products",
    products: products,
  });
};

const getAddProductView = (_request, response) => {
  response.render("add-product.ejs", {
    headTitle: "Shop - Add product",
    path: "/products/add",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/products/add",
  });
};

const addNewProduct = (request, response) => {
  const { name, description } = request.body;
  const newProduct = new Product(name, description);
  Product.add(newProduct);
  response.status(STATUS_CODE.FOUND).redirect("/products/new");
};

const getNewProductView = (_request, response) => {
  const newestProduct = Product.getLast();
  response.render("new-product.ejs", {
    headTitle: "Shop - New product",
    path: "/products/new",
    activeLinkPath: "/products/new",
    menuLinks: MENU_LINKS,
    newestProduct: newestProduct,
  });
};

const getProductView = (request, response) => {
  const productName = request.params.productName;
  const product = Product.findByName(productName);

  if (product) {
    response.render("product.ejs", {
      headTitle: `Shop - ${product.name}`,
      path: `/products/${product.name}`,
      activeLinkPath: "/products",
      menuLinks: MENU_LINKS,
      product: product,
    });
  } else {
    response.status(STATUS_CODE.NOT_FOUND).render("404", {
      headTitle: "404 - Product Not Found",
      menuLinks: MENU_LINKS,
      activeLinkPath: "",
    });
  }
};

const deleteProduct = (request, response) => {
  const productName = request.params.productName;
  const deleted = Product.deleteByName(productName);

  if (deleted) {
    response.status(STATUS_CODE.OK).json({ success: true });
  } else {
    response.status(STATUS_CODE.NOT_FOUND).json({ success: false, message: "Product not found" });
  }
};


module.exports = {
  getProductsView,
  getAddProductView,
  addNewProduct,
  getNewProductView,
  getProductView,
  deleteProduct,
};