import * as d3 from 'd3';
import {sankey, sankeyLinkHorizontal} from 'd3-sankey';
import energy from './energy';
import FAKE_SFD_GRAPH from './fake-sfd-graph';
import REAL_SFD_GRAPH from './sfd-graph';

function compareNodes(n1, n2) {
    return n2.count - n1.count;
}

function onReady() {
    console.log("onready");
    console.log("energy", energy);

    const width = 975;
    const height = 1000;

    // const data = energy;
    const data = REAL_SFD_GRAPH;

    const generator = sankey()
          .nodeWidth(15)
          .nodePadding(10)
          .extent([[1, 5], [width - 1, height - 5]])
          .nodeSort(compareNodes);

    const graph = generator(data);

    console.log("graph is %o", graph);

    const svg = d3.select('svg');

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

    link.append("path")
        .attr("d", sankeyLinkHorizontal())
        .attr("stroke",  "#aaaaaa")
        .attr("stroke-width", d => Math.max(1, d.width));

  link.append("title")
      .text(d => `${d.source.name} → ${d.target.name}\n${d.value}`);

}

document.addEventListener('DOMContentLoaded', onReady);
