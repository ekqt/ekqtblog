# Understanding Color Themes

Often websites provide users the option to set their preferred [color-theme](https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme) (also referred as color-scheme) instead of relaying the decision to their system preferences (whether it is light, dark or auto). As a Designer or Developer, let's explore how to configure the different options to achieve this.

## What do we need in our HTML

Althought there are several options for it, let's [KISS](https://en.wikipedia.org/wiki/KISS_principle) it and use a `<button/>` to toggle our project's color-theme.

In addition of setting the obvious for your CSS and JavaScript, let's add the [title](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title) attribute to provide information about the button's purpose and the [aria-lable](https://developer.mozilla.org/en-US/docs/web/accessibility/aria/attributes/aria-label) to hold the state of the button, for accessibility purposes.

```html
<button
  class="theme-toggle"
  id="theme-toggle"
  title="Toggles color theme"
  aria-label="auto"
  aria-live="polite"
>
  …
</button>
```

We are setting as default this state to `auto` (given that we will be initially reading system preferences). However, given that we are expecting this to change, let's also adding the attribute [aria-live](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live) to indicate its changing nature.

Setting the `aria-live='polite'` indicates that updates should be presented at the next graceful opportunity, such as at the end of speaking or when the user pauses typing.

### What about the icons?

For this exercise, let's add two `svg` elements. One for the Sun and one from the Moon. Add to each of them a class of `'light-icon'` and '`dark-icon'` respectively. Also add the attribute `aria-hidden='true'` to hide them from the accessibility tree given that they are purely decorative content.

## What do we need in our Styles

First we will apply some general styles to make tu button a circle and remove its default styles:

```css
.theme-toggle {
  --size: 2rem;

  background: none;
  border: none;
  padding: 0;

  inline-size: var(--size);
  block-size: var(--size);
  aspect-ratio: 1;
  border-radius: 50%;

  /** Interaction Styles*/
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  outline-offset: 5px;
}
```

## What do we need in our JavaScript

In order to prevent any color flashes from occuring on page load, we need to set the HTML attribute `data-theme` as early as possible. To achieve this, a plan `<script/>` tag in the document `<head/>` is loaded first before any CSS or `<body/>` markup is loaded. When the browser finds an unmarked (no defer, async or module) script like this, it runs the code and executes it before the rest of the HTML.

```html
<head>
  {...}
  <script src="./theme-toggle.js"></script>
</head>
<body>
  {...}
</body>
```

First, we check for the user's preference in local storage and fallback to check the system preference if nothing is found in storage:

```javascript
const storageKey = "theme-preference";

const getColorPreference = () => {
  if (localStorage.getItem(storageKey)) return localStorage.getItem(storageKey);
  else
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
};
```

A function to set the user's preferences in local storage is parsed next:

```javascript
const setPreference = () => {
  localStorage.setItem(storageKey, theme.value);
  reflectPreference();
};
```

Followed by a function to modify the documents with preferences:

```javascript
const reflectPreference = () => {
  document.firstElementChild.setAttribute("data-theme", theme.value);

  document
    .querySelector("#theme-toggle")
    ?.setAttribute("aria-label", theme.value);
};
```

Given that the `#theme-toggle` button hasn't been loaded yet, the [optional chaining operator](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Optional_chaining) ensures no syntax errors when it's not found and the setAttribute function is attempted to be invoked.

Next, we define our `theme` object and the function `reflectPreference()` is immediately called so the HTML document has its `data-theme` attribute set:

```javascript
const theme = {
  value: getColorPreference();
}
reflectPreference();
```

The button still needs the attribute, so wait for the page load event, then it will be safe to query, add listeners and set attributes on:

```javascript
window.onload = () => {
  // Set on load so screen readers can get the latest value on the button
  reflectPreference();
  // Now this script can find and listen for clicks on the control
  document.querySelector("#theme-toggle").addEventListener("click", onClick);
};
```

When the button is clicked, the theme needs to be swapped, in JavaScript memory and in the document. The current theme value will need to be inspected and a decision made about its new state. Once the new state is set, save it and update the document:

```javascript
const onClick = () => {
  theme.value = theme.value === "light" ? "dark" : "light";

  setPreference();
};
```

We synchronize our colortheme with the system preferences as it changes using [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) event listener for changes to a media query:

```javascript
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    theme.value = isDark ? "dark" : "light";
    setPreference();
  });
```

This guide was heavily build on and inspired by Adam Argyle's [Building a theme switch component](https://web.dev/building-a-theme-switch-component/) article.

Here's the link to the [GitHub Repository](https://github.com/ekqt/ekqt-color-theme).
