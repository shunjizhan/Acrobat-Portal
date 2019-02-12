## Acrobat-Web-App
This is the web application interface for users to more conveniently interact with Acrobat project.


## Tech Stack
- [React](https://reactjs.org/) for frontend.
- [Node](https://nodejs.org/en/) and [Express](https://expressjs.com/) for backend.
- [Flask](http://flask.pocoo.org/) and [Flask-RESTful](https://flask-restful.readthedocs.io/en/latest/) and [Pickle](https://docs.python.org/2/library/pickle.html) for machine learning RESTful APIs.
- [MongoDB](https://www.mongodb.com/) for data storage. Currently we are using the [mLab](https://mlab.com) free version of cloud MongoDB, and may switch to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) in the future.
[Amazon AWS](https://aws.amazon.com/) for future deployment.

## Run
First add [Allow-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi) chrome extension. So we can query database using localhost without Allow-Control-Allow-Origin problem.

### install
```
./install.sh
```

### start running the app
for production
```
npm start
```

for development, start each service separately
```
cd view/ && npm start
```
```
cd server/ && node server.js
```
```
cd ML-API/ && python api-server.py
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
