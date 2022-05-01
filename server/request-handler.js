/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/


// Request and Response come from node's http module.
//
// They include information about both the incoming request, such as
// headers and URL, and about the outgoing response, such as its status
// and content.
//
// Documentation for both request and response can be found in the HTTP section at
// http://nodejs.org/documentation/api/

// Do some basic logging.
//
// Adding more logging to your server can be an easy way to get passive
// debugging help, but you should always be careful about leaving stray
// console.logs in your code.

// The outgoing status.
// var statusCode = 200;

// See the note below about CORS headers.

// Tell the client we are sending them plain text.
//
// You will need to change this if you are sending something
// other than plain text, like JSON or HTML.
// headers['Content-Type'] = 'text/html';
// 'text/html'

// .writeHead() writes to the request line and headers of the response,
// which includes the status and all headers.
// response.writeHead(statusCode, headers);

// Make sure to always call response.end() - Node may not send
// anything back to the client until you do. The string you pass to
// response.end() will be the body of the response - i.e. what shows
// up in the browser.
//
// Calling .end "flushes" the response's internal buffer, forcing
// node to actually send all the data over to the client.

// console.log('request endpoint', request.endpoint);

// '/classes/messages'
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10, // Seconds.
  'allow': 'GET, POST, PUT, DELETE, OPTIONS'
};

var headers = defaultCorsHeaders;
headers['Content-Type'] = 'application/json';

var messagesArray = [];

var requestHandler = function(request, response) {

  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  if (request.url === '/classes/messages') {
    if (request.method === 'GET' || request.method === 'OPTIONS') {
      response.writeHead(200, headers);
      response.end(JSON.stringify(messagesArray));
    } else if (request.method === 'POST') {
      let body = '';
      request.on('data', function (chunk) {
        body += chunk;
        messagesArray.push(JSON.parse(body));
      });
      request.on('end', function () {
        response.writeHead(201, headers);
        response.end(JSON.stringify(messagesArray));
      });
    } else if (request.url === undefined) {
      response.writeHead(404, headers);
      response.end('Not found');
    }
  } else {
    response.writeHead(404, headers);
    response.end('Not found');
  }
  console.log(messagesArray);
};

exports.requestHandler = requestHandler;

// else if (request.method === 'DELETE'){
//   for (var i = 0; i < messagesArray.length; i++) {
//     // [{username: 'user', text: 'message', roomname: 'lobby'}]
//   }
// }

// else if (request.method === 'PUT') {
//   let body = '';
//   request.on('data', function (chunk) {
//     body += chunk;
//     // console.log('body:', body);
//     let obj = JSON.parse(body);
//     var
//   });
//   request.on('end', function () {
//     console.log(obj);
//     response.writeHead(202, headers);
//     response.end();
//   });
// }

// if (request.method === 'OPTIONS') {
//   // wh(200, defaultCorsHeaders)
//   // end()
// }



// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.




