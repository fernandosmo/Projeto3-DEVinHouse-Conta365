const { getData, createOrUpdateData } = require("../utils/function");
const { getUserById } = require("../services/user.services");

module.exports = {
  async index(req, res) {
    const users = getData("user.data.json");
    return res.status(200).json({ users: users });
  },

  async specifyUser(req, res) {
    const { id } = req.params;

    try {
      const response = await getUserById(id, "user.data.json");
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async createUser(req, res) {
    const { name, email } = req.body;
    const existKey = Object.keys(req.body).filter((item) => !req.body[item]);

    if (existKey.length > 0) {
      return res.status(400).send({
        message: `É necessário enviar a(s) seguinte(s) informações: ${existKey.join(
          ", "
        )}`,
      });
    }
    const users = getData("user.data.json");
    const createNewUser = [
      ...users,
      {
        id: users[users.length - 1].id + 1,
        name: name,
        email: email,
      },
    ];
    createOrUpdateData("user.data.json", createNewUser);
    return res.status(201).send({
      message: `Usuário criado com sucesso! Seu ID de usuário é ${
        users.length + 1
      }`,
    });
  },

  async updateUser(req, res) {
    const { id } = req.params;
    const { name, email } = req.body;
    const users = getData("user.data.json");
    const findUser = users.find((item) => item.id === Number(id));
    const userForUpdate = req.body;
    const existKey = Object.keys(req.body).filter((item) => !req.body[item]);

    if (existKey.length > 0) {
      return res.status(400).send({
        message: `É necessário enviar a(s) seguinte(s) informações: ${existKey.join(
          ", "
        )}`,
      });
    }
    if (!findUser) {
      return res
        .status(200)
        .send({ message: "Não existe nenhum usuário para o ID informado" });
    }

    const updatedList = users.map((item) => {
      if (item.id === Number(id)) {
        return { ...item, ...userForUpdate };
      } else {
        return { ...item };
      }
    });
    createOrUpdateData("user.data.json", updatedList);
    return res.status(200).send({ message: "Usuário atualizado com sucesso!" });
  },
};
