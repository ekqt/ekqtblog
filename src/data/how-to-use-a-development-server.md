# How to use a Development Server

Long story, short. Development servers are used to quickly develop applications. They provide a runtime environment which is incredibly useful regardless of the size of your project and where you stand in your developer journey.

Although this over-simplified guide is meant for Beginners, [Vite](https://github.com/vitejs/vite) (the _frontend build tool_ showcased here) has an extensive list of features that can be found [here](https://vitejs.dev/guide/features.html). But quick question — are you learning how to code using **HTML**, **CSS**, **JavaScript**? If so, give this guide a try!

### Before we start...

This is NOT a basic tutorial where we will install random dependencies you've never heard of! However, we will need a couple of things:

- [Node.js](https://nodejs.org/en/) — a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Visual Studio Code](https://code.visualstudio.com/Download) — a lightweight but powerful source code editor.

## 1. Setting up your project

Once you've install both, we should be ready to start. For this guide, we'll create a regular Vanilla.js project (only using HTML, CSS and JavaScript). Go ahead launch VS Code and open a terminal window by navigating to **View > Terminal.**

Once the terminal opens, type the following commands replacing the placeholders with your own:

```javascript
## By default, Terminal will open in your user directory:
## i.e. Macintosh HD > Users > hectorsosa
## So we will use 'cd' to navigate to the project's desired location.

## Creating your project directory in your Documents folder:

$ cd Documents
$ npm init vite@latest <project-name> -- --template vanilla

## Switch to your terminal to be located inside your project directory:

$ cd <project-name>

## Now install the necessary Node packages:

$ npm install

## Finally run the development server:

$ npm run dev
```

If everything went well, you should see in your terminal window the following result:

```javascript
Scaffolding project in /Users/hectorsosa/Documents/test-app...

## After creating your project directory:

Done. Now run:

  cd test-app
  npm install
  npm run dev

## After installing the necessary Node packages:

added 14 packages, and audited 15 packages in 3s

3 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

## After running the development server:

vite v2.7.1 dev server running at:

  > Local: http://localhost:3000/
  > Network: use `--host` to expose

  ready in 318ms.

## We will get back to the message: '> Network: use `--host` to expose'
```

Open the project's folder `cmd + O` or by navigating to **File > Open Folder...** You directory should look as follows:

```bash
├── node_modules ## Where all of your local NPM packages live.
├── .gitignore  ## By default, Vite creates a git repository in your project .gitignore indicates which files will the repository ignore.
├── favicon.svg  ## Also known as shortcut icon, website icon, tab icon. In this case Vite's icon.
├── index.html  ## Main HTML file.
├── main.js  ## Main JavaScript file.
├── package-lock.json  ## Keeps track of the exact version of every NPM package.
├── package.json  ## Project's manifest. The central repository of configuration.
├── style.css  ## Main CSS file.
```

## 2. Cleaning your directory

1. You can safely delete the `favicon.svg` file and also remove the line 5 from your `index.html` file which links the icon.
2. From your `index.html` file you can change your project's title from `<title>Vite App</title>` to a name of your choosing `<title>Test App</title>`.
3. From your `main.js` file delete the entire `document.querySelector` (lines 3 to 6) which is feeding the inner HTML into the html file.

## 3. Start working on your project

If everything went well, go ahead and write something in your html file, hit save, open a browser window and go to [http://localhost:3000/](http://localhost:3000/). You should be greeted with the following:

![Result](https://miro.medium.com/max/562/1*3MJHi0ikI-E3_f3141xAKw.png)

## Now what?

Go ahead and play with it. You will quickly learn why working with a Development Server is an industry standard. You only need to be working on your files and hitting `cmd + s` every time you want to see a change reflected on the server.

### Using your Network to view on other devices

Using your network comes in handy when you want to check what your project looks like on other devices (i.e. Other OS or Mobile). This is easily configured with Vite making the following changes:

```javascript
## Remember the `--host`

vite v2.7.1 dev server running at:

  > Local: http://localhost:3000/
  > Network: use `--host` to expose

  ready in 318ms.

## Use the command ⌃ + c to end the development server
## Navigate to your package.json file
## Change the "scripts" : "dev" to include --host as follows:

{
  "name": "test-app",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite --host",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^2.7.0"
  }
}

## Save your package.json file and relaunch the development server from the terminal

$ npm run dev

## Now you should see the following:

vite v2.7.1 dev server running at:

  > Local:    http://localhost:3000/
  > Network:  http://192.168.178.143:3000/

  ready in 185ms.

## Use the Network address to view your project on other devices connected
```

Thanks for reading!
