const http = require('http');
const url = require('url');

const data = require('./data');

const { parse } = require('querystring');

function fun(req, res) {
  let body = '';
  req.on('data', chunk => {
                   body += chunk.toString();
                 });
  req.on('end', () => {
                   console.log(parse(body));
                   data.push(parse(body));
                   res.end(JSON.stringify(data));
                });
}

const server = http.createServer((req, res) => {
  const urlParts = url.parse(req.url);
  switch (req.method) {
    case 'GET':
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(" <form method=POST> <table>              \
<tr> <td> Name: <td> <input type=textfield name=name>   \
<tr> <td> Age:  <td> <input type=textfield name=age>    \
<tr> <td colspan=2> Type <button>Proceed</button> to send data. </table> ");
      break;
    case 'POST':
      fun(req, res);
      break;
    default:
      // ...
      break;
  }
});

server.listen(27182, () => console.info('Server is up on 27182'));