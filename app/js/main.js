function draw(data) {
    const margin = 75, width = 1200 - margin, height = 700 - margin;
    const radius = 4;

    d3.select('body')
        .append('h2')
        .text('Heavy Hitters');

    const svg = d3.select('body')
        .append('svg')
        .attr('width', width + margin + 200)
        .attr('height', height + margin)
        .append('g')
        .attr('class', 'chart');

    d3.select('svg')
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle');

    d3.select('body')
        .selectAll('div')
        .data(data)
        .enter()
        .append('div');
    
    const hrExtent = d3.extent(data, function(d){
        return d.hr;
    });

    const weightExtent = d3.extent(data, function(d){
        return d.weight;
    });

    const hrScale = d3.scaleLinear()
        .range([height, margin])
        .domain(hrExtent);

    const weightScale = d3.scaleLinear()
        .range([margin, width])
        .domain(weightExtent);

    const weightAxis = d3.axisBottom()
        .scale(weightScale);

    const hrAxis = d3.axisLeft()
        .scale(hrScale);
    
    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(weightAxis);

    svg.append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate( ' + margin + ', 0)')
        .call(hrAxis);

    d3.selectAll('div')
        .attr('class', 'info-panel')
        .attr('id', function(d) {
            return d.name.split(' ').join('-');
        })
        .style('top', function(d) {
            return ((hrScale(d.hr))+ 50) + 'px';
        })
        .style('left', function(d) {
            return ((weightScale(d.weight)) + 20) + 'px';
        });
    
    d3.selectAll('div')
        .append('h3')
        .attr('class', 'info-panel-name');
    
    d3.selectAll('div')
        .append('p')
        .attr('class', 'info-panel-weight');

    d3.selectAll('div')
        .append('p')
        .attr('class', 'info-panel-hr');
    
    d3.selectAll('.info-panel-name')
        .text(function(d){
            return d.name;
        });

    d3.selectAll('.info-panel-weight')
        .text(function(d){
            return 'Weight: ' + d.weight + 'lbs';
        });

    d3.selectAll('.info-panel-hr')
        .text(function(d){
            return 'Career homers: ' + d.hr;
        });
    
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

d3.csv('./data/baseball_data.csv', function(d) {
    return {
        name: d.name,
        weight: +d.weight,
        hr: +d.HR
    };
}).then(draw);