const validator = require("validator");

function sanitizeString(value) {
  if (typeof value !== "string") {
    throw new Error("Input must be a string");
  }
  return validator.escape(validator.trim(value));
}

module.exports = { sanitizeString };
function sanitizeEmail(value) {
  if (typeof value !== "string") {
    throw new Error("Email must be a string");
  }
  const email = validator.trim(value).toLowerCase();
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email format");
  }
  return email;
}
function sanitizeObject(obj) {
  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }
  if (obj !== null && typeof obj === "object") {
    const clean = {};
    for (const key of Object.keys(obj)) {
      if (key.startsWith("$") || key.includes(".")) {
        continue;
      }
      clean[key] = sanitizeObject(obj[key]);
    }
    return clean;
  }
  return obj;
}
module.exports = { sanitizeString, sanitizeEmail, sanitizeObject };