# Introduction to APIs

Application Programming Interfaces (APIs) are constructs made available in programming languages to allow developers to create complex functionality with ease. They abstract more complex code away from you, providing some easier syntax to use in its place.

![The Plug Socket API: You are not an Electrician](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction/plug-socket.png)

> "It will always be easier to use APIs and write higher-level code (such as JavaScript or Python), rather than trying to directly write low level code (as C or C++) to directly achieve your intended functionality."

## Web-based APIs

Client-side JavaScript, in particular, has many APIs available, providing you with enhanced functionality to use in your JavaScript code. They can be categorized as:

- **Browser APIs**: Built into web browsers and able to expose data from the browser and surrounding computer environments.
- **Third-party APIs**: Retrieve data from somewhere else on the web.

### Browser APIs

When writing code for the web, there are numerous [Browser APIs available](https://developer.mozilla.org/en-US/docs/Web/API), which are typically used with JavaScript. The Browser has APIs available such as [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) or, in my opinion, one of the most commonly used ones, the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

They both provide interfaces. For instance, the _Geolocation API_ allows users to provide their location to web applications and the _Fetch API_ provides an interface for fetching resources across the network with a more powerful and flexible subset of features than its predecessors ([XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)).

### Third-party APIs

Nowadays, very few applications (if any) stand alone. You will most likely need to build internal APIs or consume third party APIs to avoid reinventing the wheel. As applications grow bigger and gain popularity, others will be interested in leveraging your technology or data, which will create an opportunity for you to expand the influence of your application.

> "APIs are no longer just tools to power your applications, but products or platforms of their own right."

With APIs quickly gaining popularity in the world of technology, we've seen a huge growth in its availability over the past twenty years (see [Malamud's Analyzing Novell Networks from 1959](https://babel.hathitrust.org/cgi/pt?id=mdp.39015018454903&view=1up&seq=314&skin=2021)). Let's quickly highlight two examples of Third-party APIs:

- [NASA APIs](https://api.nasa.gov/): Making NASA data, including imagery, eminently accessible to application developers.
- [Public APIs](https://github.com/public-apis/public-apis): A collective list of free APIs for use in software and web development.

Let's take a quick look at the NASA APIs. One of the most popular websites at NASA is the [Astronomy Picture of the Day](http://apod.nasa.gov/apod/astropix.html) (in fact, across all federal agencies). NASA claims it's as popular as a Justin Bieber video. The APOD (Astronomy Picture of the Day) API endpoint (will come back to this term later) structures imagery and associated metadata to be repurposed for other applications. Try it [here](https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY) with NASA's demo key (will come back to this term later too). Just make sure to install a JSON formatter for your browser in order to make an easier sense of the data, I'd recommend [JSONView](https://jsonview.com/).

```json
{
  "date": "2022-04-12",
  "explanation": "{...}",
  "hdurl": "https://apod.nasa.gov/apod/image/2204/N11_HubbleLake_1600.jpg",
  "media_type": "image",
  "service_version": "v1",
  "title": "N11: Star Clouds of the LMC",
  "url": "https://apod.nasa.gov/apod/image/2204/N11_HubbleLake_960.jpg"
}
```

### Can we use Browser and Third-party APIs together?

Yes, we can! Let's take the aforementioned Browser's Fetch API and create a request to get the NASA's Astronomy Picture of the Day. Here's a quick [Codepen](https://codepen.io/ekqt/pen/yLpqqjP?editors=1011) recreating their APOD website. What's happening behind the scenes? A basic fetch request is really simple to set up.

```javascript
fetch(path)
  .then((response) => response.json())
  .then((data) => console.log(data));
```

In the example above, we're using the simplest form of `fetch()` which takes one argument — the resource you want — and does not directly return the JSON (more on this term later) response body but instead returns a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object representing the entire HTTP response. So to get the JSON response body content, you need to use the `json()` method, which returns the result of parsing the response body text as JSON. You can read more information, [here](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), on Using the Fetch API.

_Note: This article is a work in progress…_
