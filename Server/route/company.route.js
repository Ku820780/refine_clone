const express = require("express");
const multer = require("../middleware/multer.js");
const {
  companyRegister,
  companyGet,
  contactUpdate,
  deleteCompany,
  deleteAllCompanies,
  newContactRegister,
  NewContactGet,
  paginationWithSearch,
  countCompanies,
  countContact,
  updateContactStatus,
} = require("../controller/Company.Controller");
const router = express.Router();

router.post("/register", multer.single("companyLogo"), companyRegister);
router.post("/addnewcontact", newContactRegister)
router.get("/get/newcontact", NewContactGet)
router.get("/pagination", paginationWithSearch)
router.get("/get", companyGet);
router.get('/companies/count', countCompanies);
router.get('/contact/count', countContact)
router.put("/update/:id", contactUpdate);
router.put('/contact/:id/status', updateContactStatus);
router.delete("/delete/:id", deleteCompany);
router.delete("/delete", deleteAllCompanies);

module.exports = router;
