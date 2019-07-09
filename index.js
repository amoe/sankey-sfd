import * as d3 from 'd3';
import {sankey, sankeyLinkHorizontal} from 'd3-sankey';
import energy from './energy';

function onReady() {
    console.log("onready");
    console.log("energy", energy);

    const width = 975;
    const height = 600;

    const generator = sankey()
          .nodeWidth(15)
          .nodePadding(10)
          .extent([[1, 5], [width - 1, height - 5]]);
    const graph = generator(energy);

    console.log("graph is %o", graph);

    const svg = d3.select('svg');

    console.log("selection is %o", svg);

    svg.append("g")
        .attr("stroke", "#000")
        .selectAll("rect")
        .data(graph.nodes)
        .join("rect")
        .attr("x", d => d.x0)
        .attr("y", d => d.y0)
        .attr("height", d => d.y1 - d.y0)
        .attr("width", d => d.x1 - d.x0)
        .attr("fill", d => "black")
        .append("title")
        .text(d => `${d.name}\n${d.value}`);

}

document.addEventListener('DOMContentLoaded', onReady);
