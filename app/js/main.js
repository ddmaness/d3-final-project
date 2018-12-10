function draw(data) {
    console.table(data);
}


d3.csv('./data/baseball_data.csv', draw);