const fileSystem = require('fs');

const getData = () => {
const result = JSON.parse(fileSystem.readFileSync('src/database/'+'user.data.json', 'UTF-8'))
return console.log(result)
}




module.exports = {
  getData
}