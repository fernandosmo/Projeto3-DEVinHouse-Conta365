const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });
const outputFile = './src/swagger_output.json';

const endpointsFiles = ['./src/routes/v1/userroute', './src/routes/v1/financeroute'];

const doc = {
  info: {
    title: "Conta 365",
    description: "Api desenvolvida para controle de finanças - Projeto 3 do curso DevinHouse - NodeJs",
  },
  host: "http://localhost:3333/",
  servers: [
    {
      url: "http://localhost:3333/",
      description: "Development server",
      templates: {
        scheme: {
          enum: ["http", "https"],
          default: "http",
        },
      },
    },
    {
      url: "https://safe-headland-78066.herokuapp.com/",
      description: "Production server",
      templates: {
        scheme: {
          enum: ["http", "https"],
          default: "https",
        },
      },
    },
  ]
};

swaggerAutogen(outputFile, endpointsFiles, doc);
