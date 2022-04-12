# How I Deploy my Projects in 2022

The more I develop, the more I realize that it is critical to have a nice, easy and sustainable workflow that can enable you to develop projects, whether that is websites, applications or [POCs](https://en.wikipedia.org/wiki/Proof_of_concept) effectively and for free.

![Photo by Roman Synkevych 🇺🇦 on Unsplash](https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1488&q=80)

## Workflow Criteria

Things that I was looking for when I set myself to explore my current workflow:

1. **Accessibility** — being able to reach my codebase from anywhere
2. **Ease of deployment** — being able to commit and deploy frictionlessly
3. **Integrated version control system** — being able to sustainably keep my codebase in GitHub

To explain these criteria, I'll use as an example my latest project: [@ekqtblog](https://ekqt-blog.vercel.app/#) - a markdown-based application created with [React](https://reactjs.org/). Skip the next three sections if you're short on time.

### Accessibility

For this project, I am more often writing new content (as blog posts) rather than pushing new features or updates in the codebase itself. Even if it were the other way around, I wanted to have full accessibility to my project. Meaning that regardless of where I am, or from which computer I am working on, I wanted to be able to jump in and write something and have it saved in my project files without having to download anything at all.

So no keeping and having to move around any local files, or having to download a code editor like [Visual Studio Code](https://code.visualstudio.com/).

### Ease of deployment

Similarly, I wanted my project live to be able to share it with others. Ultimately, for this particular project (a blog application), being able to share content with others is paramount to its purpose of being. Therefore, a deployment solution that would work easily with an accessible codebase is the way to go. Without having to use any [CLI](https://en.wikipedia.org/wiki/Command-line_interface) commands or Deploy Hooks (see [Webhooks](https://en.wikipedia.org/wiki/Webhook)).

### Integrated version control system

Why is version control important? From a [DevOps](https://www.atlassian.com/devops/what-is-devops)' perspective, it (a) Improves visibility, (b) Helps collaboration, and (c) Accelerates product delivery. More on that [here](https://www.atlassian.com/git/tutorials/what-is-version-control#benefits-of-version-control).

For the sake of keeping it short, working with your projects in GitHub will just make your life easier in the long run.

## Workflow: CodeSandBox - Github - Vercel

> "CodeSandBox is here to make web development faster. By removing complexity, they enable web developers to be more productive."

[CodeSandbox](https://codesandbox.io/docs/) is an online editor for rapid web development for full-stack web applications where you can prototype quickly, experiment easily and share creations with a click.

> "At the heart of GitHub is an open source version control system (VCS) called Git. "

With a [single click](https://codesandbox.io/docs/git), you are able to commit to GitHub repositories. CodeSandBox has a nice integration with GitHub where you can review changes and commit them all from the same workspace.

> "Vercel is a platform for **frontend frameworks** that provides a frictionless developer experience taking care of the hard things like: deploying instantly, scaling automatically, and serving personalized content around the globe."

Vercel has a sustainable [Git integration](https://vercel.com/docs/concepts/git) that allows for **automatic deployments on every commit** and merges onto the [Production Branch](https://vercel.com/docs/concepts/git#:~:text=merges%20onto%20the-,Production%20Branch,-of%20your%20GitHub) of your GitHub repository.

The easiest way to use Git is to think of your `main` branch as production. Every time a commit is made to that branch, Vercel will create a **unique deployment**. Not to mention that Vercel's projects also support several other features like:

- [Custom Domains](https://vercel.com/docs/concepts/projects/custom-domains) — By default, all deployments are assigned a .vercel.app suffixed domain.
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Deployment Checks](https://vercel.com/docs/concepts/deployments/checks)

## Conclusion

So to sum it all up, this is how I deploy in 2022. I use (1) CodeSandBox as my code editor, (2) then commit my projects to GitHub, (3) where they are then pushing deployments in Vercel to share on the web. All managed from a single place maintaining accessibility, ease of deployment and an integrated version control system.

Thanks for reading.
