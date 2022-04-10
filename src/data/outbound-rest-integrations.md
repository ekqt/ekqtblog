# Outbound REST Integrations

How to create, test, and debug an outbound REST Message, Use _Preview Script Usage_ to create server-side JavaScript for invoking the outbound REST Message, and Write server-side JavaScript to parse data out of the response body.

**Note**: this content is own by ServiceNow. This is a transcript of the course **Outbound REST Integrations** for education purposes. Not intended for any commercial purpose.

## ServiceNow as a Web Consumer

Web services make it possible for applications to connect to other software applications over a network, allowing an exchange of information between the provider (server) and consumer (client).

A web service consumer (client) requests information from a web service provider (server). A web service provider processess the request and returns a status code and a response body. When the response body is returned, the web service consumer extracts information from the response body and takes action on the extracted data.

ServiceNow is able to consume web services from third party providers and other ServiceNow instances.

Third party web services can provide information such as:

- Geolocation coordinates
- Stock information
- Financial data
- Inventory
- Weather data
- Language translation

![ServiceNow](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_outbound_images_outbound_genericrequest.png)

## Outbound REST Message

ServiceNow stores details on how to interact with external web services through REST in a REST Message record. The REST Message record includes:

- Endpoint
- Authentication
- HTTP Headers
- HTTP Methods

Outbound REST Messages allow developers to test web services and view the response body.

Once an outbound REST Message is configured and tested, it can be invoked from any server-side script.

## Creating an Outbound REST Message

To create an outbound REST Message, use the _All_ menu to open **System Web Services > Outbound > REST Message** or add a _Rest Message_ application file in Studio.

![Rest Message Record](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_outbound_images_outbound_newrestmessage.png)

- **Name**: A descriptive name for the REST Message. This value is used when invoking the outbound REST Message from a script.
- **Endpoint**: The endpoint where this REST message is sent. The endpoint value may include variables using the format _\${variable}_.
- **Authentication type**: The type of authentication to use, if any, and the profile record that contains the user credentials. Outbound REST supports basic authentication and OAuth 2.0. The authentication configured here is inherited by the associated HTTP methods. You can configure authentication for each method which overrides any authentication setting at the message level.
- **Use mutual authentication**: Select to require both the web service provider and consumer to authenticate with each other before communicating. Outbound REST supports mutual authentication with basic authentication only.
- **HTTP Headers**: Double-click a row in the HTTP Headers embedded list to define the header _Name_ and _Value_. The web service provider determines which headers are supported or required. See [List of HTTP Header Fields](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields) for a list of HTTP header fields.

## Authenticating in an Outbound REST Message

Different web service providers may require different types of authentication. Outbound REST supports the following authentication formats:

- **No authentication**
- **Basic** authentication using a username and password
- **OAuth 2.0** using an OAuth provider and profile
- **Mutual Authentication**

### No Authentication

Some public web services distribute free information without authentication. For public web services that do not require authentication, set the _Authentication type_ field of your outbound REST message to **No authentication**.

![No Authentication](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_outbound_images_outbound_noauth.png)

### Basic

The _Basic_ authentication type passes a username and a password to the web service. For web services requiring _Basic_ authentication, set the _Authentication type_ field value of your outbound REST message to **Basic**, then select a _Basic auth profile_.

![Basic Authentication](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_outbound_images_outbound_basicauth.png)

A **Basic auth profile** consists of a _Name_, _Username_, and _Password_.

![Basic Auth Configuration](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_outbound_images_outbound_basicauthprofile.png)

Type `sys_auth_profile_basic.list` into the _Filter_ field in the _All_ menu to edit or create a new _Basic auth profile_.

### OAuth

