# Jamming with Gatsby and Sanity
TALK TRANSCRIPT

👉👉 [[Slides]](https://slides.com/riacarmin/jamming-with-gatsby-and-sanity)

## **Hello**

Hey, React fam! My name is Ria, I am an organizer at React Vancouver and a Front End engineer. I wanted to show you a couple technologies / techniques that I think are fantastic and my #1 choice in building marketing site or blog kind of projects. So projects that are content heavy and interaction light. For example at the company where I work, EquitySim, we have [equitysim.com](http://equitysim.com) marketing site that explains what our platform does (which is financial market simulation) and actual [finance.equitysim.com](http://finance.equitysim.com) the web app, that is interaction and data rich, the actual simulation.

## **JAM Stack**

And what I am talking about here is a set of techniques called **JAM Stack**: JavaScript, APIs and Markup. It is a way to architect your front-end with the goal of optimizing for speed and SEO and also making updating the content more streamlined. JAM Stack is...

> Fast and secure sites and apps delivered by pre-rendering files and serving them directly from a CDN, removing the requirement to manage or run web servers.

— [JAMStack.org](https://jamstack.org/)

I won’t go too deep into different varieties of JAM stack, since I will be talking mostly about Gatsby and Sanity combo. I will just five a quick overview, so you have some context in case if you are not familiar with it.

You usually start with picking a **static site generator**. You have maybe heard of Jekyll, it’s been popular for a long time, or some of the newer cool kids on the block like Eleventy. As the name suggests, it assembles a static site using some sort of a templating engine, that you can host cheaply usually . The idea is the speed, simplicity and discoverability of a website coded by hand with HTML, CSS and JS, but conveniently generated from template files. There are all kinds of static site generators available in terms of the language used and templating engine: JavaScript, Elm, Python, Go, .NET, PHP among the languages and React, Vue, Markdown and others among templating.

Then you would want some way to create content, such as blog posts or product descriptions etc. Content that you can feed through the templates to generate pages or sections on your website. Most of the static site generators will let you use local files in say Markdown format (as in M in JAM stack). More complex, professional projects would want to opt in for a CMS, content management system. And in case of a JAM stack, you want a **headless CMS**. Headless CMS as opposed to a traditional CMS only cares about serving content through an API. It doesn’t provide hosting, templating, forms, emails like a traditional CMS like say Wordpress. A headless CMS is basically a database with a nice dashboard. It will also provide an API for your frontend to pull the data. It could be REST, GraphQL, or something else proprietary to that CMS. Some of them offer hosting as well and some require you to host your database yourself. Today, there are dozens of them for you to choose from.

There also might be additional dynamic functionality you want to add to your static site that requires computation or working with a third party API. Think sending form data, for example, or using Twilio API to send a text. In that case people like to use the **serverless model** making use of services like [Amazon Lambda](https://docs.aws.amazon.com/lambda/?id=docs_gateway), [Microsoft's Azure Functions](https://azure.microsoft.com/en-us/services/functions/), or [Vercel](https://vercel.com/docs/v2/serverless-functions/introduction).

And there you have it, the three key components for your JAM project! (1) static site generator, (2) markup / headless CMS, and potentially (3) serverless functions.

**Resources**

[Jamstack | JavaScript, APIs, and Markup](https://jamstack.org/)

[StaticGen | Top Open Source Static Site Generators](https://www.staticgen.com)

[headlessCMS](https://headlesscms.org/)

## Quick Gatsby 101

Lets start with Gatsby first. Here is the link to the GitHub repo if you want to clone it and follow along with the code.

Gatsby is one of the more popular static site generators today. It uses React for its templating and also GraphQL API to pull your content and data sources. It actually doesn’t generate HTML pages, it ships a code-splitted React app with all your content pre-fetched and baked in for the [SEO purposes](https://www.gatsbyjs.org/docs/seo/).

On top of that Gatsby offers a lot of additional plugins for optimizing your website performance:
(1) Like [gatsby-plugin-offline](https://www.gatsbyjs.org/packages/gatsby-plugin-offline/) that not only allows your site to run offline, but also significantly cuts how much bandwidth your users need to fetch your site. This plugin is based on a PWA ([Progressive Web App](https://web.dev/progressive-web-apps/)) approach and service-workers.

(2) Or another one of my favorites, [gatsby-image](https://www.gatsbyjs.org/packages/gatsby-image/) is a React component that optimizes image loading for great user experience.

There are obviously *so many* other amazing, useful plugins for your Gatsby project, but I want to jump into how Gatsby deals with content. When you generate a new Gatsby site with their CLI, you get a little starter project.

```bash
gatsby new my-website https://github.com/gatsbyjs/gatsby-starter-hello-world
```

A couple of things to know right away is that you will have `/pages` directory, and every component in that directory Gatsby will transform into a page. So if you have a file say `/about-me`, that will turn into a page `[https://mywebsite.com/about-me](https://mysebsite.com/about-me)` and whatever component that file exports by default will be that page’s content. Pretty straightforward so far.

As I said earlier, Gatsby uses GraphQL under the hood to get your data. What happens is, you define your data sources, and during the build phase, Gatsby will check what data you want, go fetch it and add it with the build. The benefit being that your users won’t have to experience load delays due to latency and the content will be available for crawlers to index, so you rank very very high in the search results. How much GraphQL do you need to know to work with Gatsby? Very little. You only need to know how to write GraphQL queries. A lot of the complexity is handled by Gatsby under the hood.

For example, let’s try fetching an image from the filesystem. I added `gatsby-source-filesystem` plugin to have access to the local files. Gatsby comes with GraphiQL dashboard on route http://localhost:8000/___graphql to inspect what data you have access to and help build queries. So I will build my query to fetch an image from the Explorer.

Then I am going to use `useStaticQuery` hook provided in Gatsby. There are other ways to query data, but let’s use this one for now.

(1) Import from gatsby...

```jsx
import { useStaticQuery, graphql } from 'gatsby';
```

(2) Assign the result of the query to the `data` constant. I built and tested the query in GraphiQL and pasted it here...

```jsx
const data = useStaticQuery(graphql`
    query ImageQuery {
      file(relativePath: { eq: "dwarf.png" }) {
        publicURL
        relativePath
      }
    }
  `);
```

(3) and now use... Easy!

```jsx
<img
  className='dwarf'
    src={data?.file?.publicURL}
    alt={data?.file?.relativePath}
/>
```

## What about Sanity CMS?

Lets now take a look at Sanity. Sanity is a headless CMS that offers a GraphQL API that works perfectly with Gatsby. The reason why I like Sanity is because it is developer driven and allows you to write your schema in JS objects, and then customize your editing dashboard to your hearts desire. You can programmatically define your schema, versus creating it using a browser GUI. Let me show! Start with getting the CLI and bootstrapping the project.

```bash
npm install -g @sanity/cli
sanity init
sanity start
```

Let’s first take a look at how to define a schema. All your schemas are in the `schemas` folder, so start by adding a new file there. I am going to create a new type and call it `info` by exporting this object from the file I just created:

```jsx
 export default {
  title: "Info",
  name: "info",
  type: "document",
  fields: [

  ],
  preview: {

  },
};
```

We will add the types of data we want to store in the `fields` array and optionally add custom presentation format in the `preview` object. The individual fields look like this.

```jsx
{
  title: "Title",
  name: "title",
  type: "string",
  validation: (Rule) => Rule.required(),
}
```

Then you need to import this object into your schema creator in `schema.js` file:

```jsx
import info from './info';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    blockContent,
    post,
    author,
    category,
    info // << Add here
  ]),
});
```

And now if you give it a swirl, you should see your new info tab in the dashboard.

The last thing is to deploy your Sanity CMS. You will only need to run one or two CLI commands: `deploy` and sometimes `graphql deploy` depending on the type of a starter project you picked. Should be all set now with your management console.

```bash
sanity deploy
sanity graphql deploy
```

There is a ton of cool stuff you can do with Sanity, but since it’s just a quick intro demo, let’s come the full circle and get the data from Sanity into Gatsby now.

**Resources**

[Guide: Get started with the Gatsby portfolio](https://www.sanity.io/guides/the-portfolio-template)

# Gatsby & Sanity

First you need to configure Sanity as a source in Gatsby. Back in our Gatsby repo, we will add `gatsby-source-sanity` .

```jsx
yarn add gatsby-source-sanity
```

Now in the `gatsby-config.js` add the Sanity plugin like this. You can find your credentials in your management console.

```jsx
module.exports = {
  // ... other config stuff
  plugins: [
		// ... other plugins
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET,
        token: process.env.SANITY_TOKEN,
        watchMode: true,
        overlayDrafts: true,
      },
    },
  ],
};
```

Start the Gatsby server and open your playground at http://localhost:8000/___graphql. Tada 🎉! You have sanity data to work with. Let's quickly build a query and add it to our `about-me` page. Another way to feed data into your component is by exporting a constant `query` . This method only works for page components. I've built and tested my query in GraphiQl like the last time and now adding it to my `<AboutMe />` component:

```bash
export const query = graphql`
  query AboutMeQuery {
    sanityInfo(_id: { eq: "info" }) {
      title
      description
    }
  }
`;
```

This works sort of like an HOC. It will pass a prop `data` to your component with the fetched content.

```bash
export default function AboutMe({ data }) {
  const { title, description } = data?.sanityInfo;
  return (
    <Shell>
      <div className="container about-me">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </Shell>
  );
}
```

And there you have it, your content on the page!

---

This was a really speedy, brief intro into both of the technologies, which obviously have a lot more to offer. Check out the repository with all the code that I've been showing and some extras and all the resource links. I will stay around at the virtual room to chat either high level about JAM or nitty gritty details of Gatsby-Sanity combo.

*Cheers!*
