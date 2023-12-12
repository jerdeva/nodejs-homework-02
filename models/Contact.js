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
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

contactSchema.post("save", handlerSaveError);
contactSchema.post("findOneAndUpdate", handlerSaveError);

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
};
