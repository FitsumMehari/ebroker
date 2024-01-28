var express = require("express");
const Item = require("../models/Item");
const verifyToken = require("../middlewares/jwt");
var router = express.Router();

router.post("/", verifyToken, async(req, res) => {
    const { name, description } = req.body;
    const item = new Item({ name, description });
    await item.save();
    res.status(201).send("Item created successfully");
});

router.get("/", verifyToken, async(req, res) => {
    const items = await Item.find();
    res.status(200).send(items);
});

router.put("/:id", verifyToken, async(req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    await Item.findByIdAndUpdate(id, { name, description });
    res.status(200).send("Item updated successfully");
});

router.delete("/:id", verifyToken, async(req, res) => {
    const { id } = req.params;
    await Item.findByIdAndDelete(id);
    res.status(200).send("Item deleted successfully");
});

module.exports = router;