import query from './public/query';
const express = require("express");
const fetch   = require("node-fetch");
const bodyParser = require('body-parser');
const app = express();
const poeUrl = "http://www.pathofexile.com/api/trade/search/Standard";
const poeFetchUrl = "https://www.pathofexile.com/api/trade/fetch/";
const PORT = 5400;

const exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static("public"));
app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));

app.post('/search', (req, res) => {
  
  query.query.name=req.body.name;
  query.query.type=req.body.type;
  query.query.filters.trade_filters.filters.price.min=req.body.min || 1;
  query.query.filters.trade_filters.filters.price.max=req.body.max ||999;
  res.redirect('http://localhost:5400'); 
});

app.get("/", function(req, res) {
 
  fetchQuery()
    .then( data => {
      
res.render('home',{data:data.result})
})
  .catch(err =>res.send(err)
)});
  
async function fetchQuery() {

  const response = await fetch(poeUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json " },
    body: JSON.stringify(query)
  });
  const data = await response.json();
  
  const shortArray = data.result.slice(0, 10);
  
 
  const urlArray = poeFetchUrl + shortArray + "/?query=" + data.id;
  const secondResponse = await fetch(urlArray);
  const finalData = await secondResponse.json();
  return finalData;
  }setInterval(fetchQuery, 5000);
  