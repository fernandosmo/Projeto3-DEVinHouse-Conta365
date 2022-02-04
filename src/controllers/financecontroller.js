const {
  getData,
  createOrUpdateData,
  convertDate,
} = require("../utils/function");
const xlsxPopulate = require("xlsx-populate");
const {
  getUserByIdForFinance,
  indexFinance,
  indexUser,
} = require("../services/finance.service");

module.exports = {
  async getXlsxUploaded(req, res) {
    const { userid } = req.params;
    const users = getData("user.data.json");
    const finances = await getData("finance.data.json");
    const idexUser = await indexUser(users, userid);
    const xlsxData = await xlsxPopulate.fromDataAsync(req.file.buffer);
    const rows = xlsxData.sheet(0).usedRange().value();
    const [firstRow] = rows;
    const keys = ["price", "typeOfExpenses", "date", "name"];
    const validateKeys = firstRow.every((item, index) => {
      return keys[index] === item;
    });

    switch (
      users.find((x) => x.id === Number(userid)) &&
      !finances.find((x) => x.userId === Number(userid))
    ) {
      case true: {
        const newUserOfUsers = {
          id: finances[finances.length - 1].id + 1,
          userId: Number(userid),
          financialData: [],
        };

        finances.splice(finances.length, 0, newUserOfUsers),
          createOrUpdateData("finance.data.json", finances);
        break;
      }
      case false:
        switch (
          !users.find((x) => x.id === Number(userid)) &&
          !finances.find((x) => x.userId === Number(userid))
        ) {
          case true: {
            res.status(400).send({
              message:
                "Usuário invalido, verifique os dados informados.",
            });
            break;
          }
        }
    }

    if (firstRow.length !== 4 || !validateKeys) {
      return res.status(400).send({
        message:
          "Dados de despesa devem ser inserido obrigatóriamente na seguinte ordem: price, typeOfExpenses, date, name.",
      });
    }

    const userToFinance = await getUserByIdForFinance(
      userid,
      "finance.data.json"
    );

    const idsOfUsers = [];
    let i = 0;
    while (i < users.length) {
      idsOfUsers.push(users[i].id);
      i++;
    }

    if (!idsOfUsers.includes(Number(userid))) {
      return res.status(400).send({
        message: "Usuário invalido, verifique os dados informados.",
      });
    }
    const populateRows = rows.filter((_, index) => index !== 0);
    populateRows.map((row) => {
      const result = row.map((itemInRow, index) => {
        return {
          [firstRow[index]]: itemInRow
            ? itemInRow
            : res
                .status(400)
                .send({ message: "Todos os campos devem ser preenchidos" }),
        };
      });

      if (userToFinance.financialData.length > 0) {
        userToFinance.financialData.push(
          Object.assign(
            {},
            {
              id:
                userToFinance.financialData[
                  userToFinance.financialData.length - 1
                ].id + 1,
            },
            ...result
          )
        );
          }
        if (userToFinance.financialData.length == 0) {
          userToFinance.financialData.push(
            Object.assign(
              {},
              {
                id: 1,
              },
              ...result
            )
          );
        }
      }
    );
    finances.splice(finances.length - 1, 1, userToFinance);
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

  async getFinanceByUser(req, res) {
    const { userid } = req.params;
    const typesOfExpenses = req.query.typeofexpense;
    const finances = await getData("finance.data.json");
    const users = await getData("user.data.json");
    const userToFinance = await getUserByIdForFinance(
      userid,
      "finance.data.json"
    );
    const findFinancesForUser = userToFinance.financialData;

    const arrDate = findFinancesForUser.map((a) => a.date);

    const filterMonth = () => {
      const ArrDateConverted = [];
      for (let z = 0; z < arrDate.length; z++) {
        const dateConverted = convertDate(arrDate[z]);
        ArrDateConverted.push(dateConverted);
      }
      return ArrDateConverted;
    };

    const arrOfPrices = findFinancesForUser.map((a) => a.price);

    const soma = arrOfPrices.reduce(function (soma, i) {
      return soma + i;
    });

    return res.status(200).send(filterMonth());
  },
};
