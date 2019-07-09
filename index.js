import * as d3 from 'd3';
import {sankey, sankeyLinkHorizontal} from 'd3-sankey';
import energy from './energy';
import FAKE_SFD_GRAPH from './fake-sfd-graph';
import MARITIME_MILITARY from './military-maritime.js';
import CHASE_RIVER from './chase-river.js';

function makeCompare(sortKey) {
    return function (n1, n2) {
        return n2[sortKey] - n1[sortKey];
    };
}

function drawChart(sortKey, data) {
    const width = 975;
    const height = 1000;

     const generator = sankey()
          .nodeWidth(15)
          .nodePadding(10)
          .extent([[1, 5], [width - 1, height - 5]])
          .nodeSort(makeCompare(sortKey));

    const graph = generator(data);

    console.log("graph is %o", graph);

    const svg = d3.select('svg');
    svg.selectAll('*').remove();

    console.log("selection is %o", svg);

    // Draw the nodes as rectangles
    svg.append("g")
        .attr("stroke", "#000")
        .selectAll("rect")
        .data(graph.nodes)
        .join("rect")
        .attr("x", d => d.x0)
        .attr("y", d => d.y0)
        .attr("height", d => d.y1 - d.y0)
        .attr("width", d => d.x1 - d.x0)
        .attr("fill", d => "green")
        .append("title")
        .text(d => `${d.name}\n${d.value}`);


    // Draw labels for the nodes
    svg.append("g")
        .style("font", "10px sans-serif")
        .selectAll("text")
        .data(graph.nodes)
        .join("text")
        .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
        .attr("y", d => (d.y1 + d.y0) / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
        .text(d => d.name);



    const link = svg.append("g")
          .attr("fill", "none")
          .attr("stroke-opacity", 0.5)
          .selectAll("g")
          .data(graph.links)
          .join("g")
          .style("mix-blend-mode", "multiply");

    const color = d3.scaleOrdinal(d3.schemePastel1);

    link.append("path")
        .attr("d", sankeyLinkHorizontal())
        .attr("stroke",  d => color(d.source.name))
        .attr("stroke-width", d => Math.max(1, d.width));

    link.append("title")
        .text(d => `${d.source.name} → ${d.target.name}\n${d.value}`);
}

const dataSets = {
    'setA': MARITIME_MILITARY,
    'setB': CHASE_RIVER
};

function onReady() {
    console.log("onready");
    console.log("energy", energy);


    document.querySelector('#controls').addEventListener('change', e => {
        const sortKey = document.querySelector('input[name="sort"]:checked').value;
        const datasetName = document.querySelector('input[name="dataset"]:checked').value;

        console.log("sortkey is %o", sortKey);
        console.log("datasetName is %o", datasetName);
        drawChart(sortKey, dataSets[datasetName]);
    });                                                   

    drawChart('count', CHASE_RIVER);
}

document.addEventListener('DOMContentLoaded', onReady);
