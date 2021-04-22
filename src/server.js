

const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('www'));
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'index.html'));
});
app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
