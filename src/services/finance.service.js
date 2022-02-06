const { getData } = require("../utils/function");

module.exports = {
  async getUserByIdForFinance(id, fileName) {
    const users = getData(fileName);
    try {
      const user = users.find((item) => item.userId === Number(id));

      if (!user) {
        throw new Error(`Nenhum usuário com o ID ${id} foi encontrado`);
      }
      return user;
    } catch (error) {
      return { error: error.message };
    }
  },
  async indexFinance(userToFinance, financeToDelete, financeid) {
    try {
      const finance = userToFinance.financialData.indexOf(financeToDelete);
      if (finance < 0) {
        throw new Error(`Nenhuma despesa com o ID ${financeid} foi encontrado`);
      }
      return finance;
    } catch (error) {
      return { error: error.message };
    }
  },
  async indexUserFinances(userid) {
    const finances = await getData("finance.data.json");
    try {
      const user = finances.indexOf(
        finances.find((x) => x.userId === Number(userid))
      );
      if (user < 0) {
        throw new Error(`Nenhum usuário com o ID ${userid} foi encontrado`);
      }
      return user;
    } catch (error) {
      return { error: error.message };
    }
  },
  async indexUser(userid) {
    const users = getData("user.data.json");
    if (users == users) {
      try {
        const user = users.indexOf(users.find((x) => x.id === Number(userid)));
        if (user < 0) {
          throw new Error(`Nenhum usuário com o ID ${userid} foi encontrado`);
        }
        return user;
      } catch (error) {
        return { error: error.message };
      }
    }
  },
};
