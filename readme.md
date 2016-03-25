# SharePoint Search using React and Webpack

This application allows you to search in your SharePoint tenant using the SharePoint Search REST API.

![Screenshot application](assets/screenshot.png)

This application has been built using [React](https://facebook.github.io/react/) and [Webpack](https://webpack.github.io) and demonstrates how you can implement the Flux architecture for unidirectional data flow in combination with leveraging SharePoint REST APIs. UX is implemented using [Office UI Fabric](http://dev.office.com/fabric).

## Prerequisites

In order to use this application you need a SharePoint 2013/2016 tenant. While this application has been built on SharePoint Online, it should work as well with SharePoint on-premises.

## Configuration

Following are the steps that you need to complete in order to see this application working in your tenant:

- clone this repository
- in the [js/stores/SearchResultsStore.js](js/stores/SearchResultsStore.js) on line 51 change the URL to the URL of your SharePoint tenant
- in the command line run

```
$ npm run dist
```

- rename `index.html` to `search.aspx`
- upload **search.aspx**, **app.dist.js** and **app.dist.js.map** to a SharePoint Document Library
- in your web browser navigate to the **search.aspx** page

![Sample search application after starting in browser](assets/initial-state.png)

## Developing

When developing you can use the `$ npm start` command. It will start a new instance of the webpack web server on **https://localhost:8443**. Please note that from that page you won't be able to connect to your SharePoint tenant but you will be able to test how the events flow in the application.