## Acrobat-Web-App
This is the web application interface for users to more conveniently interact with Acrobat project.

## Tech Stack
- React for frontend.
- NodeJS (Express) for backend.
- Cloud MongoDB for data storage. Currently we are using the mlab free version of cloud MongoDB, and may swtich to more official Mongo Atlas in the future.

## Run
If don't have create-react-app installed yet
```
npm i -g create-react-app
```

Then
```
cd Acrobat-Web-App
npm install
npm start
```

## Notes
- If encounter Allow-Control-Allow-Origin problems when interacting with database, install [Allow-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi) chrome extension.
