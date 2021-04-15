express = require('express')

const dns = require('dns');
const app = express();
const UrlModel = require('./model/url')
var count = 0

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl/new', (req, res) => {
  const url = req.body.url
  //console.log(url)
  const urlSplit = url.split('/')
  const urlWithoutHttps = urlSplit[2]

  if (urlSplit[0] + '//' != 'https://') {
    return res.json({"error": "invalid url"})
  }

  dns.lookup(urlWithoutHttps, (err, addresses) => {
    if (err) {
      console.log(err)
      res.json({"error": "invalid url"})
    }
    console.log(addresses) 
  }) 


  const urlModel = new UrlModel({
    id: count,
    url: req.body.url,
  })

  urlModel.save(function(err, data){
    if (err) return console.log(err);
    console.log(data)
    count++
    res.json({
      original_url: data.url, 
      short_url: data.id
    })
  })
})

app.get('/api/shorturl/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  
  UrlModel.findOne({id: id}, (err, urlSaved) => {
    if(err) return console.error(err)
    console.log(urlSaved)
    res.redirect(urlSaved.url)
  })
})

app.delete('/api/shorturl/delete', (req, res) => {
  UrlModel.remove({}, (err, done) => {
    if (err) return console.log(err)
    console.log(done)
  })  
  res.send(done)
})

module.exports = app
