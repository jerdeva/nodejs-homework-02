const contacts = require("../models/contacts.js");
const { contactSchema } = require("../untils/validation.js");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const getContactsById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json(result);
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({
      message,
    });
  }
};

const postContact = async (req, res) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      const error = new Error("Missing required name field");
      error.status = 400;
      throw error;
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({
      message,
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({
      message,
    });
  }
};

const updateContact = async (req, res) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      const error = new Error("Missing fields");
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;

    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json(result);
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({
      message,
    });
  }
};

module.exports = {
  getAllContacts,
  getContactsById,
  postContact,
  deleteContact,
  updateContact,
};
