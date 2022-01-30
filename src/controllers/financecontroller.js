const { getData, createOrUpdateUserData,} = require("../utils/function");
const xlsxPopulate = require("xlsx-populate");
const { getUserById } = require("../services/user.services");

module.exports = {

  async getXlsxUploaded(req, res){

  const finances = getData('finance.data.json')
  const { userid } = req.params;
  const findUser = finances.find((item) => item.userId === Number(userid));
  console.log(findUser)
  const xlsxData = await xlsxPopulate.fromDataAsync(req.file.buffer)

  const rows = xlsxData.sheet(0).usedRange().value()
  const [firstRow] = rows

  const keys = ['price', 'typeOfExpenses', 'date', 'name']
  const validateKeys = firstRow.every((item, index) => {
      return keys[index] === item
  })
  if(firstRow.length !== 4 || !validateKeys){
      return res.status(400).send({message: 'Dados de despesa devem ser inserido obrigatóriamente na seguinte ordem: price, typeOfExpenses, date, name.'})
  }
  
  const filterRows = rows.filter((_, index) => index !== 0)
    filterRows.map((row)=> {
        const result = row.map((itemInRow, index) => {
            return {
                [firstRow[index]]: itemInRow ? itemInRow : res.status(400).send({message: 'Todos os campos devem ser preenchidos'})
            }
        })
        console.log(result)
        finances[userid]["financialData"].push(Object.assign({}, {id: finances[userid]["financialData"].length + 1}, ...result))
    
      })

  createOrUpdateUserData('finance.data.json', finances)
  return res.status(201).send({message: 'Despesa salva com sucesso.'})
}
}
