const receptControl = require("../controllers/recepti");
const express = require("express");
const router = express.Router();

router.post("/", receptControl.postujRecept);
router.get("/", receptControl.sviRecepti);
router.get("/:id", receptControl.jedanRecept);
router.put("/:id", receptControl.zameniRecept);
router.patch("/:id", receptControl.zameniSastojak);
router.delete("/:id", receptControl.izbrisiRecept);

module.exports = router;
