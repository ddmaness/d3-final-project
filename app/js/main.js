function draw(data) {
    const margin = 75, width = 1200 - margin, height = 700 - margin;
    const radius = 4;

    const svg = d3.select('body')
        .append('svg')
        .attr('width', width + margin)
        .attr('height', height + margin)
        .append('g')
        .attr('class', 'chart');

    d3.select('svg')
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle');

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

    d3.selectAll('circle')
        .attr('cx', function(d) {
            return weightScale(d.weight);
        })
        .attr('cy', function(d) {
            return hrScale(d.hr);
        })
        .attr('r', function(d) {
            return radius;
        })
        .attr('class', 'point');
}


d3.csv('./data/baseball_data.csv', function(d) {
    return {
        name: d.name,
        weight: +d.weight,
        hr: +d.HR
    }
}).then(draw);