OAuth is an Internet standard that provides users with access to APIs without giving them a password. See the [How to setup OAuth2 authentication for RESTMessageV2 integrations](https://community.servicenow.com/community?id=community_blog&sys_id=a1fce2a5dbd0dbc01dcaf3231f961939) blog post for information on setting up OAuth.

### Mutual Autentication

Mutual authentication requires the web service provider and consumer to authenticate with each other before communicating. Mutual authentication is a protocole/socket-level authentication compared to other authentication options, which are application-level authentications. Mutual authentication can be used in conjunction with other authentication mechanisms. To enable mutual authentication, select the **Use mutual authentication** option then select a _Mutual authentication profile_.

![Using Mutual Authentication](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_outbound_images_outbound_mutualauth.png)

To define a [Mutual authentication profile](https://docs.servicenow.com/bundle/sandiego-application-development/page/integrate/outbound-web-services/task/t_CreateAProtocolProfile.html), use the _All_ menu to open **System Security > Protocol Profiles**.

This option is not available for web services that use a MID server.

## HTTP Methods

HTTP methods define the action to take for a resource, such as retrieving information or updating a record. When a new _REST Message_ is saved for the first time, ServiceNow creates an HTTP Method based on information in the _REST Message_.

![Default GET Method](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_outbound_images_outbound_defaultget.png)

Click the HTTP Method name to open the method for editing or click the **New** button to create an HTTP Method. The available HTTP Methods are:

- _GET_
- _POST_
- _PUT_
- _PATCH_
- _DELETE_

## Method Endpoint

To configure the HTTP method endpoint, refer to the web service provider's API documentation. For example, the IEX Cloud API reference provides the base URL for the API:

![API Reference](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_outbound_images_outbound_iexendpointdoc.png)

For the iextrading.com Quote API, the documentation provides the syntax:

![API Reference](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_outbound_images_outbound_quotesyntax.png)

The make the outbound REST Message more useful, instead of hard-coding the company symbol into the endpoint, make the symbol dynamic. Enclose dynamic pieces of endpoints in \${}.

![Dynamic Endpoint Variables](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_outbound_images_outbound_quoteendpoint.png)

## Method Authentication and HTTP Request

### Authentication

In the default case, _HTTP Methods_ inherit authentication settings from the outbound REST Message (parent). Change the authentication type if it differs from the parent's authentication. The authentication fields for the method are the same as for the outbound REST Message.

![Default Inherit from parent](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_outbound_images_outbound_methodauth.png)

### HTTP Request - MID Server

If the web service to be consumed is on an internal company network and not accessible using the Internet, use a [MID Server](https://docs.servicenow.com/bundle/sandiego-servicenow-platform/page/product/mid-server/concept/mid-server-landing.html) to connect to the web service. Select the MID server in the _Use MID Server_ field.

### HTTP Request - HTTP Headers

Double-click the text \*_Insert a new row..._ in the _HTTP Headers_ embedded list to define the _Name_ and _Value_ for a header. The web service provider determines which headers are supported or required. See [List of HTTP header fields](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields) for a list of HTTP header

### HTTP Request - HTTP Query Parameters

To define an *HTTP Query Parameter**, double-click the text **Insert a new row...\*\* and provide a *Name* and *Value\* for the parameter. Refer to the API's documentation to see which parameters to define. For example, the IEX Cloud site defines an optional query parameter for the Quote API.

![Query Parameters](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_outbound_images_outbound_quoteparam.png)

The IEX Cloud site also requires a free token to be used for API requests. The token is passed as a query parameter.

![Token as a Query Parameter](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_outbound_images_outbound_tokendoc.png)

Add the query parameters to the endpoint.

![Query Parameters in the endpoint](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_outbound_images_outbound_displaypercent.png)

HTTP Query Parameters are appended to the endpoint at runtime. The syntax is _endpoint_ + _?_ + _query_ parameter.

![Query Parameter Syntax](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_outbound_images_outbound_queryparam.png)

## Testing HTTP Methods

After configuring an HTTP method for an outbound REST message, test it to ensure the request is valid and the response returns as expected.

### Variable Substitutions

Variables defined in the HTTP method must have variables in order to test. Click the **Auto-generate variables** related link to automatically add variables to the _Variable Substitution_ list. For variables not automatically added to the _Variable Substitutions_ list, click the **New** button to manually define variables.

![Varabiale Substitutions](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_outbound_images_outbound_variablesubs.png)

- **Name**: Name of the variable. Must be an exact match to the variable name in the HTTP method.
- **Escape type**: Options to escape special characters. If the data sent contains special characters, such as the | (pip character), then set the _Escape type_ to _Escape XML_.
- **Test value**: Value to use for the variable when testing.

### Running the Test

To test the HTTP method, click the **Test** related link.

![Test Related Link](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_outbound_images_outbound_testlink.png)

The test results are available in the _Test Runs_ related list.

![Test Runs](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_outbound_images_outbound_testresults.png)

Examine the _Response_ to make sure the expected data was received.

**NOTE**: The _Http Status_ indicates the state of the transaction and _is not_ and indication that the desired response was received.

## Debugging HTTP Methods

The first place to look when debugging REST HTTP methods is the test results page. In the example shown, the _HTTP status_ returned a _404_ which indicates that the endpoint was not found. The _Response_ gives further information about the source of the error.

![Test Error](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_outbound_images_outbound_testerror.png)

### Outbound HTTP Requests System Log

If more in-depth debugging is required, use the Outbound HTTP Requests system log. Begin by setting the amount of information to be included in the log. Click the **Set HTTP Log level** Related Link in the HTTP method definition to specify a logging level.

- **Basic**: least amount of debugging information
- **Elevated**: more debugging information
- **All**: most debugging information

![HTTP Log levels](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_outbound_images_outbound_loglevels.png)

After setting the log level, test again to generated the log.

Use the _All_ menu to open **System Logs > Outbound HTTP Requests**.

### Basic

![Basic](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_outbound_images_outbound_basic.png)

### Elevated

![Elevated](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_outbound_images_outbound_elevated.png)

### All

![All](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_outbound_images_outbound_all.png)

Although the example shows the _Request_ tab, the other tabs may be more useful depending on what is being debugged.

## Preview Script Usage

In most cases, it is impractical to use the _Test_ Related link in the Outbound REST Message methods to invoke the API. After configuring an HTTP method and verifying it works as expected, the final development step is to execute the method from a server-side script.

The _Preview Script Usage_ Related Link generates a server-side JavaScript code stub to invoke the API.

![Preview Script Usage](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_outbound_images_outbound_previewscriptcodestub.png)

The [RestMessageV2 API](https://developer.servicenow.com/app.do#!/api_doc?v=sandiego&id=c_RESTMessageV2API) sends outbound REST messages using JavaScript.

In the sample script, the _.setStringParameterNoEscape_ method is passed using the parameter name and a hard-coded value. When implementing the script, the value for the parameters is typically set dynamically. For example:

```javascript
r.setStringParameterNoEscape("symbol", current.company_ticket);
```

The syntax `sn_ws.RESTMessageV2()` in the sample script expreses _RESTMessageV2_ the same way other server-side scripts in ServiceNow express the GlideRecord class, but with an exception. The _GlideRecord_ class is part of the ServiceNow global namespace and does not need to have its namespace qualified in the script.

```javascript
var myObj = new GlideRecord("table_name");
```

The _RestMessageV2_ API is part of the _sn_ws_ (Web Service) namespace. Although its methods are accesible to all scopes, attempting to express _RESTMessageV2_ without adding the namespace to the beginning would return an error because the API would not be found in the global namespace. Adding the namespace to the beginning tells ServiceNow where to find the API.

## Parsing Data from the Response

The sample script from the _Preview Script Usage_ page has code to get the body of the response and the HTTP status code.

```javascript
var response = r.execute();
var responseBody = response.getBody();
var httpStatus = response.getStatusCode();
```

The _Preview Script Usage_ script does not include sample code to extract data from the response. The `responseBody` variable contains the response as a string. Use Javascript string methods such as `substring()`, `substr()`, or `indexOf()`, to extract data from the `responseBody` variable.

### JSON

When working with a json response, use the [JSON API](https://developer.servicenow.com/dev.do#!/reference/api/sandiego/server_legacy/c_JSONAPI), which converts a JSON formatted string to a JavaScript object. When working in the Global scope, the following methods are available:

- _decode_ (deprecated)
- _encode_ (deprecated)
- _parse_
- _stringify_

```javascript
(function executeRule(current, previous) /*null when async*/) {
  try {
    var r = new sn_ws.RESTMessageV2('StockQuote', 'Default GET');
    r.setStringParameterNoEscape('symbol', current.stock_symbol);

    var response = r.execute();
    var responseBody = response.getBody();
    var httpStatus = response.getStatusCode();
    gs.info("Status = " + httpStatus);
    gs.info("Response body = " + responseBody);

    // Convert the JSON formatted string to a JavaScript Object
    var responseObj = JSON.parse(responseBody);
    // Log the latest price property value from the responseObj
    gs.info("Latest price = " + responseObj.latestPrice);
  }
  catch (ex) {
    var message = ex.message;
  }
}
```

When working in privately-scoped applications, the following methods are available:

- _parse_
- _stringify_

See the [JSON API documentation](https://developer.servicenow.com/dev.do#!/reference/api/sandiego/server_legacy/c_JSONAPI) for additional examples of how to use these methods.

### XML

When working with an XML response in privately-scoped applications, use the [XMLDocument2 API](https://developer.servicenow.com/dev.do#!/reference/api/sandiego/server/no-namespace/c_XMLDocument2ScopedAPI) to extract data from the response body.

```javascript
var response = r.execute();
var responseBody = response.getBody();
var httpStatus = response.getStatusCode();
gs.info("Status = " + httpStatus);
gs.info("Response body = " + responseBody);

// IMPORTANT: This example shows what the script MIGHT look like if
// responseBody were an XML formatted string.

// Create an XMLDocument2 object
var xmlDoc = new XMLDocument2();
// Read the responseBody XML string into the XMLDocument2
xmldoc.parseXML(responseBody);
// Log the value of the latestPrice XML node
gs.info(xmlDoc.getNodeText("//latestPrice"));
```

**NOTE**: The XML example shown is for demonstration purposes. It is not based on real data from the IEX Cloud API.

**DEVELOPER TIP**: Business Rules that invoke a web service **must be async**.

## Scripting REST Messages

In the typical outbound integration case, developers define an Outbound REST Message as demonstrated in this module. The benefit of Outbound REST Messages is that they allow an API interaction to be configured, tested, and debugged using a form-based UI.

Some developers prefer to script the entire integration without creating an Outbound REST Message. The script shown defines an interaction with the [iextrading.com](https://iextrading.com/developers/docs/) Stock Quote API without using an Outbound REST Message:

```javascript
// Create an empty RESTMessageV2 object
var getQuote = new sn_ws.RESTMessageV2();
// Set the endpoint
getQuote.setEndpoint("http://cloud.iexapiscom/v1/stock/${symbol}/quote");
// Set the HTTP method(get post, put, patch, delete);
getQuote.setHttpMethod("get");
// Set HTTP Query Parameters
getQuote.setQueryParameter("displayPercent", "true");
getQuote.setQueryParameter("token", "INSERT_TOKEN_HERE");
// Set values for endpoint variables
getQuote.setStringParameterNoEscape("symbol", current.short_description);
```

Other useful methods to script REST integrations in the _RESTMessageV2_ API include:

- `setRequestHeader()`
- `setLogLevel()`
- `setStringParameter()`
- `setRequestorProfile()`
- `setMutualAuth()`

See the [RESTMessageV2 API Documentation](https://developer.servicenow.com/dev.do#!/reference/api/sandiego/server/sn_ws-namespace/c_RESTMessageV2API?navFilter=RESTMessageV2) for the complete list of methods.

## Outbound Integrations Module Recap

Core concepts:

- Use Outbound REST Messages to define, test, and debug interactions with third-party web service providers
- HTTP methods include:
  - Endpoint
  - HTTP verb(get, post, put, patch, delete)
  - HTTP Headers
  - MID server selection
  - HTTP Query Parameters
  - Authentication

* Create _Variable Substitutions_ before using the _Test_ Related Link

* Examine test results carefully

  - _HTTP Status 200_ does not mean the expected data was returned
  - Examine the _Response_ to see if the expected data and format were received

* Use the _Set HTTP Log Level_ Related Link to change the log level

  - Choose from _Basic_, _Elevated_, or _All_
  - The default log level is _Basic_
  - Use the Outbound HTTP Requests log to view debugging information

* The _Preview Script Usage_ Related Link creates a JavaScript code stub for interacting within the web service provider from a server-side script

  - When possible make the `setStringParameter()` variables dynamic instead of hard-coded
  - Add script logic to extract information of interest from the REST response
    - JavaScript string methods
    - `JSON.parse()`
    - XMLDocument2 methods.
  - May need to modify the script logic from the catch block

* Use the _RestMessageV2_ API to script the REST interaction with a third party web service provider without first defining an outbound REST Message
