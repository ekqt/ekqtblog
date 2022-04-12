# Understanding Color Schemes

This is a follow-along guide or template to build a color scheme based on Google's GUI Challenge [Building a Color Scheme](https://web.dev/building-a-color-scheme/) by [Adam Argyle](https://github.com/argyleink).

## Establish the Brand

We can set the brand color delivered by hex or rgb. However, Google defines this value as an hsl color.

```css
* {
  --brand: #0af;
  --brand: hsl(200, 100%, 50%);
}
```

In order to enable a concept of darkening or lightening the brand color, the 3 channels of the hsl color (hue, saturation and lightness) need to be extracted into their own custom properties.

```css
* {
  --brand-hue: 200;
  --brand-saturation: 100%;
  --brand-lightness: 50%;
}
```

This is foundational to building a color scheme as CSS can keep all colors in the same hue family by adjusting the hsl saturation and lightness amounts WITHOUT changing the hue letting CSS handling the work, for example `calc(var(--brand-lightness) - 20%)`.

## Light Theme

Each color variant will be marked with its matching scheme (for light, it will be appended with `-light`).

### Brand

Starting with the brand color, it's rebuilt by wrapping `--brand-hue`, `--brand-saturation` and `--brand-lightness` custom properties inside the hsl`()` function parenthesis, without any calculations:

```css
* {
  --brand-light: hsl(
    var(--brand-hue) var(--brand-saturation) var(--brand-lightness)
  );
}
```

### Text colors

In a light theme, text colors should be very dark. Notice how the lightness of the colors is low, well under 50%.

```css
* {
  --text1-light: hsl(var(--brand-hue) var(--brand-saturation) 10%);
  --text2-light: hsl(var(--brand-hue) 30% 30%);
}
```

`--text1-light`, since it's very dark at 10% lightness, keeps the heavy 100% saturation, so the brand color can still peek through into the dark navy.

`--text2-light`, it's not quite as dark as the 1st color, which is good as it's a secondary color, and it's also much less saturated.

### Surface colors

Surface colors are the backgrounds, borders and other decorative surfaces that text sits upon or within. In a light theme, these are the light colors, as opposed to the text colors which were dark.

To create light colors with hsl, we'll use higher percentage values in the third lightness value.

```css
* {
  --surface1-light: hsl(var(--brand-hue) 25% 90%);
  --surface2-light: hsl(var(--brand-hue) 20% 99%);
  --surface3-light: hsl(var(--brand-hue) 20% 92%);
  --surface4-light: hsl(var(--brand-hue) 20% 85%);
}
```

4 surface colors were created since decorative colors tend to need more variants, for interactive moments like `:focus` or `:hover` or to create the appearance of paper layers. In these scenarios, it's nice to transition `--surface2-light` on hover to `--surface3-light`, so a hover results in an increase of contrast (99% lightness to 92% lightness; making it darker).

### Light colors all together

No need to hunt around to find how any of the light colors are made, they are all in one place in the CSS.

```css
* {
  --brand-light: hsl(
    var(--brand-hue) var(--brand-saturation) var(--brand-lightness)
  );
  --text1-light: hsl(var(--brand-hue) var(--brand-saturation) 10%);
  --text2-light: hsl(var(--brand-hue) 30% 30%);
  --surface1-light: hsl(var(--brand-hue) 25% 90%);
  --surface2-light: hsl(var(--brand-hue) 20% 99%);
  --surface3-light: hsl(var(--brand-hue) 20% 92%);
  --surface4-light: hsl(var(--brand-hue) 20% 85%);
}
```

## Dark theme

Two things to keep in mind with dark themes:

1. Users will generally be in the dark while using this theme, so test in the dark.
2. Colors should desaturate as to not vibrate on the screen due to being over-intense.

### Brand

In reference to the light theme, the saturation is cut in half and the lightness reduced a relative 50%.

```css
* {
  --brand-dark: hsl(
    var(--brand-hue) calc(var(--brand-saturation) / 2) calc(var(
            --brand-lightness
          ) / 1.5)
  );
}
```

### Text colors

In a dark theme, the text colors should be light. The following colors have high values for lightness, putting them closer to white.

