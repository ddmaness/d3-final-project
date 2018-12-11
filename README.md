# [MLB Home Runs by Weight](http://weight-home-runs.surge.sh/)

## Summary

This data visualization is a scatter plot charting Major League Baseball player career home runs in relation to their weight based on [this data set](https://s3.amazonaws.com/udacity-hosted-downloads/ud507/baseball_data.csv).  

## How to Run

Clone or download this repository and run npm install in the root project directory. After all dependencies are downloaded run gulp to start the development server and enable automatic reloading on changes to Sass, JS, or html files. gulp dist will optimize the images, and JS files for production and copy these optimized files to the production dist directory.

## Design

I chose a scatter plot so that users could still access (via a tooltip) the infomation on individual players by hovering over the data points. I considered using a line graph but decided that the data would not be representative of the actual trend near the high and low ends of the weight range due to relatively few data points.

## Resources

The following resources were used in the construction of this chart

- [The Data Visualization and D3.js](https://www.udacity.com/course/data-visualization-and-d3js--ud507) course from Udacity
- [The d3 API documentation](https://github.com/d3/d3/blob/master/API.md#scales-d3-scale)
- [This bl.oks blog post](https://bl.ocks.org/d3noob/23e42c8f67210ac6c678db2cd07a747e)  on axis labels