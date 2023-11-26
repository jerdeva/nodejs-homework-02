const express = require("express");
const contactController = require("../../controllers/contact-controller.js");
const { contactFavoriteSchema } = require("../../untils/validation.js");
const { validateBody } = require("../../decorators/validateBody.js");
const { contactSchema } = require("../../untils/validation.js");
const { ctrlWrapper } = require("../../decorators/ctrlWrapper.js");

const router = express.Router();

router.get("/", contactController.getAllContacts);

router.get("/:id", contactController.getContactsById);

router.post(
  "/",
  validateBody(contactSchema),
  ctrlWrapper(contactController.postContact)
);

router.delete("/:contactId", contactController.deleteContact);

router.put(
  "/:id",
  ctrlWrapper(contactController.updateContact)
);

router.patch(
  "/:id/favorite",
  validateBody(contactFavoriteSchema),
  ctrlWrapper(contactController.updateContact)
);

module.exports = router;
