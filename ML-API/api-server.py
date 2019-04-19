import pandas as pd
import pickle
import flask

from flask import request
from flask_restful import Api, Resource
from sklearn import linear_model


def train():
    # loading and separating our wine dataset into labels and features
    df = pd.read_csv('winequality-red.csv', delimiter=";")
    label = df['quality']
    features = df.drop('quality', axis=1)

    # defining our linear regression estimator and training it with our wine data
    regr = linear_model.LinearRegression()
    regr.fit(features, label)

    # serializing our model to a file called model.pkl
    pickle.dump(regr, open("model.pkl", "wb"))


class Predict(Resource):
    def get(self):
        params = request.args
        if params:
            print(params['query'])
        else:
            print('params is none')

        query = params['query']
        query = [[(word, '', '') for word in query.split()]]
        # print(query)

        crf = pickle.load(open("crf_model.pkl", "r"))
        prediction = crf.predict(query)

        # preparing a response object and storing the model's predictions
        response = {
            'prediction': prediction
        }

        # sending our response object back as json
        return flask.jsonify(response)


if __name__ == '__main__':
    app = flask.Flask(__name__)
    api = Api(app)
    api.add_resource(Predict, '/')
    app.run(debug=True, port=5000)

