const { getData, createOrUpdateUserData } = require("../utils/function");

module.exports = {
  async index(req, res){

      const users = getData()
      
      return res.status(200).json({users: users})
  },
  async SpecifyUser(req, res){
    const { id } = req.params
    const users = getData()
    const user = users.filter((item) => item.id === Number(id))
    
    return res.status(200).json({user: user})
}
}