# 📝NOTE APP  
Simple app where you can (CRUD) create, read, update add delete notes.

![note app](/img/note.gif)

# 🥞 Teck Stack
_BackEnd_:
[NodeJs](https://nodejs.org/en/)
[Json-Server](https://www.npmjs.com/package/json-server#https)

_FrontEnd_:
HTML
CSS
Javascript

### Installation
You need to create a server with nodejs installed.
After that you need to install *json-server* in your server.

>npm install json-server --save-dev

You can run json-server for dev purpose like this
from terminal
```
json-server --watch db.json --port 3004
```
Default port 3000.
In production you can also add json-server to your nodejs server.js like this:
```
// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
 
server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
});
```
In production you can also configure the [ngnix](https://www.nginx.com/) on your server liket this:

```
location /notes {
 proxy_pass http://localhost:3002;
 proxy_http_version 1.1;
 proxy_set_header Upgrade $http_upgrade;
 proxy_set_header Connection 'upgrade';
 proxy_set_header Host $host;
 proxy_cache_bypass $http_upgrade;
 }
```

### Youtube creation
[YouTube Part 1](https://youtu.be/jgdCM2vicXM)

### License
[MIT](https://choosealicense.com/licenses/mit/)

##### with ❤️ @lexpaper gd.

