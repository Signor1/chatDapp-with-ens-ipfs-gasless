const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  const wallet = new ethers.Wallet(process.env.MY_PRIVATE_KEY);
  const encryptedJsonKey = await wallet.encrypt(process.env.MY_SALT);
  fs.writeFileSync("./.encryptedKey.json", encryptedJsonKey);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
