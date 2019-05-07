# import pickle
import flask

from flask import request
from flask_restful import Api, Resource
# from nltk import word_tokenize, pos_tag

from flair.data import Sentence
from flair.models import SequenceTagger

from pprint import pprint


class Predict(Resource):
    def __init__(self, model):
        self.model = model

    def get(self):
        # prepare the query
        params = request.args
        query = params['query']
        print('query:   ', query)

        query = query.split('\\n')

        # predict
        all_tokens = []
        all_entities = []
        for q in query:
            sen = Sentence(q)

            self.model.predict(sen)
            tokens = []
            entity_types = []
            for t in sen.tokens:
                token = t.text
                entity = t.tags['ner'].value
                tokens.append(token)
                entity_types.append(entity)

            all_tokens.append(tokens)
            all_entities.append(entity_types)

        pprint(all_tokens)
        pprint(all_entities)

        # preparing a response object and storing the model's predictions
        response = {
            'tokens': all_tokens,
            'entity_types': all_entities
        }

        # sending our response object back as json
        return flask.jsonify(response)


if __name__ == '__main__':
    model = SequenceTagger.load_from_file('best-model.pt')

    app = flask.Flask(__name__)
    api = Api(app)
    api.add_resource(Predict, '/', resource_class_kwargs={'model': model})
    app.run(debug=True, port=5000)

