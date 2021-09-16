sfmc-jbca-react
============

Salesforce Marketing Cloud Journey Builder Custom Activity 

## Overview ##

The purpose of this package is to provide easy way for interaction between MC Journey Builder and custom activity UI written on React. 

## How to use

##### Step 1. Install the package

```
    npm i sfmc-jbca-react
```

##### Step 2. Wrap your app inside a `JourneyBuilderProvider` component

```
    ReactDOM.render(
        <React.StrictMode>
            <JourneyBuilderProvider>
                <App />
            </JourneyBuilderProvider>
        </React.StrictMode>,
        document.getElementById('root')
    );
```

##### Step 1. Use `useJourneyBuilder` hook in your functional components

```
    const {activity, interaction, getTokens, updateActivity, addEventListener} = useJourneyBuilder();
```

## Links ##

[`Postmonger`](https://github.com/kevinparkerson/postmonger)
[`Salesforce MC Postmonger Events Reference`](https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-app-development.meta/mc-app-development/using-postmonger.htm)