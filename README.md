## Acrobat-Web-App
This is the web application interface for users to more conveniently interact with Acrobat project.


## Tech Stack
- [React](https://reactjs.org/) for frontend.
- [Node + Express](https://nodejs.org/en/) for backend.
- Cloud MongoDB for data storage. Currently we are using the [mLab](https://mlab.com) free version of cloud MongoDB, and may swtich to more official [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) in the future.
- [Amazon AWS](https://aws.amazon.com/) to wrap and serve machine learning RESTful APIs.

## Run
First add [Allow-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi) chrome extension. So we can query database using localhost without Allow-Control-Allow-Origin problem.

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

### start running the app
```
npm start
```

### start compiling SASS (for frontend)
```
sass --watch view/src/components/ --style compressed
```
or
```
make compile
```


## Notes
- If copy the whole project repo, use `cp -a` instead of `cp -r`, since the latter will cause some [mysterious symbolink problem](https://github.com/facebook/create-react-app/issues/200).
