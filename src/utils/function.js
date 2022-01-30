const fileSystem = require("fs");


const getData = (filename) => {
  const result = JSON.parse(
    fileSystem.readFileSync("src/database/" + filename, "utf8")
  );
  return result;
};

const createOrUpdateUserData = (fileName, data) => {
  fileSystem.writeFileSync(
    "src/database/" + fileName,
    JSON.stringify(data)
  );
};

module.exports = {
  createOrUpdateUserData,
  getData,
};
