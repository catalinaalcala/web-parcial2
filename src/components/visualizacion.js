import React, { Component } from "react";
import * as d3 from "d3";
import {FormattedMessage} from 'react-intl';

class Visualizacion extends Component {
  componentDidMount() {
    const url = this.props.lan === "es"? "https://gist.githubusercontent.com/jhonatan89/e379fadf8ed0f5381a2d8f8f3dea90c3/raw/e2bc20df02828d297f99558551e37959ac97a6f8/pokemon-es.json"
    : "https://gist.githubusercontent.com/jhonatan89/2089276d3ce0faceff8e55fc3459b818/raw/30ee1a77b3e328108faaaa9aaac6f2ddaa3d3711/pokemons-en.json";

    let data = []
    if(navigator.onLine){
        fetch(url).then(res=>res.json()).then(res=>{
            data = res;
            this.drawChart(data);
        });
    }
  }

  drawChart(data) {
    const canvas = d3.select(this.refs.canvas);
    const width = 700;
    const height = 500;
    const margin = { top:10, left:50, bottom: 40, right: 10};
    const iwidth = width - margin.left - margin.right;
    const iheight = height - margin.top -margin.bottom;

    const svg = canvas.append("svg");
    svg.attr("width", width);
    svg.attr("height", height);

    let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const y = d3.scaleLinear() 
        .domain([0, 1110])
        .range([iheight, 0]);

    const x = d3.scaleBand()
    .domain(data.map(d => d.name) ) 
    .range([0, iwidth])
    .padding(0.1); 

    let bars = g.selectAll("rect").data(data);

    bars.enter().append("rect")
    .attr("class", "bar")
    .style("fill", "steelblue")
    .attr("x", d => x(d.name))
    .attr("y", d => y(d.height))
    .attr("height", d => iheight - y(d.height))
    .attr("width", x.bandwidth())  

    g.append("g")
    .classed("x--axis", true)
    .call(d3.axisBottom(x))
    .attr("transform", `translate(0, ${iheight})`);  

    g.append("g")
    .classed("y--axis", true)
    .call(d3.axisLeft(y));
  }

  render() {
    return <div>
            {!navigator.onLine &&
                <h2><FormattedMessage id="notAvailable"/></h2>
            }
            <div ref="canvas"></div>
        </div>;
  }
}

export default Visualizacion;