// @flow

import React, { Component } from 'react';
import d3 from 'd3';
import $ from 'jquery';
import 'jquery.tipsy';

import type { Site as SiteType } from 'components/Sites/Site.type';

window.$ = window.jQuery = $;


type SitesData = Array<SiteType>;

type Props = {
  sites: SitesData,
};

const CONTAINER_ID = 'd3-graph';

class Analyze extends Component<Props> {
  componentDidMount() {
    const {
      sites,
    } = this.props;

    this.updateGraph(sites);
  }

  updateGraph(siteData: SitesData): void {
    const margin = {
      top: 20,
      right: 80,
      bottom: 30,
      left: 50,
    };
    const width = 900 - margin.left - margin.right;
    const height = 440 - margin.top - margin.bottom;

    const svg = d3.select(`#${CONTAINER_ID}`)
      .append('svg')
      .attr('id', 'chart')
      .attr('viewBox', '0 0 960 500')
      .attr('preserveAspectRatio', 'xMidYMid')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const listOfSiteColors = [];

    function updateData(data) {
      const parseDate = d3.time.format('%Y-%m-%dT%H:%M:%S.%LZ').parse;

      const x = d3.time.scale()
        .range([0, width]);

      const y = d3.scale.linear()
        .range([height, 0])
        .domain([0, 100]);

      const color = d3.scale.category20();

      const xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom')
        .outerTickSize(0);

      const yAxis = d3.svg.axis()
        .scale(y)
        .orient('left')
        .outerTickSize(0);

      const line = d3.svg.line()
        .interpolate('linear')
        .x(d => x(d.created_at))
        .y(d => y(d.domain_authority));

      let fullDataSet = [];
      for (let key in data) {
        fullDataSet = fullDataSet.concat.apply(fullDataSet, data[key].metrics);
      }

      fullDataSet.forEach((d) => {
        d.created_at = parseDate(d.created_at);
        d.domain_authority = +d.domain_authority;
      });

      x.domain(d3.extent(fullDataSet, d => d.created_at));
      y.domain(d3.extent(fullDataSet, d => d.domain_authority));

      if (svg.selectAll('.y.axis')[0].length < 1) {
        svg.append('g')
          .attr('class', 'y axis')
          .call(yAxis)
          .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '.71em')
          .style('text-anchor', 'end')
          .text('DA ');
      } else {
        svg.selectAll('.y.axis')
          .transition()
          .duration(1500)
          .call(yAxis);
      }

      if (svg.selectAll('.x.axis')[0].length < 1) {
        svg.append('g')
          .attr('class', 'x axis')
          .call(xAxis)
          .attr('transform', `translate(0, ${height})`)
          .call(xAxis);
      } else {
        svg.selectAll('.x.axis')
          .transition()
          .duration(1500)
          .call(xAxis);
      }

      const myNewData = [];
      const listOfSiteNames = [];
      data.forEach((site) => {
        myNewData.push(site.metrics);

        listOfSiteNames.push(site.title);
      });

      const lines = d3.selectAll('.line');
      if (lines[0] && lines[0].length < 1) {
        const myNewSvg = svg.selectAll('.line').data(myNewData);
        myNewSvg.enter()
          .append('path')
          .attr('class', 'line')
          .style('stroke', (d, i) => {
            listOfSiteColors.push(color(i));
            return color(i);
          })
          .style('fill', 'none')
          .attr('d', line)
          .attr('id', (d, i) => i)
          .append('svg:title')
          .text((d, i) => listOfSiteNames[i]);

        const legend = svg.append('g')
          .attr('class', 'legend')
          .selectAll('.color')
          .data(listOfSiteColors)
          .enter()
          .append('g');

        legend.append('text')
          .attr('x', (d, i) => width + 50)
          .attr('y', (d, i) => 22.21 * (i + 1))
          .style('font-size', '12px')
          .text((d, i) => listOfSiteNames[i]);

        legend.append('rect')
          .attr('x', (d, i) => width + 25)
          .attr('y', (d, i) => 12 + 22 * i)
          .attr('width', 15)
          .attr('height', 15)
          .style('fill', (d, i) => d);

        const myCircleGroups = svg.selectAll('circle')
          .data(myNewData)
          .enter()
          .append('g')
          .attr('class', 'dot')
          .attr('id', (d, i) => i)
          .selectAll('circle')
          .data((d, i) => myNewData[i]);

        myCircleGroups.enter()
          .append('circle')
          .attr('cx', d => x(d.created_at))
          .attr('cy', d => y(d.domain_authority))
          .attr('fill', (d, i) => {
            return listOfSiteColors[$(this).closest('g').attr('id')];
          })
          .attr('r', 4)
          .attr('id', d => d.domain_authority);
      } else {
        svg.selectAll('.line')
          .data(myNewData)
          .transition()
          .duration(1500)
          .attr('d', line);
        const newSvg = svg.selectAll('.dot')
          .data(myNewData);
        const newCircles = newSvg.selectAll('circle')
          .data((d, i) => myNewData[i]);

        newCircles.enter()
          .append('circle')
          .attr('cx', d => x(d.created_at))
          .attr('cy', d => y(d.domain_authority))
          .attr('fill', () => listOfSiteColors[$(this).closest('g').attr('id')])
          .attr('r', 4)
          .attr('id', d => d.domain_authority);

        newCircles.transition()
          .duration(1500)
          .attr('cx', d => x(d.created_at))
          .attr('cy', d => y(d.domain_authority));

        newCircles.exit()
          .remove();
      }

      $('circle').tipsy({
        gravity: 'w',
        html: true,
        title: () => $(this).attr('id'),
      });
    }

    updateData(siteData);
  }

  render() {
    return (
      <div>
        <h1>
          Analyze
        </h1>
        <div id='d3-graph'>
        </div>
      </div>
    );
  }
}

export default Analyze;
