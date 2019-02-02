## Acrobat-Web-App
This is the web application interface for users to more conveniently interact with Acrobat project.


## Tech Stack
- [React](https://reactjs.org/) for frontend.
- [Node + Express](https://nodejs.org/en/) for backend.
- Cloud MongoDB for data storage. Currently we are using the [mLab](https://mlab.com) free version of cloud MongoDB, and may swtich to more official [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) in the future.
- [Amazon AWS](https://aws.amazon.com/) to wrap and serve machine learning RESTful APIs.


## Run
<!-- If don't have create-react-app installed yet
```
npm i -g create-react-app
``` -->

### install
```
cd server/
npm install

cd ../view
npm install

cd ..
npm install
```
or use the script
```
./install.sh
```

### start the app
```
npm start
```


## Notes
- If encounter Allow-Control-Allow-Origin problems when interacting with database, install [Allow-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi) chrome extension.
- If copy the whole project repo, use `cp -a` instead of `cp -r`, since the latter will cause some [mysterious symbolink problem](https://github.com/facebook/create-react-app/issues/200).
