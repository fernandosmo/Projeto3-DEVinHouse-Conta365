const fileSystem = require("fs");


const getData = (filename) => {
  const result = JSON.parse(
    fileSystem.readFileSync("src/database/" + filename, "utf8")
  );
  return result;
};

const createOrUpdateData = (fileName, data) => {
  fileSystem.writeFileSync(
    "src/database/" + fileName,
    JSON.stringify(data)
  );
};

const convertDate = (item, Year) => {

  if(Year === "year"){
  const startToCovertDateExcel  = Math.floor(item - 25569);
  const dateExcelMultipliedToConvert = startToCovertDateExcel * 86400;                                        
  const convertExcelDate = new Date(dateExcelMultipliedToConvert * 1000);
  const data = new Date((convertExcelDate.getFullYear()), (convertExcelDate.getMonth()), (convertExcelDate.getDate()));
  return data.getFullYear();
  }
  else {
  const startToCovertDateExcel  = Math.floor(item - 25569);
  const dateExcelMultipliedToConvert = startToCovertDateExcel * 86400;                                        
  const convertExcelDate = new Date(dateExcelMultipliedToConvert * 1000);
  const data = new Date((convertExcelDate.getFullYear()), (convertExcelDate.getMonth()), (convertExcelDate.getDate()));
  return ((data.getDate() )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear(); 
  }
}

module.exports = {
  createOrUpdateData,
  getData,
  convertDate
};
