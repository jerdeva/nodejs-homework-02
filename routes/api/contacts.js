const express = require("express");

// const contacts = require("../../models/contacts.js");
const contactController = require("../../controllers/contact-controller.js");

// const { contactSchema } = require("../../untils/validation.js")

const router = express.Router();

router.get("/", contactController.getAllContacts);

router.get("/:contactId", contactController.getContactsById);

router.post("/", contactController.postContact);

router.delete("/:contactId", contactController.deleteContact);

router.put("/:contactId", contactController.updateContact);

module.exports = router;
