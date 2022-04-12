# Performance Pitfalls: DOMContentLoaded

The `DOMContentLoaded` is an event that is fired when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading. Make sure to use it right! Let's take a look at what to avoid in order to make sure that our document is loaded and behaves in the intended way.

## Script HTML Element: The Defer Attribute

`<Script/>` HTML elements have an attribute called `defer`. This attribute is set to indicate to the browser that the script is meant to be executed **after** the document has been parsed, but before firing the `DOMContentLoaded` event. Scripts with the `defer` attribute will prevent the `DOMContentLoaded` event from firing until the script has loaded and finished evaluating.

How do they look? They are Boolean attributes as shown below:

```html
<head>
  ...
  <script defer src="deferred-script.js"></script>
</head>
```

Keep in mind, this attribute won't have any effect on inline scripts. It doesn't have effect on [module scripts](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) either, because they defer by default. So avoid doing the following:

```html
<body>
  <p>...</p>
  <script defer>
    console.log(
      "Here, in this inline script the defer attribute has no effect."
    );
  </script>
</body>
```

Scripts with the `defer` attribute will execute in the order in which they appear in the document. This attribute allows the elimination of **parser-blocking JavaScript**, where the browser would have to load and evaluate scripts before continuing to parse. `async` has a similar effect in this case. So let's discuss the `async` attribute.

### Defer vs Async

The main difference is that when a `<Script/>` HTML element uses the async attribute, the script will be fetched **in parallel** to parsing and evaluated as soon as it is available.

### Keep in mind

Scripts without any of these attributes, as well as inline scripts, are fetched and executed immediately, before the browser continues to parse the page. Read more [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-defer).

## If defer, should you condition Script execution?

Short answer, no. Let's imagine we have the following: We have three scripts. One defined inside our `<head/>` HTML element and two of them inside our `<body/>` HTML element. At first glance, they will all be executed (thanks to `defer`) **after** the document has been parsed. Given where these `<script/>` HTML elements were placed, `first-interaction.js` will load first than the other two.

```html
<head>
  ...
  <script defer src="first-interaction.js"></script>
</head>
<body>
  <p>...</p>
  <script defer src="other-script.js"></script>
  <script defer src="another-script.js"></script>
</body>
```

So far, so good. However, if you would choose to include the `DOMContentLoaded` event inside your first script. It would defeat the purpose of having the attribute `defer` in the first place.

```javascript
/** first-interaction.js */
addEventListener('DOMContentLoaded, () => {
  addInteractivity();
});
```
