# Scripted REST APIs

How to: (a) Create a Scripted REST API, (b) Create a Scripted REST API Resource, (c) Enable Scripted REST API versioning, and (d) View API metrics on the _Usage by WEB API_ dashboard.

**IMPORTANT**: This module assumes familiarity with [Inbound REST Integrations](https://developer.servicenow.com/dev.do#!/learn/courses/sandiego/app_store_learnv2_rest_sandiego_rest_integrations/app_store_learnv2_rest_sandiego_inbound_rest_integrations/app_store_learnv2_rest_sandiego_inbound_rest_integrations_in_servicenow_objectives), including the REST API Explorer.

Note: this content is own by ServiceNow. This is a transcript of the course Scripted REST APIs for education purposes. Not intended for any commercial purpose.

## What are Scripted Web Services?

[ServiceNow provides APIs](https://docs.servicenow.com/bundle/sandiego-application-development/page/build/applications/concept/api-rest.html?_ga=2.17340347.343698899.1574692007-477157877.1570480535) which make it easy for developers to request information from ServiceNow in third-party applications or from other ServiceNow instances. In many cases, the ServiceNow APIs provide the methods developres need for their integrations. In other cases, custom APIs are required. Scripted REST Services allow developers to create their own APIs on the Now Platform.

## Creating Scripted REST APIs

To create a Scripted REST API using the main ServiceNow browser window, use the _All_ menu to open **Sysbtem Web Services > Scripted Web Services > Scripted REST APIs**. Click the **New** button.

Configure the _Scripted REST Service_ record.

![Scripted REST Service](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_scripted_images_scriptws_createapi.png)

- **Name**: Web service name.
- **API ID**: Used as part of the API path when the API is invoked. ServiceNow constructs a default value for this field based on the value in the _Name_ field. Developers can change the default value. Do not use spaces and avoid special characters other than the underscore (\_).

Scripted REST APIs do not take actions. They are containers than contain resources. Resources are the actions third-party applications invoke.

## Security, Content Negotiation, and Documentation

The _Security_, _Content Negotiation_, and _Documentation_ sections are available after saving a Scripted REST API for the first time.

### Security

A Scripted REST API may require users to pass an Access Control check. A requesting user must satisfy at least one of the Access Controls. It is not necessary to satisfy all selected Access Controls. A default Access Control, _Scripted REST External Default_, is applied to all new Scripted REST APIs. Developers can remove the default and/or add Access Controls of their choice. Click the **Unlock** button to modify the Default ACLs field value.

![Security](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_scripted_images_scriptws_securitysection.png)

Access Controls for Scripted REST APIs have the Access Control type **REST_Endpoint**.

The default Access Control denies access to the Scripted REST API to any user with the _snc_external_ role.

![Access Control](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_scripted_images_scriptws_defaultaccesscontrol.png)

### Content Negotiation

The _Content Negotiation_ section defines the supported request and response formats. The default for the request and response is to allow:

- _application/json_
- _application/xml_
- _text/xml_

To change the list of supported formats, click the _Override default supported request formats_ option or the _Override default supported response formats_ option.

![Content Negotiation](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_scripted_images_scriptws_contentnegotiation.png)

### Documentation

Use the _Documentation_ section to direct users to the Scripted REST API documentation. When the API is selected in the REST API Explorer, the _Short description_ field value is displayed at the top of the form. Users access the documentation link from the _REST API Explorer menu_.

![Documentation](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_scripted_images_scriptws_docsfields.png)

**DEVELOPER TIP**: Provide a meaningful description of the API's function in the Short description field to help other developers understand the purpose of the API.

## Request Headers and Query Parameters

### Request Header

A REST request header contains parameters (metadata) that define the HTTP(S) interaction. Commonly used REST headers include:

- _Authorization_
- _Accept_
- _Content-type_

See [List of HTTP Header Fields](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields)

In the _Request Headers_ related list, click the **New** button to add a request header to the API.

![Scripted REST Header](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_scripted_images_scriptws_newheader.png)

- **Header name**: HTTP header field name.
- **API definition**: API the header is part of.
- **Short description**: Description of what information should be passed in the header.
- **Example value**: Sample of the data to be passed to demonstrate how to use the header.

Request headers can also be defined in resources.

### Query Parameters

Query parameters control what information deveopers using the API can pass in the API request URL. In the _Query Parameters_ related list, click the **New** button to create a parameter.

![Scripted REST Query Parameter](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_scripted_images_scriptws_newquery.png)

- **Query parameter name**: Name of the parameter. By convention, query parameters are lowercase and use underscores in place of spaces. Many query parameters in baseline ServiceNow Scripted REST APIs start with the string \_sysparm\_\_.
- **API definition**: API the query is part of.
- **Short description**: Description of what information should be passed in the query.
- **Example value**: A sample of the data to be passed to demonstrate how to use the query.

After configuring a query parameter, set the _Is required_ value in the _Query Parameters_ related list. The default value is _false_. Set the value to _true_ if the query parameter is mandatory.

![Is Required](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_scripted_images_scriptws_isrequired.png)

Query parameters can also be defined in resources.

## Scripted REST API Resources

A REST API is a collection of REST resources. REST resources are unique data representation that have at least one URI. Resources are typically a set of related information, such as a record, changes to a record, or calculations based on records. An HTTP method defines each resource:

- _GET_
- _POST_
- _PUT_
- _PATCH_
- _DELETE_

### Creating Resources

In the Scripted REST API record, open the **Resources** related list. Click the **New** button, then configure the resource.

![Scripted REST Resource](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_scripted_images_scriptws_newresource.png)

- _Name_: Name of the resource. By convention, resource names are lowercase with underscores (\_) instead of spaces.
- _HTTP method_: Select _GET_, _PUT_, _POST_, _PATCH_, or _DELETE_.
- _Relative path_: Specify the unique part of the URI. The relative path is appended to the _Base API path_. Enclose path parameters in {}. Users pass values for path parameters in the service's URL.

The Resource path field displays after the new record is saved for the first time. The _Resource path_ is the _Base API path_ linked with the _Relative path_.

![Resource path](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_scripted_images_scriptws_resourcepath.png)

## Resource Security, Content, and Documentation

Resources can override settings inherited from the Scripted REST API.

### Security

By default, resources require authentication. To disable authentication, de-select (uncheck) the **Requires authentication** option. To disable the Access Control check, de-select (uncheck) the **Requires ACL authorization** option.

![Security](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_scripted_images_scriptws_resourcesecurity.png)

**DEVELOPER TIP**: If multiple Access Controls are listed, requesting users must satisfy at least one of the Access Controls. It is not necessary to satisfy all of them.

### Content Negotiation

Resource request format is inherited from the Scripted REST API and cannot be overwritten. To change allowed response formats, select the **Override supported response formats** option then list the formats in the _Supported response formats_ field.

![Supported response formats](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_scripted_images_scriptws_responseformats.png)

### Documentation

The _Short description_ field value appears in the REST API Explorer when the resource is selected. Use this field to provide useful information to developers using the resource.

![Documentation](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_scripted_images_scriptws_resourcedoc.png)

## Resource Request Header and Query Parameter Associations

Request headers and query parameters are defined in the Scripted REST API and associated with resources in the resource definition.

### Request Header Associations

To associate a request header, scroll to the _Request Header Associations_ related list. Click the **New** button. Use the _API request header_ field _Search_ to select a request header to associate with the resource.

![Request Header Associations](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_scripted_images_scriptws_assocheader.png)

Click the **New** button in the _Scripted REST Headers_ window to create a new request header.

### Query Parameter Associations

To associate a query parameter, scroll to the _Query Parameter Associations_ related list. Click the **New** button. Use the _API query parameter_ field _Search_ button to select a query parameter to associate with the resource.

![Query Parameter Associations](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_scripted_images_scriptws_parameterassoc.png)

Click the **New** button in the _Scripted REST Query Parameters_ window to create a new query parameter.

## Resource Script

A resource script is a server-side Javascript that creates and populates properties on the response object. The response object is returned to the application that invoked the resource.

The resource _Script_ field contains a script template. The template's process function, known as a self-invoking or immediately invoked function expression, is automatically invoked when a resource is accessed. The request and response objects, which are passed to the process function, are automatically created.

![Resource Script](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_scripted_images_scriptws_resourcescript.png)

Developers add server-side JavaScript to the template after the comment.

## Resource Script - RestAPIRequest

The _RESTAPIRequest API_ allows developers to access data from the request. The _request_ object is automatically instantiated from the _RESTAPIRequest_ class and passed to the process function in the Scripted REST API script.

The properties of the request object are:

- _body_
- _pathParams_
- _queryParams_
- _queryString_
- _uri_
- _url_
- _headers_
- _getHeader()_
- _getSupportedResponseContentTypes()_

### Body

The [body](https://developer.servicenow.com/app.do#!/api_doc?v=sandiego&id=r_RESTAPIRequest_body) object provides access to the request body.

```javascript
//get instance of RESTAPIRequestBody
var requestBody = request.body;
```

### pathParams

The [pathParams]() object allows script access to the path parameters passed in the request URL. The available path parameters are determined by the Scripted REST Service resources. The _userinfo_ resource URL from the _Demo Service_ is: `https://<instance>/api/<namespace>/demo_service/userinfo/{user_id}`.

The path parameters are passed in when the service in invoked.

![Path parameters](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_scripted_images_scriptws_pathparam.png)

```javascript
//get pathParams object
var pathparams = request.pathParams;
// get user_id property value from pathparams object
var userID = pathparams.user_id;
```

The value of the _pathparams.user_id_ property after the example script executes is the same as the value passed in the URL.

### queryParams

The [queryParams](https://developer.servicenow.com/app.do#!/api_doc?v=sandiego&id=r_RESTAPIRequest_queryParams) object allows script access to the query parameters from the web service request. The Demo Service query parameter is _demo_query_. The _Demo Service_ URL is: `https://<instance_rest_endpoint>/?demo_query=active%3Dtrue`.

The _demo_query_ parameter value is passed in when the service is invoked.

```javascript
//get queryParams object
var queryparams = request.queryParams;
//value of myQueryParam is active=true
var myQueryParam = queryparams.demo_query;
```

The value of the _myQueryParam_ variable after the example script executes is _active=true_.

### queryString

The [queryString](https://developer.servicenow.com/app.do#!/api_doc?v=sandiego&id=r_RESTAPIRequest_queryString) string contains the entire query added to the endpoint URI. The _Demo Service_ URL is: `https://<instance>/api/<namespace>/demo_service/userinfo/5137153cc611227c000bbd1bd8cd2005d?demo_query=active%3Dtrue`.

The query string is part of the URL.

```javascript
//get the query string
//value of query is demo_query=active%3Dtrue
var query = request.queryString;
```

The value of the _query_ variable after the example script executes is _demo_query=active%3Dtrue_.

### uri

The [uri](https://developer.servicenow.com/app.do#!/api_doc?v=sandiego&id=r_RESTAPIRequest_uri) string contains the request URI, excluding domain information. The _userinfo_ resource URL from the _Demo Service_ is: `https://<instance>/api/<namespace>/demo_service/userinfo/{user_id}`.

The URI does not include the query parameters.

```javascript
//get the uri string
//value of query is /api/<namespace>/demo_service/userinfo/5137153cc611227c000bbd1bd8cd2005d
var query = request.uri;
```

The value of the query variable after the example script executes is _/api/187049/demo_service/userinfo/5137153cc611227c000bbd1bd8cd2005d_.

### url

The [url](https://developer.servicenow.com/app.do#!/api_doc?v=sandiego&id=r_RESTAPIRequest_url) string contains the entire request URL.

```javascript
//get the url string
//returns https://instance/api/<namespace>/demo_service/userinfo/5137153cc611227c000bbd1bd8cd2005d
var query = request.url;
```

The value of the _query_ variable after the script executes is the complete URL.

### headers

The [headers](https://developer.servicenow.com/app.do#!/api_doc?v=sandiego&id=r_RESTAPIRequest_headers) object contains all the headers property value pairs from the request.

```javascript
//get the headers from the request
var headers = request.headers;
//get the value of the Accept property
var acceptHeader = headers.accept;
```

The properties of the _request.headers_ object can be different for different APIs. The _request.headers_ properties for the _Demo Service_ API include accept, from, and content-type. Notice that all _request.headers_ property names are lowercase even if defined in the API using uppercase characters. The script used to log the _request.headers_ property also logged the data type. Notice that all properties are strings.

![Request Headers](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_scripted_images_scriptws_headerproperties.png)

### getHeader()

The [getHeader](https://developer.servicenow.com/app.do#!/api_doc?v=sandiego&id=r_RESTAPIRequest-geviceRequestHeader_String) method returns a string containing the value of a specific header from the web service request.

```javascript
//get the headers from the request
var headers = request.headers;
//get the value of the from header
var fromHeader = headers.getHeader("from");
```

### getSupportedResponseContentTypes()

The [getSupportedResponseContentTypes](https://developer.servicenow.com/app.do#!/api_doc?v=sandiego&id=r_SSR-getSupportedRespContentTypes) method returns an array of string values where each string is a content type, such as application/json.

```javascript
var contentTypes = [];
contentTypes = request.getSupportedResponseContentTypes();
for (i = 0; i < contentTypes.length; i++) {
  gs.info("content type [" + i + "] = " + contentTypes[i]);
}
```

The _contentTypes_ array has one element for the _Demo Service_.

## Resource Script - RESTAPIRequestBody

The _RESTAPIRequestBody_ API allows developers to access the body content of a scripted REST API request. The _request.body_ object is instantiated automatically.

To see the properties of the _request.body_ object, in the resource _Script_ field, type **request.body**.

The properties automatically display. Use the keyboard up and down arrow keys to see a description of the highlighted property.

![Properties of Request Body](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_scripted_images_scriptws_hover.png)

Icons in the properties list identify the data type of the property:

- **O**: object
- **S**: string
- **F**: function

The _RESTAPIRequestBody_ API includes:

- **data**: The request body content as a single object or array of objects.
- **dataStream**: The content of the request body as a stream.
- **dataString**: The content of the request body as a string.
- **hasNext()**: Returns _true_ if the request body contains another entry.
- **nextEntry()**: Retrieves one entry from the request body as a _script_ object.

View sample request bodies in the [RESTAPIRequestBody API documentation](https://developer.servicenow.com/app.do#!/api_doc?v=sandiego&id=c_RESTAPIRequestBody).

## Resource Script - RESTAPIResponse

The _RESTAPIResponse_ API allows developers to build a response to a scripted REST API request. The _response_ object is instantiated automatically.

The _RESTAPIResponse_ API includes:

- **getStreamWriter()**: The _ResponseStreamWriter_ for the response. Use this object to write directly to the response stream.
- **setBody()**: Creates the response body, as a JavaScript object. The body content is automatically serialized to JSON or XML depending on the value of the _Accept_ header, passed in the request.
- **setContentType()**: Assignes a value, such as _application/json_, to the _Content-Type_ header in the web service response.
- **setError()**: Sets the properties of the response error object when an error is returned.
- **setHeader()**: Assigns a value to a REST service response header.
- **setHeaders()**: Sets the headers for the web service response.
- **setLocation()**: Assigns a value to the _Location_ header in the web service response. See the [W3 Location header documentation](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.30) for more information about this header.
- **setStatus()**: Sets the status code to send in the response, such as _200_ to indicate success.

The [RESTAPIResponse API documentation]() includes sample scripts of the API's methods.

**DEVELOPER TIP**: To write directly to the scripted REST API response stream instead of using the _RESTAPIResponse_ API, use the [RESTAPIResponseStream API](https://developer.servicenow.com/app.do#!/api_doc?v=sandiego&id=c_RESTAPIResponseStream).

## Example Resource Script

ServiceNow provides an _Aggregate API_ that is used to compute aggregate statistics about existing table and column data. In the use case demonstrated in this module, three aggregations are required:

- _Incident_ table records where the _user_id_ is the _Caller_.
- _Change request_ table records where the _user_id_ is the _Requested by_.
- _Problem_ table records where the _user_id_ is the _Opened by_.

Instead of making three calls to the _Aggregate API_, a Scripted REST API performs the aggregations and returns the aggregations in a single response object.

![Scripted REST API](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_scripted_images_scriptws_onecallnotthree.png)

```javascript
(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
  // implement resource here

  // Get value from the user_id path parameter passed in the URL
  var requestUser = request.pathParams.user_id;
  // Get value of the demo_query query parameter passed in the URL
  var requestDemoQuery = request.queryParams.demo_query;

  // Query the sys_user table to get the user record for the user passed in
  // the user_id path parameter
  var requestUserName = new GlideRecord("sys_user");
  requestUserName.get(requestUser);

  // Aggregation 1: Incident table
  // Get the count of Incident table records where the user from the user_id path
  // parameter is the Caller.
  var userIncidentCount = new GlideAggregate("incident");
  userIncidentCount.addAggregate("COUNT");
  userIncidentCount.addQuery("caller_id", requestUser);
  userIncidentCount.addEncodedQuery(requestDemoQuery);
  userIncidentCount.query();

  var incidents = 0;
  if (userIncidentCount.next()) {
    incidents = userIncidentCount.getAggregate("COUNT");
  }

  // Aggregation 2: Change request table
  // Get the count of Change request table records where the user from the user_id path
  // parameter is the Requested by.
  var userChangeCount = new GlideAggregate("change_request");
  userChangeCount.addAggregate("COUNT");
  userChangeCount.addQuery("requested_by", requestUser);
  userChangeCount.addEncodedQuery(requestDemoQuery);
  userChangeCount.query();

  var changes = 0;
  if (userChangeCount.next()) {
    changes = userChangeCount.getAggregate("COUNT");
  }

  // Aggregation 3: Problem table
  // Get the count of Problem table records where the user from the user_id path
  // parameter is the Opened by.
  var userProblemCount = new GlideAggregate("problem");
  userProblemCount.addAggregate("COUNT");
  userProblemCount.addQuery("opened_by", requestUser);
  userProblemCount.addEncodedQuery(requestDemoQuery);
  userProblemCount.query();

  var problems = 0;
  if (userProblemCount.next()) {
    problems = userProblemCount.getAggregate("COUNT");
  }

  //Create a body object.  Add property value pairs to the body.
  var body = {};
  body.numInc = incidents;
  body.numChg = changes;
  body.numPrb = problems;
  body.user = {
    "User name": requestUserName.user_name,
    "User ID": requestUser
  };

  // Send the response object, which is returned to the requestor, to the body object.
  response.setBody(body);
})(request, response);
```

The response body contains the number of incidents, changes, and problems, as well as the _User name_ and _User ID_.

![Response body](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_scripted_images_scriptws_exampleresponse.png)

### Some Things to Remember about Resource Scripts

- The _process_ function is self-invoking.
- The _request_ and _response_ objects are automatically instantiated.
- Access controls apply to Scripted REST APIs. The user making the request through the API's authentication must have access to the requested information.

## Scripted REST API Error Objects

To assist API users in debugging problems, use an error object to report information about the error to the API's consumers. ServiceNow has two strategies for errors:

- Use a predefined _error_ object
- Create a custom _error_ object

In both cases, the _error_ object must be instantiated from the _sn_ws_err_ namespace.

### Predefined Error Objects

Predefined _error_ objects send information to the consumer using standard HTTP status codes. Pass an error message to send a custom message.

- **BadRequestError (400)**: Error in the request, such as incorrect syntax.
- **NotFoundError (404)**: Requested resource is not available.
- **NotAcceptableError (406)**: The Accept header value is not allowed.
- **ConflictError (409)**: There is a conflict in the request.
- **UnsupportedMediaTypeError (415)**: The requested media type is not supported.

For example, send a _NotFoundError_ object to the consumer:

```javascript
(function run(request, response) {
  // Resource is not available
  return new sn_ws_err.NotFoundError(
    "The resource you requested is not part of the API."
  );
})(request, response);
```

**DEVELOPER TIP**: It is not required to send a message with the _error_ object, but users of your API will appreciate it if you do!

The predefined error is returned in the response body.

![Predefined error message](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_scripted_images_scriptws_404error.png)

### Custom Error Objects

User the _ServiceError_ object to define custom errors. The _ServiceError_ methods are:

- `setStatus(number)`: HTTP Status Code for the error (default: 500);
- `setMessage(string)`: Short error message to send (default: '');
- `setDetail(string)`: Detailed error message (default: '');

```javascript
(function run(request, response) {
  var myError = new sn_ws_err.ServiceError();
  myError.setStatus(442);
  myError.setMessage("Invalid value in path parameter");
  myError.setDetail(
    "We recognized the path parameter you sent, but the value you requested does not exist in the database."
  );
  return myError;
})(request, response);
```

The custom error is returned in the response body.

![Custom error message](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_scripted_images_scriptws_442error.png)

## API Versions

In the default case, API versioning is disabled. Enabling versioning allows developers to test and deploy changes without impacting existing integrations from web service consumers.

### Enabling Versioning

Versioning is enabled at the API level and is applied to all API Resources. To enable versioning, click the **Enable versioning** related link in the Scripted REST API.

![Related Link for Enabling Versioning](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_scripted_images_scriptws_enableversioninglink.png)

When versioning is enabled, Resource URLs contain a version number. To prevent breaking existing integrations when enabling versioning, make version v1 the default.

![Enable versioning with V1 as default](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_scripted_images_scriptws_v1default.png)

The _Resources_ list contains an _API version_ column and the version number is added to the _Resource path_.

![Resources](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_scripted_images_scriptws_versionon.png)

**NOTE**: Once versioning is enabled, it cannot be disabled.

### Creating a New Version

To add a new version to an API, click the **Add new version** related link. The _Add new version_ dialog opens.

![Add new version](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_scripted_images_scriptws_addnewversiondialog.png)

To make the new version the default, click the **Make this version the default check box**. In most cases, do not make a new version the default until development is complete and the new version is completely tested.

To copy resources from an existing version, select a version in the _Copy existing resources from version_ choice list.

When editing resources, select the version to edit.

![Resources to edit](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_scripted_images_scriptws_editcorrectversion.png)

when testing in the REST API Explorer, set the _API Version_ to the version to test.

![REST API Explorer](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_scripted_images_scriptws_raeselectversion.png)

**DEVELOPER TIP**: Document any changes between versions in custom Scripted REST APIs. Update the method definition and the full documentation access from the REST API Explorer menu.

## API Analytics

The _Usage by WEB API_ dashboard displays analytic data on a per API basis. Developers can view:

- _API Usage by Resource (Last 30 days)_
- _API Usage by Method (Daily)_
- _REST API Usage by Version (Daily)_
- _API Usage (Monthly)_

To view the Dashborad for an API, use the _All_ menu to open **Performance Analytics > Dashborads**. Select **All**, then use the _Search dashboard_ field to look for **Usage by WEB API**. Open the Dashboard then select the desired API from the choice list or click the **API analytics** Related Link in the API record.

Use the dashboard to monitor requests to the API.

![API Analytics Dashboard](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_scripted_images_scriptws_apidashboard.png)

## Scripted REST APIs Module Recap

Core concepts:

- Scripted REST APIs allow developers to create APIs that allow other applications to exchange information with their app

- Scripted REST APIs define:

  - Query parameters
  - API documentation
  - Request headers
  - Response and request types
  - Resources

- Resources are defined in a Scripted REST API and consist of:

  - HTTP method (Relative path including path parameters)
  - Resource path
  - Security
  - Allowed response format type
  - Resource documentation
  - Request header associations
  - Query parameter associations
  - Script

- In resource scripts:
  - The request and response objects are instantiated automatically
  - The APIs for scripting resources are: RESTAPIRequest, RESTAPIRequestBody, RESTAPIResponse, and RESTAPIResponseStream
  - The process function is self-invoking
  - The body object can be populated to return data to the application using the resource
  - Developers have access to the headers, query parameters, and path parameters

* error objects help Scripted REST API consumers determine what went wrong

  - All error objects are created in the sn_ws_err namespace
  - error objects can be pre-defined or custom
  - error objects are returned in the response body and include an HTTP status code

* API versioning allows updating APIs without breaking existing integrations

  - Set a default version
  - Create documentation for each version of the API
  - Once enabled, versioning cannot be disabled
  - Version numbers are part of the resource path

* The Usage by WEB API dashboard allows developers to view analytics for their APIs

  - API Usage by Resource (Last 30 Days)
  - API Usage by Method (Daily)
  - REST API Usage by Version (Daily)
  - API Usage (Monthly)

* Use the REST API Explorer or a third party application (for example, Postman) to test Scripted REST APIs
