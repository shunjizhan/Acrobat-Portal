import pandas as pd
import pickle
import flask

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
        # return {'hello': 'world'}

        # feature_array = request.get_json()['feature_array']
        feature_array = [7.4, 0.66, 0, 1.8, 0.075, 13, 40, 0.9978, 3.51, 0.56, 9.4]

        # loading a model from a file called model.pkl
        model = pickle.load(open("model.pkl", "r"))

        # our model rates the wine based on the input array
        prediction = model.predict([feature_array]).tolist()

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
    app.run(debug=True)

