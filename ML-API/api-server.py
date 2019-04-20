import pandas as pd
import pickle
import flask

from flask import request
from flask_restful import Api, Resource
from sklearn import linear_model
from nltk import word_tokenize, pos_tag


def _word2features(sent, i):
    word = sent[i][0]
    postag = sent[i][1]

    features = {
        'bias': 1.0,
        'word.lower()': word.lower(),
        'word[-3:]': word[-3:],
        'word[-2:]': word[-2:],
        'word.isupper()': word.isupper(),
        'word.istitle()': word.istitle(),
        'word.isdigit()': word.isdigit(),
        'postag': postag,
        'postag[:2]': postag[:2],
    }
    if i > 0:
        word1 = sent[i-1][0]
        postag1 = sent[i-1][1]
        features.update({
            '-1:word.lower()': word1.lower(),
            '-1:word.istitle()': word1.istitle(),
            '-1:word.isupper()': word1.isupper(),
            '-1:postag': postag1,
            '-1:postag[:2]': postag1[:2],
        })
    else:
        features['BOS'] = True

    if i < len(sent)-1:
        word1 = sent[i+1][0]
        postag1 = sent[i+1][1]
        features.update({
            '+1:word.lower()': word1.lower(),
            '+1:word.istitle()': word1.istitle(),
            '+1:word.isupper()': word1.isupper(),
            '+1:postag': postag1,
            '+1:postag[:2]': postag1[:2],
        })
    else:
        features['EOS'] = True

    return features


def sent2features(sent):
    return [_word2features(sent, i) for i in range(len(sent))]



class Predict(Resource):
    def get(self):
        params = request.args
        if params:
            print(params['query'])
        else:
            print('params is none')

        # prepare the query
        query = params['query']
        # split each sentence
        query = query.split('\n')
        # add tag to each sentence tokens
        query = [pos_tag(sentence.split()) for sentence in query]
        # change to machine learning api format
        query = [sent2features(s) for s in query]

        # predict the entity types
        crf = pickle.load(open("crf_model.pkl", "r"))
        prediction = crf.predict(query)

        # preparing a response object and storing the model's predictions
        response = {
            'entity_types': prediction
        }

        # sending our response object back as json
        return flask.jsonify(response)


if __name__ == '__main__':
    app = flask.Flask(__name__)
    api = Api(app)
    api.add_resource(Predict, '/')
    app.run(debug=True, port=5000)

