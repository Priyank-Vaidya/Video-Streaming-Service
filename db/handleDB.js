const fs = require('fs');

module.exports.saveToDB = function (data) {
    currentData = this.readFromDB();
    currentData[data.id] = data;
    currentData = JSON.stringify(currentData);
    fs.writeFileSync(fileName, currentData, 'utf-8')
}

module.exports.readFromDB = function () {
    var data = fs.readFileSync(fileName, 'utf-8')
    if(!data){
        data = {}
    }
    return JSON.parse(data)
}

module.exports.getFile = function(fileId) {
  if (!fileId) {
    return null;
  }
  data = this.readFromDB();
  return data[fileId];

}