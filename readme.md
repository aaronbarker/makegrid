# makeGrid
========
makeGrid is a jQuery plugin for dynamically figuring out how many of an elements children will fit within the current width based on their min-width. It uses the first child to determine the width as well as the standard `margin-right` applied to it. This is used in the calculation of how many children will fit in a row.

When making an update, rev version in package.json and run grunt in the folder to create new dist folder versions (full and minified).

## Requirements
This is a jQuery UI Widget Factory based plugin, and so will need [ui.widget.js](http://dev.ldscdn.org/scripts/ui/1.9.1/jquery.ui.widget.min.js) to function.

```
<script src="jquery.js"></script>  
<script src="jquery.ui.widget.js"></script>
<script src="lds.makeGrid.js"></script>
```

## HTML
You call the script on the parent element and it will automatically set the size for its children.

```
<div class="grid-me">
	<div>Child 1</div>
	...
	<div>Child 100</div>
</div>
```
## CSS
The plugin will dynamically determine rows and place a class on the first of the row and the last element of the row.  If there is only one per row that will receive both classes.

At a minimum the `firstClass` should `clear:left;` and the `lastClass` should `margin-right:0`. The `clear:left` keeps any wrapping elements from hanging on taller elements in the previous row. The `margin-right:0` allows the last element to be flush right with the parent element.

Make sure all children are floated and have a `min-width` or else it can cause the script to hang.

## makeGrid API

### firstClass
Type: `string`
Default: `first`

The class that will be applied to the first element of each row

### lastClass
Type: `string`
Default: `last`

The class that will be applied to the last element of each row

### selectorExclude
Type: `selector`
Default: `false`

Selector to choose elements that should NOT be included in figuring out rows. Sometimes there are elements you don't want included (cms added things, positioned elements, etc)

### setupResize
Type: `function`
Default: see code

Sets up the resize event for the script. Declared as an option so other resize solutions can be used, such as a throttle

## Changelog
### 1.3.1
* Changing console.debug statements to console.warn statements

### 1.3.0
* Added firstClass and lastClass to elements even when there is only 1 per row. Other scripts still need them for doing stuff.

### 1.2.0
* Added selectorExclude option. Sometimes there are elements you don't want included (cms added things, positioned elements, etc)