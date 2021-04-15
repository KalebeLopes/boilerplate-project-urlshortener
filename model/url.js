require('mongoose')

const schemaUrl = new mongoose.Schema({ 
  id: Number,
  url: String, 
})

const Url = mongoose.model('Url', schemaUrl)

module.exports = Url