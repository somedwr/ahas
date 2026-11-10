const validator = require("validator");

function sanitizeString(value) {
  if (typeof value !== "string") {
    throw new Error("Input must be a string");
  }
  return validator.escape(validator.trim(value));
}

module.exports = { sanitizeString };