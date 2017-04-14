# Files description

## data

`data` folder consists the data used in this project. 

* `list.tsv` is a tsv file of all the music's name and author.
* `gttm` folder consists all the music, including the original music in `MusicXML` format, the group analysis result, the metrical analysis result, and the time-span reduction result.
* `midi` folder consists `midi` file and `wav` audio file of all the music above.

## tools

* `GTTMEditorWebStart_1_4` is the GTTM analizer from [`http://gttm.jp`](http://gttm.jp). It will take music in `MusicXML` format and do group analysis, metrical analysis, and time-span reduction.
* `treeToJson.ipynb` is a Jupiter notebook file that is used for converting time-span tree data in XML format to JSON format. Time-span tree only has limited information, so it also do lookups to obtain the note information of a time-span tree.

## webapp

`webapp` is the web application to calculate tree editing distance, MDS dimention reduction, and visualization. To run it, `Node.js` and `npm` should be installed. 

1. run `npm -v` to make sure npm is installed.
2. goto the `webapp` folder, and run `npm install`
3. then run `bower install`
4. till this point, all the packages should be installed.
5. run `grunt serve` to start the local webserver
6. a browser window should popup and it will show the webapp.