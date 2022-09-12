const validator = require("validator");
const validText = require("./validText");

module.exports.validatePostUpdate = async (data) => {
  let errors = {};

  data.text = validText(data.text) ? data.text : "";

  if (
    data.text !== undefined &&
    !validator.isLength(data.text, { min: 1, max: 1000 })
  ) {
    errors.text = "Post must be between 1 and 1000 characters";
  }

  if (!validator.isInt(data.limit)) {
    errors.limit = "Must be an integer number";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
