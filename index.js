const express = require('express');
var app = express();

const PORT = process.env.PORT || 3000;


app.use(express.static(__dirname + '/client/dist/'));

app.get('*',(req,res)=>{
  res.sendFile(__dirname + '/client/dist/index.html');
})

app.listen(PORT , () => {
  console.log("Listening on port: " + PORT);
})
