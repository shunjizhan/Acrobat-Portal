#!/bin/bash
echo "
----------------------------------------
฿ installing node modules for server ...
----------------------------------------"
cd server/
npm install



echo "
--------------------------------------------------------------
฿ installing node modules for React, this may take a while ...
--------------------------------------------------------------"
cd ../view/
npm install



echo "
----------------------------------------------
฿ installing machine learning api packages ...
----------------------------------------------"
cd ../ML-API
python2.7 -m pip install -r requirements.txt



echo "
-------------------------------------
฿ installing general node modules ...
-------------------------------------"
cd ..
npm install



echo "
------------------------------------
฿ all node modules were installed !!
------------------------------------"