```css
* {
  --text1-dark: hsl(var(--brand-hue) 15% 85%);
  --text2-dark: hsl(var(--brand-hue) 5% 65%);
}
```

### Surface colors

In a dark theme, the surface colors should be dark. The following colors have a low lightness and saturation, with the 1st surface being the darkest at 10%.

```css
* {
  --surface1-dark: hsl(var(--brand-hue) 10% 10%);
  --surface2-dark: hsl(var(--brand-hue) 10% 15%);
  --surface3-dark: hsl(var(--brand-hue) 5% 20%);
  --surface4-dark: hsl(var(--brand-hue) 5% 25%);
}
```

### Dark colors all together

```css
* {
  --brand-dark: hsl(
    var(--brand-hue) calc(var(--brand-saturation) / 2) calc(var(
            --brand-lightness
          ) / 1.5)
  );
  --text1-dark: hsl(var(--brand-hue) 15% 85%);
  --text2-dark: hsl(var(--brand-hue) 5% 65%);
  --surface1-dark: hsl(var(--brand-hue) 10% 10%);
  --surface2-dark: hsl(var(--brand-hue) 10% 15%);
  --surface3-dark: hsl(var(--brand-hue) 5% 20%);
  --surface4-dark: hsl(var(--brand-hue) 5% 25%);
}
```

## Accessible colors

Between the lowest lightness in the dark text color and the highest lightness in the dark surface, there should be enough breathing room between them. In the light theme, there's 55% breathing room. Keeping lightness differences between text and surface colors at around 40-50% can help keep color contrast ratios high, while also being a subtle level to adjust in case scores are poor.

To help others on the team use good contrasting colors, it's a good idea to create a classname that pairs a surface color with an accessible text color.

```css
.surface1 {
  background-color: var(--surface1);
  color: var(--text2);
}

.surface2 {
  background-color: var(--surface2);
  color: var(--text2);
}

.surface3 {
  background-color: var(--surface3);
  color: var(--text1);
}

.surface4 {
  background-color: var(--surface4);
  color: var(--text1);
}
```

## Using of the color schemes

With the predefining of colors complete, it's time to turn them into scheme agnostic properties. To accomplish this, usage of the color scheme should be exclusively done through the generic custom properties. This way, folks using the design variables never need to worry about which color scheme is currently set, they just need to use the surface and text colors.

Instead of `color: var(--text1-light)` use `color: var(--text1)`. All adapting and pivoting of colors is done much higher level in the CSS.

Diving in, the light theme's connective styles in the following code block, connect a generic custom property with the light theme specific color. Now, all uses of `var(--brand)` will use the light brand color.

### Light theme (auto)

```css
:root {
  color-scheme: light;
  --brand: var(--brand-light);
  --text1: var(--text1-light);
  --text2: var(--text2-light);
  --surface1: var(--surface1-light);
  --surface2: var(--surface2-light);
  --surface3: var(--surface3-light);
  --surface4: var(--surface4-light);
}
```

### Dark theme (auto)

```css
@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;

    --brand: var(--brand-dark);
    --text1: var(--text1-dark);
    --text2: var(--text2-dark);
    --surface1: var(--surface1-dark);
    --surface2: var(--surface2-dark);
    --surface3: var(--surface3-dark);
    --surface4: var(--surface4-dark);
  }
}
```

### Light theme

```css
[color-scheme="light"] {
  color-scheme: light;

  --brand: var(--brand-light);
  --text1: var(--text1-light);
  --text2: var(--text2-light);
  --surface1: var(--surface1-light);
  --surface2: var(--surface2-light);
  --surface3: var(--surface3-light);
  --surface4: var(--surface4-light);
}
```

### Dark theme

```css
[color-scheme="dark"] {
  color-scheme: dark;

  --brand: var(--brand-dark);
  --text1: var(--text1-dark);
  --text2: var(--text2-dark);
  --surface1: var(--surface1-dark);
  --surface2: var(--surface2-dark);
  --surface3: var(--surface3-dark);
  --surface4: var(--surface4-dark);
}
```

For more information and demos about this article, visit [building a color scheme](https://web.dev/building-a-color-scheme/#using-of-the-color-schemes) by Google's web.dev.
