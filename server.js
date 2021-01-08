const express = require('express');
const app = express();

app.use(express.static('./dist/fbcExample'));
app.get('/*', function(req, res) {
  res.sendFile('index.html', {
    root: 'dist/fbcExample/'
  });
});

app.listen(process.env.PORT || 8080);
