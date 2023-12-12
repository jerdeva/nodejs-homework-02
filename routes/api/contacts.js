const express = require("express");
const contactController = require("../../controllers/contact-controller.js");
const { contactFavoriteSchema } = require("../../untils/validation.js");
const { validateBody } = require("../../decorators/validateBody.js");
const { contactSchema } = require("../../untils/validation.js");
// const { ctrlWrapper } = require("../../decorators/ctrlWrapper.js");
const { authentication } = require("../../middelvares/authentication.js");
const {upload} = require ("../../middelvares/upload.js")

const router = express.Router();

router.use(authentication);

router.get("/", contactController.getAllContacts);

router.get("/:id", contactController.getContactsById);

router.post(
  "/",
  upload.single("avatar"),
  validateBody(contactSchema),
  contactController.postContact
);

router.delete("/:id", contactController.deleteContact);

router.put("/:id", contactController.updateContact);

router.patch(
  "/:id/favorite",
  validateBody(contactFavoriteSchema),
  contactController.updateContact
);

module.exports = router;
