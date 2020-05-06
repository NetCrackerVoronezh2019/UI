const express = require('express');
const path = require('path');
 
const app = express();
 
app.use(express.static(__dirname + '/help-student'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/help-student/index.html'));
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);