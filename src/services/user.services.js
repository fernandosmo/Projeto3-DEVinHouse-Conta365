const { getData } = require("../utils/function");

module.exports = {
  async getUserById(id, fileName) {
    const users = getData(fileName);
    try {
      const user = users.find((item) => item.id === Number(id));

      if (!user) {
        throw new Error(`Nenhum usuário com o ID ${id} foi encontrado`);
      }
      return user;
    } catch (error) {
      return { error: error.message };
    }
  },
};
