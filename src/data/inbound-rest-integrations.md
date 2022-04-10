# Inbound REST Integrations

How to: (a) Use the REST API Explorer and the _Table_ API to interact with records from ServiceNow tables; (b) create a ServiceNow user for inbound REST requests, (c) Create Cross-Origin Resource Sharing (CORS) rules to select which HTTP methods are allowed from a resource, (d) Disable web service access to tables, (e) Create code samples to use in third-party applications which integrate into ServiceNow.

Note: this content is own by ServiceNow. This is a transcript of the course Inbound REST Integrations for education purposes. Not intended for any commercial purpose.

In an inbound request, a third-party application requests an action through a ServiceNow API. Example ServiceNOW APIs include:

- **Table API**: Create, read, update, and delete records from a table
- **Attachment API**: Upload and query file attachments
- **Email API**: Send and receive email messages using REST

![Inbound Request](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_inbound_images_inbound_genericrequest.png)

The complete set of [ServiceNow REST APIs](https://docs.servicenow.com/bundle/sandiego-application-development/page/build/applications/concept/api-rest.html) is documented on the docs ServiceNow site. Use the **Next topic** and **Previous topic** buttons to havigate through the APIs.

The REST API capability is active by default in all instances.

## Introduction to the REST API Explorer

To integrate with any web service, developers need to know:

- Endpoints
- Methods
- Variables

ServiceNow's REST API Explorer in an application to construct and test API requests to a ServiceNow instance.

The REST API Explorer is available to use with the _rest_api_explorer_ role or the _admin_ role. To open the REST API Explorer, use the _All_ menu to open **System Web Services > REST > REST API Explorer**.

The first time a user launches the REST API Explorer, ServiceNow displays a welcome screen.

![Welcome Screen](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_inbound_images_inbound_welcomescreen.png)

The REST API Explorer consist of:

- A pane to select the _Namespace_, _API Name_, _API Version_, and _REST method_
- A pane to view and configure the endpoint
- A menu to access documentation for the selected API and an API analytics dashboard
- A section to test the endpoint (not shown in the image)

![Panes in REST API Explorer](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_inbound_images_inbound_apiexploreranatomy.png)

**IMPORTANT**: The REST API Explorer interacts directly with the tables on your instance. The REST API Explorer can delete, updated, and insert records. **The REST API Explorer should be used on a non-production instance**. _Use the REST API Explorer with caution on production instances_.

## Selecting an API

The fields in the _Prepare request_ section of the REST API Explorer form are determined by which _Namespace_, _API Name_, _API Version_, and _REST method_ is selected.

- **Namespace**: Select the web service scope
  - **global**: Globally scoped APIs
  - **now**: REST APIs provided by ServiceNow
  - **private_scope_name**: Namespace format used for APIs (scripted web services) in privately-scoped applications
- **API Name**: Select an API to configure and test in the REST API Explorer
- **API Version**: Select a specific API version or choose latest
- **Method**: Select from the list of available REST methods based on the _Namespace_, _API Name_, and _API Version_. The arrowhead indicates the selected method.

![Prepare request section](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_inbound_images_inbound_namespace.png)

For the _Aggregate API_, only one method is available.

The REST API Explorer displays information about the selection. For more information, select the **API documentation** menu item from the _REST API Explorer_ menu.

![Aggregate API](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_inbound_images_inbound_apiinfo.png)

## Request Parameters

Request Parameters consist of:

- _Path parameters_
- _Query parameters_
- _Request headers_

### Path Parameters

The list of path parameters depends on the endpoint URL. Path parameters are enclosed in curly braces in the endpoint URL. The values set in the path parameter field are subtituted into the endpoint URL when a request is sent.

![Path Parameters](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_inbound_images_inbound_pathparms.png)

**IMPORTANT**: If the table referenced by a request is a Database View, GET is the only method that will return results. Database Views are read-only.

### Query Parameters

Request parameters are added to the endpoint URL by the REST API Explorer when the request is sent. The query parameters are specific to the selected API method.

![Query Parameters](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_inbound_images_inbound_requestquery.png)

A default set of query parameters are displayed for the API. To add additional query parameters, use the **Add query parameter** button to add a new parameter to the query. For a complete list and detailed description of an API's query parameters, select the **API documentation** menu item from the REST API Explorer menu.

### Request Headers

Request headers define the format of the Request and Response.

![Request Headers](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_inbound_images_inbound_requestheaders.png)

Use the **Add header** button to add additional headers to the request. For the ServiceNow APIs, two useful additional header parameters are:

- **X-WantSessionNotificationMessages**: Set to _true_ to return notifications that have no already been consumed for the existing session.
- **X-WantSessionDebugMessages**: Enable session Debug and set the header value to _true_ to return session debug logs.

![Additional headers](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_inbound_images_inbound_addheader.png)

**IMPORTANT**: The request headers require the developer to configure the request as the currently logged in user. The user must have permission to access the records being requested or the request will be denied.

## More About Query Parameters

Query parameters may contain different types of values, such as:

- Encoded queries
- Field name(s)
- true/false/all

### Encoded Queries

Some query parameters, such as `sysparm_query` and `sysparm_having`, accept encoded queries as their values. Encoded queries are not easy to create manually. The encoded query syntax is not documented, so let ServiceNow build the encoded query. In the main ServiceNow browser window, use the _All_ menu to open the list for the table of interest. If no modules exists to open the list, type **<table_name>.list** in the _All_ menu's Filter navigator.

Use the Filter to build the query condition.
![Filter](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_inbound_images_inbound_filterincrecs.png)

Click the **Run** button to execute the query. Right-click the breadcrumbs and select **Copy query**.

![Copy query](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_inbound_images_inbound_copyquery.png)

**NOTE**: The copied query includes the condition right-click on and all conditions to the left. To copy the entire query, right-click **<the condition farthest to the right>**

Return to the REST API Explorer and paste the encoded query into the query parameter.

![REST API Explorer](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_inbound_images_inbound_pastequery.png)

### Field Names

Some query parameters, such as `sysparm_group_by`, accept a field name or a comma separated list of field names. Developers must pass the field name not the field label.

To select fields from a slushbucket, click the **Edit** button on the field.

![Field Names](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_inbound_images_inbound_addfieldfromslushbucket.png)

![Field Names in REST API Explorer](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_inbound_images_inbound_fieldadded.png)

Dot-walking is allowed in field names, for example, _caller_id.title_.

### true/false/all

When a REST call returns a reference field from a table, developers can select the format for the returned value.

- Set the value to **true** to return a display value
- Set the value to **false** to return the _sys_id_
- Set the value to **all** to return both the display value and the _sys_id_

![true, false, and all](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_inbound_images_inbound_all.png)

## Testing

After configuring the REST method, click the **Send** button to send the request to the API.

![Testing](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_inbound_images_inbound_sendbutton.png)

The REST API Explorer responds as if the request came from a third party application:

- _Request_
- _Response_
- _Response Body_

![Test Response](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_inbound_images_inbound_responseback.png)

## ServiceNow API Request

The REST API Explorer constructs the request to send to the ServiceNow API using the settings configured by the developer.

### Path Parameters in the Request

The _Request_ section displays the HTTP Method / URI to send to the ServiceNow web service. The method is from the selected API. The path parameter values are set when configuring the request.

![Request Section](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_inbound_images_inbound_requestpopulated.png)

### Query Parameters in the Request

The query parameters are added to the URI. In the example shown, the URI is truncated due to space limitations. To see the complete URI in the REST API Explorer, scroll horizontally.

![Query Parameters](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_inbound_images_inbound_queryparmsuri.png)

### Headers in the Request

REST headers are the meta-data associated with an API request and response. The Request Header settings appear in the request.

![Headers in Request](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_inbound_images_inbound_requestheadersrequest.png)

## ServiceNow API Response

The ServiceNow API Response consists of:

- HTTP status code
- Response headers
- Response body

### HTTP Status Code

ServiceNow APIs return standard HTTP status codes. Generally speaking:

- \*_1xx_: Informational
- \*_2xx_: Success
- \*_3xx_: Redirection
- \*_4xx_: Client Error
- \*_5xx_: Server Error

![Response Status Code](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_inbound_images_inbound_response200.png)

The HTTP status codes refer to the interaction with the REST service provider. The status codes do not tell anything about the requested data. The REST transaction request can complete successfully even if no data is returned.

![200 Status Code with no Data Response](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_inbound_images_inbound_200nodata.png)

### Response Headers

The _Headers_ section shows the returned headers and their values

![Response Headers](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_inbound_images_inbound_responseheaders.png)

### Response Body

The response body is the data object returned by the ServiceNow web service provider. The response body varies depending on the selected API. In the example, the _Aggregate_ API returns the count of open incident records in the past year with a priority of _Critical_ or _High_. The results are grouped by the user in the _Assigned_ to field.

![Response Body](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_inbound_images_inbound_bethinc.png)

_Beth Anglin_ has three _Critical_ or _High_ priority incidents still open from the past year. Notice in this case both the value (_sys_id_) and _display_value_ are included for the _assigned_to_ field.

### Data Types and Returned Values

- **Encrypted text**: The database value is encrypted, while the displayed value is unencrypted based on the user's encryption context.
- **Reference fields**: The database value is a _sys_id_ and the display value is the human readable name.
- **Date fields**: The database value is in UTC format, while the display value is based on the user's time zone.
- **Choice fields**: While performing a REST request, returned currency values are converted to local currency based on the user's locale. When inserting data, no conversion is performed.

## Adding Security to Inbound Requests

Strategies to add security to inbound API requests include:

- Create a user specifically for inbound requests
- Disallow web service access to tables
- Create CORS rules

### Create an API Request User

Users with the _Web service access only_ option set on their user record cannot log into the ServiceNow UI. This option allows the user credentials to be used only to authorize API connections. To set this option, open the user record for editing using the **User Administration > Users** module.

![Web Service access only](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_inbound_images_inbound_wsaccessonly.png)

The API request user must be granted the roles necessary to access the records requested by the API requests.

### Disallow Web Service Access to Tables

Administrators can disable web service access to tables. On the table record, open the **Application Access** section and de-select the **Allow access to this table via web services** option. REST requests are not accepted for tables unless this option is selected (checked). To set this option, open the table record for editing using the **System Definition > Tables** module.

![Access to this table via web services](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_inbound_images_inbound_tablewebserviceaccess.png)

**IMPORTANT**: The REST API Explorer ignores this setting. The REST API Explorer can interact with tables with the _Allow access to this table via web services_ option disabled.

## CORS Rules

Cross-Origin Resource Sharing (CORS) rules control which domains can access specific REST API endpoints. To create a CORS rule, use the _All_ menu to open **System Web Services > REST > CORS Rules**.

In the example, the resource [https://www.test-cors.org](https://www.test-cors.org) can only access the _Table API_ using the _GET_ method.

![CORS Rule](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_inbound_images_inbound_corsrule.png)

- **REST API**: The REST API the CORS rule applies to.
- **Domain**: The domain for the CORS rule. Specify the domain using an IP Address or a domain pattern.
- **Max age**: The number of seconds to cache the client session. After an initial CORS request, further requests from the same client within the specified time do not require a preflight message. If a value is not specified, the default value of 0 indicates that all requests require a preflight message.
- **HTTP Methods**: The methods allowed.
- **HTTP Headers**: A comma-separated list of HTTP headers to send in the response. Specified headers are added to the _Access-Control-Expose-Headers_ header.

There are a number of requirements for specifying the domain including:

- Start with _http://_ or _https://_
- Must be an IP address or domain pattern
- Can contain only one wildcard \*

Check out the complete list of [CORS domain requirements](https://docs.servicenow.com/bundle/sandiego-application-development/page/integrate/inbound-rest/reference/r_CORSDomainRequirements.html) on the docs.servicenow.com site.

**IMPORTANT**: CORS Rules cannot be tested in the REST API Explorer.

## Code Samples

The REST API Explorer creates code samples for integrating with the ServiceNow APIs in several commonly used languages (to name a few):

- ServiceNow Script
- Python
- Ruby
- JavaScript

To create the code sample, click the link in the REST API Explorer.

![Code Sample](https://developer.servicenow.com/app_store_learnv2_rest_sandiego_inbound_images_inbound_codesamplelinks.png)

All code samples use fake credentails. Before using the script in the application to integrate with ServiceNow, update the code to use valid credentials.

## Inbound Integrations Module Recap

Core concepts:

- Use the REST API Explorer to create and test inbound ServiceNow API requests
- Path parameters are part of the endpoint URL
- Query parameters determine which records, which data, and the data format returned in the response body
- The HTTP status code indicates the status of the transaction request and does not indicate any information about the returned data
- The response body format is set in the headers
- The REST API Explorer tests requests as the currently _logged_ in user
  - The _Allow access_ to this table via web services option cannot be tested in the REST API Explorer
- Do not use the admin user in code integrations, create a web services only user instead
- Disable web service access to tables with sensitive data unless web service access is required
- CORS rules add security to APIs
  - CORS rules determine which cross-origin resources can access which methods
  - CORS rules cannot be tested in the REST API Explorer
- Code samples provide script stubs for integrating into ServiceNow from third party applications
  - Developers must update credentials in the code samples
  - Code samples are available in multiple standard languages used with integrations
