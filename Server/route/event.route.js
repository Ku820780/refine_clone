const express = require("express");
const {
  EventRegister,
  EventGet,
  EventUpdate,
  EventDelete,
} = require("../controller/Event.Controller");
const router = express.Router();

router.post("/register", EventRegister);
router.get("/get", EventGet);
router.put("/update/:id", EventUpdate);
router.delete("/delete/:id", EventDelete);

module.exports = router;
