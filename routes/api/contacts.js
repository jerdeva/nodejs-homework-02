const express = require("express");
const contactController = require("../../controllers/contact-controller.js");

const router = express.Router();

router.get("/", contactController.getAllContacts);

router.get("/:contactId", contactController.getContactsById);

router.post("/", contactController.postContact);

router.delete("/:contactId", contactController.deleteContact);

router.put("/:contactId", contactController.updateContact);

module.exports = router;
