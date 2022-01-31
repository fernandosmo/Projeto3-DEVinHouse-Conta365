const { getData, createOrUpdateData } = require("../utils/function");
const xlsxPopulate = require("xlsx-populate");
const {
  getUserByIdForFinance,
  indexFinance,
  indexUser,
} = require("../services/finance.service");

module.exports = {
  async getXlsxUploaded(req, res) {
    const { userid } = req.params;
    const users = await getData("user.data.json");
    const idexUser = await indexUser(users, userid);
    const finances = await getData("finance.data.json");
    const userToFinance = await getUserByIdForFinance(
      userid,
      "finance.data.json"
    );

    const xlsxData = await xlsxPopulate.fromDataAsync(req.file.buffer);
    const rows = xlsxData.sheet(0).usedRange().value();
    const [firstRow] = rows;
    const keys = ["price", "typeOfExpenses", "date", "name"];
    const validateKeys = firstRow.every((item, index) => {
      return keys[index] === item;
    });
    if (firstRow.length !== 4 || !validateKeys) {
      return res.status(400).send({
        message:
          "Dados de despesa devem ser inserido obrigatóriamente na seguinte ordem: price, typeOfExpenses, date, name.",
      });
    }

    const filterRows = rows.filter((_, index) => index !== 0);
    filterRows.map((row) => {
      const result = row.map((itemInRow, index) => {
        return {
          [firstRow[index]]: itemInRow
            ? itemInRow
            : res
                .status(400)
                .send({ message: "Todos os campos devem ser preenchidos" }),
        };
      });
      userToFinance.financialData.push(
        Object.assign(
          {},
          { id: userToFinance.financialData[userToFinance.financialData.length - 1].id + 1 },
          ...result
        )
      );
      if (isNaN(idexUser)) {
        return res.status(400).send({
          message:
            "Usuário invalido, verifique os dados informados ou vá em criar novo usuário pelo metodo POST.",
        });
      } else {
        const userChangedFromFinances = finances.splice(
          idexUser,
          1,
          userToFinance
        );
      }
    });

    createOrUpdateData("finance.data.json", finances);
    return res.status(201).send({ message: "Despesa salva com sucesso." });
  },

  async deleteFinance(req, res) {
    const { userid, financeid } = req.params;
    const finances = await getData("finance.data.json");
    const userToFinance = await getUserByIdForFinance(
      userid,
      "finance.data.json"
    );
    const findFinancesForUser = userToFinance.financialData;
    const findFinanceToDelete = (id) => {
      try {
        const finance = findFinancesForUser.find(
          (item) => item.id === Number(id)
        );

        if (!finance) {
          throw new Error(`Nenhuma despesa com o ID ${id} foi encontrado`);
        }
        return finance;
      } catch (error) {
        return { error: error.message };
      }
    };
    const financeToDelete = findFinanceToDelete(financeid);

    const idexFinance = await indexFinance(
      userToFinance,
      financeToDelete,
      financeid
    );

    const idexUser = await indexUser(finances, userid);

    if (isNaN(idexUser)) {
      return res.status(400).send({
        message: "Usuário invalido, verifique os dados informados.",
      });
    }
    if (isNaN(idexFinance)) {
      return res.status(400).send({
        message: "Despesa invalida, verifique os dados informados.",
      });
    } else {
      const financeDeletedFromUser = userToFinance.financialData.splice(
        idexFinance,
        1
      );
      const userChangedFromFinances = finances.splice(
        idexUser,
        1,
        userToFinance
      );
      createOrUpdateData("finance.data.json", finances);
      return res.status(200).send({ message: "Despesa deletada com sucesso." });
    }
  },
};
