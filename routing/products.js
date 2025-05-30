const express = require("express");
const productsController = require("../controllers/productsController");

const router = express.Router();

router.get("/", productsController.getProductsView);
router.get("/add", productsController.getAddProductView);
router.post("/add", productsController.addNewProduct);
router.get("/new", productsController.getNewProductView);
router.get("/:productName", productsController.getProductView);
router.delete("/:productName", productsController.deleteProduct);

module.exports = router;