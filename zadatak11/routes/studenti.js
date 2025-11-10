const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studenti");

router.post("/", studentController.dodajStudenta);
router.get("/", studentController.sviStudenti);
router.get("/:id", studentController.jedanStudent);
router.put("/:id", studentController.zameniStudenta);
router.delete("/:id", studentController.izbrisiStudenta);

module.exports = router;
