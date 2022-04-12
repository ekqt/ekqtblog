# Hello World

**Welcome to my Blog!** This project is a markdown-based application created with [React](https://reactjs.org/). The idea behind it first came through a friend ([Cass Tang](https://www.cassandratang.me/)) who showed me a similar project created with php called [Portable Thoughts](https://portable.fyi/).

### What do I mean by markdown-based?

If you haven't heard of it already, let's first define what markdown is...

> "Markdown is a lightweight language that you can use to add formatting elements to plaintext documents. Created by [John Gruber](https://daringfireball.net/projects/markdown/) in 2004, Markdown is now one of the world’s most popular markup languages." —[Markdown Guide](https://www.markdownguide.org/getting-started/)

Markdown is everywhere. It's a very popular and widely supported markup language. The best thing about it's how incredibly easy it is to write.

For instance, if you would like to bold a text, you need to enclose it in _double asterisks_ (\*), then it would be displayed like **this**. Is this any good? Absolutely! You can style/format your text as you write without the need to take your hands off the keyboard. Here's a list of all other syntax elements in Markdown Guide's [Cheat Sheet](https://www.markdownguide.org/cheat-sheet/).

Haven't worked on a project like this, I thought the idea was cool enough for me to jump into it. I initially even created the whole project as a full-stack application, but later thought that it would be best to have a more sustainable approach and serve it with static files. Thus avoiding dealing with user authentication and databases.

The project's file structure looks like this (at least for the files that matter):

```javascript
/** Sidenote: it also supports code blocks! Isn't it great?*/
├── components
│   └── Posts.js
├── data
│   └── data.js
│   └── post<n>.md
├── utils
│   └── data.js
├── App.js
```

## So what's happening behind the scenes?

1. Each blog is created and uploaded with `.md` files into the `/data` directory and also listed for use in the `data.js` JavaScript data processor. This 'data processor' creates an array with all the information required.
2. That data array is used by a React component `Posts.js`, where each post is immediately converted to an object using [Marked](https://marked.js.org/) (a low-level markdown compiler for parsing markdown).
3. These objects contain content blocks that are styled with a component factory called `componentGenerator.js` which analyzes and maps each content block to a defined React component using [Mantine](https://mantine.dev/) (A fully featured React component library).
4. Then it all gets rendered on the page, where navigation happens just using React's `useState()` and the browser's `window.location.hash`. The burger menu displays items for (a) all Posts, (b) different tags, and (c) an About page which directs users to this post.

For more questions, don't hesitate in contacting me via [email](mailito:ekheinquarto@gmail.com).

Thanks for stopping by and enjoy the content!
