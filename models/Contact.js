const { Schema } = require("mongoose");
const { model } = require("mongoose");
const { handlerSaveError } = require("./hooks.js");

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    required: [true, "Set email for contact"],
  },
  phone: {
    type: String,
    required: [true, "Set phone for contact"],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = model("contact", contactSchema);

contactSchema.post("save", handlerSaveError);
contactSchema.post("findOneAndUpdate", handlerSaveError);



module.exports = {
  Contact,
};
