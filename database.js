mongoose = require('mongoose')
 
class Database {
  constructor(){}

  databaseConection(url) {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }
}
module.exports = Database