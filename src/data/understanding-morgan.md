# Understanding Morgan

Morgan is an HTTP request logger middleware for [node.js](https://github.com/nodejs/node) typically used for [Express](https://github.com/expressjs/express) apps. Express is a fast, unopinionated, minimalistic routing and middleware web framework for node. An Express app is literally a series of middleware function calls. However, before diving into Morgan, first we need to understand what are middleware functions.

> An Express app is literally a series of middleware function calls.

Middleware functions are functions that have access to the [request object](http://expressjs.com/en/4x/api.html#req) (req), the [response object](http://expressjs.com/en/4x/api.html#res) (res), and the next middleware function in the application's request-response cycle (commonly denoted by a variable named `next()`).

Let's take a look at these three function arguments:

- Request object (req): represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
- Response object (res): represents the HTTP response that an Express app sends when it gets an HTTP request.
- Next middleware function: `next()` is called if the current middleware function does not end the request-response cycle.

![Express](https://res.cloudinary.com/practicaldev/image/fetch/s--JRMfS7ii--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/http://expressjs.com/images/express-mw.png)

In practice, you can use several middleware functions at the same time. When you have more than one, they're executed one by one in the order that they were taken into use in express.

## So how do we use Morgan as a middleware function?

Morgan simplifies logging information for your Express app. For this use case, installation is done using the `npm install` command:

```javascript
npm install morgan

const express = require('express')
const morgan = require('morgan')

const app = express()
```

**Morgan(format, options)**

Then you can create a new morgan logger middleware function using whatever `format` and `options` you want to set. The `format` argument may be a:

- String of a predefined name (like 'tiny'), a
- String of a format string (predefined tokens), or a
- Function that will return a log entry.

If using the `format` function you will have to call it using three arguments `tokens`, `req`, and `res`, where `tokens` is an object with all defined tokens, `req` is the HTTP request and `res` is the HTTP response. The function is expected to return a string that will be the log line, or `undefined` / `null` to skip logging.

Now let's explore these three options:

### Using a predefined format string

```javascript
app.use(morgan("tiny"));

//Logged into your console for a GET request you should see:
//GET /api/persons/ 200 222 - 2.196 ms
//This would be: method, url, status, content-length and response time.
//Tiny is the minimal output for logging information.
```

### Using a format string of predefined tokens

```javascript
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

//Logged into your console for a GET request you should see:
//GET /api/persons/ 200 222 - 2.196 ms
//This would be: method, url, status, content-length and response time.
```

Notice how using predefined format strings can render the same results as using predefined tokens. So definitely check out their options. You can both explore all their predefined format strings and predefined tokens on [Morgan's](https://github.com/expressjs/morgan) github site or on the Express' article for [Morgan middleware](http://expressjs.com/en/resources/middleware/morgan.html).

A note on using predefined tokens: you always need to declare them as strings with a colon before the token's name `:method`.

### Using a custom format function

```javascript
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.content(req, res)
    ].join(" ");
  })
);
```

## Tokens

If you want to customise your own middleware functions you will have to create your own tokens. To define a token, simply invoke `morgan.token()` with the name and a callback function. This callback function is expected to return a string value. The value returned is then available as `:tokenName`, for the example shown, we are creating a token called `:body` to log the request's body in JSON format.

```javascript
morgan.token("body", function (req, res) {
  return [JSON.stringify(req.body)];
});
```

Then, we just add that token to any other set of tokens that we would like to log into our Express app as follows:

```javascript
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

//Logged into your console for a POST request you should see:
//POST /api/persons/ 200 54 - 3.467 ms {"name":"Hector Sosa","number":"12345678"}
//This would be: method, rrl, status, content-length, response time and content
```

Middlewares, regardless if they are set with Morgan or not are the backbone of any Express application. You can choose to integrate application-level, router-level, error-handling, built-in or third-party middleware to your apps building a series of functions together, creating a middleware system for all of your needs.

Thank you for reading!
