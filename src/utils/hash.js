const { scrypt, randomBytes } = require("crypto");
const { promisify } = require("util");

const scryptAsync = promisify(scrypt);

class Hash {
  static async toHash(value) {
    const salt = randomBytes(16).toString("hex");
    const buf = await scryptAsync(value, salt, 64);
    return `${buf.toString("hex")}.${salt}`;
  }

  static async compare(stored, supplied) {
    const [storedHash, salt] = stored.split(".");
    const buf = await scryptAsync(supplied, salt, 64);
    const suppliedHash = buf.toString("hex");
    return suppliedHash === storedHash;
  }
}

module.exports = Hash;
