# Understanding Rest Client for Visual Studio Code

The web servers and the browsers communicate with each other using the [Hypertext Transfer Protocol](https://developer.mozilla.org/en-US/docs/Web/HTTP) (HTTP). Making HTTP a protocol which allows the fetching of resources (like HTML documents).

HTTP follows a classic [client-server model](https://en.wikipedia.org/wiki/Client%E2%80%93server_model), with a client opening a connection to make a request, then waiting until it receives a response. HTTP is a [stateless protocol](https://en.wikipedia.org/wiki/Stateless_protocol), meaning that the server does not keep any data (state) between requests.

When you are developing web applications, understanding and being able to test the behavior of HTTP requests is a task you cannot overlook.

## The API Development Hill and the Underdog

There are many tools out there for API development. Among them, [Postman](https://www.postman.com/) is perhaps the most popular and well-known. However, if you use Visual Studio Code, you should definitely try [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) instead of Postman. REST Client allows you to send HTTP requests and view their responses in Visual Studio Code directly.

Once the plugin is installed (so go ahead and install it [clicking here](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) if you haven't already), using it can be very simple and efficient for testing HTTP requests. For the purposes of this exercise we will be using [{JSON} Placeholder](https://jsonplaceholder.typicode.com/) a popular free fake API for testing and prototyping.

## REST Client

Create in your root directory a new _app.rest_ file where we will define a simple HTTP request:

```javascript
//Send Request
GET https://jsonplaceholder.typicode.com/posts
```

Once you prepared a request, by clicking the `Send Request` link above the request (which will appear if the file's language mode is HTTP), the REST Client will execute the HTTP request and the response from the server will open in the editor.

You can get granular if you check [Rest Client](<(https://marketplace.visualstudio.com/items?itemName=humao.rest-client)>)'s docs. In the spirit of keeping things simple, we will explore some tips around the minimum HTTP requests necessary to create a [Create, read, update and delete](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) (CRUD) application:

- `GET` requests a representation of the specified resource. This request should only retrieve data.
- `POST` used to submit an entity to the specified resource.
- `PUT` replaces all current representation of the target resource with the request payload.
- `DELETE` deletes the specified resource.

So to make your life easier, here are the things I'd recommend you try using REST Client for the development of your next application:

### GET Multiple Query Parameters / Create Multiple Requests

Even though you are able to write query string in the same _request line_. When you have multiple query parameters in a single request, writing all of them in the same line is difficult to read and modify.

Luckily, REST Client allows you to spread query parameters into multiple lines (one line, one query parameters), parsing the lines in immediately after the request line which starts with `?` and `&`, like:

```javascript
//Traditional way
GET https://jsonplaceholder.typicode.com/posts?userId=1&id=2

###

//REST Client's way
GET https://jsonplaceholder.typicode.com/posts
    ?userId=1
    &id=2
```

Not to overlook! Using three or more consecutive `#` as a delimiter, allows REST Client to recognize multiple requests for in a single file.

### POST, PUT & DELETE Request Headers

[HTTP Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) let the client and the server pass additional information with an HTTP request or response. The lines immediately after the _request line_ are parsed as _Request Headers_. You can use them by typing them in a `header-name: header-value` format. These come in handy when you need to set Content-Type or Authorization tokens for your requests. Here's an easy example using request headers for a `POST` HTTP request (same would apply for `PUT` and `DELETE`):

```javascript
POST https://jsonplaceholder.typicode.com/posts
content-type: application/json

{
    "title": "Ditching Postman for REST Client",
    "body": "My 44 year old wife rates this idea very nice :)",
    "userId": 777
}

```

### GET, POST, PUT & DELETE Using Variables

REST Client supports **file variables** defined by the user to use throughout the _.rest_ file. The definition syntax must be set as `@variableName = variableValue` which occupies a complete line. Keep in mind, a variable **MUST NOT** contain any spaces. As for the variable value, it can contain any characters or white spaces (leading and trailing white spaces will be trimmed).

File variables can be defined in a separate request block only filled with variable definitions, as well as define request variables before any request URL, which needs an extra blank line between variable definitions and request URL (I'd recommend the former more than the latter).

Here an easy example of setting up a variable for the baseURL used on a `DELETE` HTTP request:

```javascript
@baseUrl = https://jsonplaceholder.typicode.com

###

DELETE {{baseUrl}}/posts/50
```

Also, why not, let's use some variables to also set a defined `userId` for a `PUT` HTTP request and correct my non-existing wife's age:

```javascript
@baseUrl = https://jsonplaceholder.typicode.com
@userId = 777

###

PUT {{baseUrl}}/posts/100
content-type: application/json

{
    "title": "Ditching Postman for REST Client",
    "body": "My 24 year old wife rates this idea very nice :)",
    "userId": {{userId}}
}
```

Great thing is that, no matter where you defined your file variables, they can be referenced in any HTTP request. They also neatly display a reference count to let you know how many times the variable been used in the file.

## Why am I choosing REST Client

It's always good to have options. However, the main selling point for me was that REST Client does have the upper hand over Postman, given that requests are handily available at the root directory of your projects and can be distributed to everyone in the development team. This makes it easy to test your HTTP requests and ensure that your application development is progressively being made the right way. So give it a try, below you will find a link to a GitHub repository with all the example requests listed above. Download/Pull the repository, install REST Client and test it out.

[understandingRESTClient](https://github.com/ekqt/understandingRESTClient)

Thank you for reading and happy REST-ing!
