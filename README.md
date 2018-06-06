# Readable React-Redux Project

This is the project which controls the post and comment board with redux store and react component.
## Start Developing

## TL;DR

To get started developing right away:
* start the api server using
 `cd api-server `
 `node server `
 * move to frontend folder with  `cd front end`
* install all project dependencies with `npm install`
* start the development server with `npm start`

## Composition of reducer
* This redux app build redux store with 2 main reducer.DataCenterReducer which holds category and post information and PostReducer which hold post and comments information.
```bash
├──
   ├── DataCenterReducer
   └── PostReducer
```

## Main View
* This App hold 3 main views and Edit and Add view for subcomponent
```bash
├──
   ├── Default View
        ├── Add Post View
   ├── Category View
        ├── Add Post View
   └── Post View
        ├── Edit Post View
        ├── Add Comment View
        └── Edit Comment View


## License
Redable is open source software [licensed as MIT](https://github.com/todhm/readable/blob/master/LICENSE).
