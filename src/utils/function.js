const fileSystem = require('fs');

const getData = () => {
const result = JSON.parse(fileSystem.readFileSync('src/database/'+'user.data.json', 'utf8'));
return result;
}

const createOrUpdateUserData = (data) => {
  fileSystem.writeFileSync('src/database/'+'user.data.json', JSON.stringify(data));
}


module.exports = {
  createOrUpdateUserData,
  getData
}