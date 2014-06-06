# makeFit
Mainly getting this into a stash repo for easy sharing.  This is currently maintained as part of the LDS.org project, and so this will likely fall behind our version until we are able to make this part of our daily process. Hey, at least I'm up front about it :)

## Requirements
This is a jQuery UI Widget Factory based plugin, and so will need [ui.widget.js](http://dev.ldscdn.org/scripts/ui/1.9.1/jquery.ui.widget.min.js) to function.

## Changelog
### 1.3.0
* Added firstClass and lastClass to elements even when there is only 1 per row. Other scripts still need them for doing stuff.

### 1.2.0
* Added selectorExclude option. Sometimes there are elements you don't want included (cms added things, positioned elements, etc)