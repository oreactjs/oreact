<p align="center">
  <a href="https://oreactjs.com/" rel="noopener" target="_blank"><img width="150" src="https://oreactjs.com/assets/images/logos/oreact.png" alt="OreactJS logo"></a></p>
</p>

<h1 align="center">Oreact</h1>

<div align="center">

Forget all the boilerplate and focus on what matters to your application. It helps you build fast, robust, and maintainable production web applications using some of the world's most popular tools: **React, Material-Ui, Apollo, MongoDB, Mobx and Razzle**.

</div>

### Learn more about Oreact on [Oreact Website ➞](https://oreactjs.com)


## Getting Started

OreactJS is available with CLI installer [Oreact CLI](https://oreactjs.com/docs/cli/introduction).

# Installation
<p class="description">Install Oreact with all the prerequisites, and initialize your application.</p>

## Oreact CLI 
Oreact CLI offers a convenient command line installer that will create a new Oreact application and install it in the directory of your choice.
Oreact CLI does not require any configuration or prior knowledge to get started, and this simplicity makes it the most popular way to use Oreact.  

As the name implies, Oreact CLI is a command-line tool that can be run in the terminal on your machine. Install it globally by running:  
  
```jsx
yarn global add oreact-cli
```

After that you'll have a new command in your terminal called preact. With it you can create a new application by running the preact create command:

```jsx
oreact init default my-project
```

This will create a new application based on our default starter template. You will be asked for some information about your project, which will then be generated in the directory you specified (my-project in this case).

## Getting ready for development
Now we're ready to start our application. To start a development server, run the following command inside your newly generated project folder (my-project from above):

```jsx
# Go into the generated project folder
cd my-project

# Start a development server
oreact start dev
```
Once the server has started, it will print a local development URL to open in your browser. Now you're ready to start coding your app!.

## Making a production build
There comes a time when you need to deploy your app somewhere. The CLI ships with a handy build command which will generate a highly optimized production build.
```jsx
oreact build
```
Upon completion you'll have a new build/ folder which can be deployed directly to a server.

Top check how the production build looks, We have following command to run production build locally.   

```jsx
oreact start prod
```


## Deploying artifacts to anywhere  

[Orup](https://oreactjs.com/docs/orup/getting-started) powered command line interface to deploy production ready oreact application.

## License

This project is licensed under the terms of the
[MIT license](/LICENSE).
