const http = require("http");
const fs = require("fs");
const bodyParser = require("body-parser");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<header><title>First Page</title></header>");
    res.write(
      "<body><form action='/message' method = 'POST'><input name='message' type='text'/><button>Submit</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<header><title>First Page</title></header>");
  res.write("<body><h1>Welcome to Node!!</body>");
  res.write("</html>");
  res.end();
});

server.listen("3000");
