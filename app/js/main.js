function draw(data) {
    // Set dimensions of chart and plot points
    const margin = 75, width = 1200 - margin, height = 700 - margin;
    const radius = 5;

    // Add chart header
    d3.select('body')
        .append('h2')
        .attr('class', 'chart-header')
        .text('MLB Home Runs by Weight');
    
    // Create and append svg chart
    const svg = d3.select('body')
        .append('svg')
        .attr('width', width + margin + 200)
        .attr('height', height + margin)
        .append('g');

    // Bind data to plot points and append to svg chart
    d3.select('svg')
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle');

    // Bind data to tooltip panels and append to body
    d3.select('body')
        .selectAll('div')
        .data(data)
        .enter()
        .append('div');
    
    /***************************
    Create Y axis
    ***************************/

    // Get max an min homerun values from data
    const hrExtent = d3.extent(data, function(d){
        return d.hr;
    });

     // Create linear scale based on home run range
     const hrScale = d3.scaleLinear()
        .range([height, margin])
        .domain(hrExtent);
    
    // Create y axis for home runs
    const hrAxis = d3.axisLeft()
        .scale(hrScale);
    
    // Append y axis to chart
    svg.append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate( ' + margin + ', 0)')
        .call(hrAxis);

    // Label y axis
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 20)
        .attr("x", 0-(height/2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Career Home Runs");      
    
    /***************************
    Create X axis
    ***************************/

    // Get max and min weight values from data
    const weightExtent = d3.extent(data, function(d){
        return d.weight;
    });

    // Create linear scale based on weight range
    const weightScale = d3.scaleLinear()
        .range([margin, width])
        .domain(weightExtent);

    // Create x axis for weight
    const weightAxis = d3.axisBottom()
        .scale(weightScale);
    
    // Append x axis to chart
    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(weightAxis);

    // Label x axis
    svg.append("text")
        .attr("y", height + 24)
        .attr("x", (width/2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Weight in Pounds");

    /***************************
    Create tooltip panels
    ***************************/
    
    // Position tooltip panels next to corresponding plot points
    d3.selectAll('div')
        .attr('class', 'tooltip')
        .attr('id', function(d) {
            return d.name.split(' ').join('-');
        })
        .style('top', function(d) {
            return ((hrScale(d.hr))+ 50) + 'px';
        })
        .style('left', function(d) {
            return ((weightScale(d.weight)) + 20) + 'px';
        });
    
    // Append HTML element for name to tooltip panels
    d3.selectAll('div')
        .append('h3')
        .attr('class', 'tooltip-name');
    
    // Append HTML element for weight to tooltip panels
    d3.selectAll('div')
        .append('p')
        .attr('class', 'tooltip-weight');

    // Append HTML element for home runs to tooltip panels
    d3.selectAll('div')
        .append('p')
        .attr('class', 'tooltip-hr');
    
    // Add names to corresponding tooltip panels
    d3.selectAll('.tooltip-name')
        .text(function(d){
            return d.name;
        });

    // Add weights to corresponding tooltip panels
    d3.selectAll('.tooltip-weight')
        .text(function(d){
            return 'Weight: ' + d.weight + 'lbs';
        });

    // Add home runs to corresponding tooltip panels
    d3.selectAll('.tooltip-hr')
        .text(function(d){
            return 'Career homers: ' + d.hr;
        });
    
    // Position and add event handlers to trigger tooltips to plot points
    d3.selectAll('circle')
        .attr('cx', function(d) {
            return weightScale(d.weight);
        })
        .attr('cy', function(d) {
            return hrScale(d.hr);
        })
        .attr('r',radius)
        .on('mouseover', function(d){
            document.getElementById(d.name.split(' ').join('-')).classList.add('is-visible');
        })
        .on('mouseout', function(d){
            document.getElementById(d.name.split(' ').join('-')).classList.remove('is-visible');
        })
        .attr('class', 'point');
}

// Fetch and parse data from csv file and pass parsed data to draw function
d3.csv('./data/baseball_data.csv', function(d) {
    return {
        name: d.name,
        weight: +d.weight,
        hr: +d.HR
    };
}).then(draw);