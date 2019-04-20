#!/usr/bin/env python
# -*- coding: utf-8 -*-

import nltk
from nltk import word_tokenize, pos_tag
import pprint as pp



def add_tag(in_file):
    name, extention = in_file.split('.')
    out_file = name + '_new.' + extention

    # download required libs
    nltk.download('punkt')
    nltk.download('averaged_perceptron_tagger')

    # add tag
    with open(out_file, 'w+') as out:
        with open(in_file, 'r') as f:
            sentence = []
            types = []

            for line in f.readlines():
                if line == '-DOCSTART- -X- -X- -X- O':
                    continue
                elif line != '\n':
                    line = line.split()
                    word, _type = line[0], line[1]
                    sentence.append(word)
                    types.append(_type)
                else:
                    sentence = ' '.join(sentence).decode("utf8")
                    prediction = pos_tag(sentence.split())
                    # res = []

                    for i, _tuple in enumerate(prediction):
                        (word, tag) = _tuple
                        _type = types[i]

                        new_line = ' '.join([word, tag, _type]).encode("utf8")
                        out.write(new_line)
                        out.write('\n')


                    # print(sentence)
                    # print(res)
                    # print('')
                    out.write('\n')

                    sentence = []
                    types = []


all_files = ['train.tsv', 'test.tsv', 'devel.tsv']
for file in all_files:
    add_tag(file)