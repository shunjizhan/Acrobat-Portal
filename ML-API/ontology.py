#!/usr/bin/env python
# -*- coding: utf-8 -*-

import pickle

import matplotlib.pyplot as plt
plt.style.use('ggplot')

from itertools import chain

import nltk
nltk.download('conll2002')
import sklearn
import scipy.stats
from sklearn.metrics import make_scorer
from sklearn.cross_validation import cross_val_score
from sklearn.grid_search import RandomizedSearchCV

import sklearn_crfsuite
from sklearn_crfsuite import scorers
from sklearn_crfsuite import metrics

import pprint as pp


def word2features(sent, i):
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
    return [word2features(sent, i) for i in range(len(sent))]

def sent2labels(sent):
    return [label for token, postag, label in sent]

def sent2tokens(sent):
    return [token for token, postag, label in sent]



def train(train_file):
    # prepare the raw data
    '''
    list of list of tuple
    每个tuple是一行
    小list是一句话
    大list是整个document

    [
     [(u'Chevenement', u'NP', u'B-PER'),
      (u',', u'Fc', u'O'),
      (u'que', u'PR', u'O'),
      (u'se', u'P0', u'O'),
      (u'reuni\xf3', u'VMI', u'O'),
      (u'hoy', u'RG', u'O'),
      (u'en', u'SP', u'O'),
      (u'la', u'DA', u'O'),
      (u'ciudad', u'NC', u'O'),
      (u'espa\xf1ola', u'AQ', u'O'),
      (u'de', u'SP', u'O'),
      (u'Santander', u'NC', u'B-LOC')],
      [],
      []
      ]

    '''
    train_sents = list(nltk.corpus.conll2002.iob_sents(train_file))
    X_train = [sent2features(s) for s in train_sents]
    y_train = [sent2labels(s) for s in train_sents]

    # train the model
    crf_model = sklearn_crfsuite.CRF(
        algorithm='lbfgs',
        c1=0.1,
        c2=0.1,
        max_iterations=100,
        all_possible_transitions=True
    )
    crf_model.fit(X_train, y_train)

    # save the model
    pickle.dump(crf_model, open("crf_model.pkl", "wb"))


def predict(test_file):
    # prepare the data
    test_sents = list(nltk.corpus.conll2002.iob_sents(test_file))
    X_test = [sent2features(s) for s in test_sents]
    y_test = [sent2labels(s) for s in test_sents]

    # predict
    crf = pickle.load(open("crf_model.pkl", "r"))

    labels = list(crf.classes_)
    labels.remove('O')

    y_pred = crf.predict(X_test)

    # evaluate the model
    metrics.flat_f1_score(y_test, y_pred, average='weighted', labels=labels)

    sorted_labels = sorted(labels, key=lambda name: (name[1:], name[0]))
    print(metrics.flat_classification_report(
        y_test, y_pred, labels=sorted_labels, digits=3
    ))


# data need to be put in /Users/shunji/nltk_data/corpora/conll2002/
# train('all.tsv')
predict('train_new.tsv')









