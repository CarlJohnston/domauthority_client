import d3 from 'd3';
import $ from 'jquery';


const X_MIN = 0;
const Y_MIN = 0;
const Y_MAX = 100;

const X_TICK_SIZE = 0;
const Y_TICK_SIZE = 0;

class SiteGraph {
  constructor(selector, options) {
    this.options = Object.assign({
      time: '%Y-%m-%d',
    }, options);

    const margin = {
      top: 50,
      right: 150,
      bottom: 50,
      left: 100,
    };
    this.width = 800;
    this.height = 400;
    const viewportWidth = this.width + margin.left + margin.right;
    const viewportHeight = this.height + margin.top + margin.bottom;

    this.svg = d3.select(`#${selector}`)
      .append('svg')
      .attr('id', 'chart')
      .attr('viewBox', `0 0 ${viewportWidth} ${viewportHeight}`)
      .attr('preserveAspectRatio', 'xMidYMid')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    this.siteColors = [];

    $('circle').tipsy({
      gravity: 'w',
      html: true,
      title: () => $(this).attr('id'),
    });
  }

  update(sites) {
    const parseDate = d3.time.format(this.options.time).parse;

    const xInterpolator = d3.time.scale()
      .range([X_MIN, this.width]);

    const yInterpolator = d3.scale.linear()
      .domain([Y_MIN, Y_MAX])
      .range([this.height, Y_MIN]);

    const colorInterpolator = d3.scale.category20();

    const xAxis = d3.svg.axis()
      .scale(xInterpolator)
      .orient('bottom')
      .outerTickSize(X_TICK_SIZE);

    const yAxis = d3.svg.axis()
      .scale(yInterpolator)
      .orient('left')
      .outerTickSize(Y_TICK_SIZE);

    const lineInterpolator = d3.svg.line()
      .interpolate('linear')
      .x(d => xInterpolator(d.created_at))
      .y(d => yInterpolator(d.domain_authority));

    const metrics = sites.flatMap((site) => {
      return site.metrics;
    });
    metrics.forEach((metric) => {
      metric.created_at = parseDate(metric.created_at);
      metric.domain_authority = parseInt(metric.domain_authority, 10);
    });

    xInterpolator.domain(d3.extent(metrics, d => d.created_at));
    yInterpolator.domain(d3.extent(metrics, d => d.domain_authority));

    const yAxes = this.svg.selectAll('.y.axis');
    if (yAxes[0] &&
        yAxes[0].length < 1) {
      this.svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', 0 - this.height / 2)
        .attr('dy', '-60px')
        .text('Domain Authority');
    } else {
      this.svg.selectAll('.y.axis')
        .transition()
        .duration(1500)
        .call(yAxis);
    }

    const xAxes = this.svg.selectAll('.x.axis');
    if (xAxes[0] &&
        xAxes[0].length < 1) {
      this.svg.append('g')
        .attr('class', 'x axis')
        .call(xAxis)
        .attr('transform', `translate(0, ${this.height})`)
        .call(xAxis)
        .append('text')
        .attr('x', this.width / 2)
        .attr('dy', '60px')
        .text('Date');
    } else {
      this.svg.selectAll('.x.axis')
        .transition()
        .duration(1500)
        .call(xAxis);
    }

    const siteNames = [];

    const transformedSites = sites.map((site) => {
      siteNames.push(site.title);

      return site.metrics;
    });

    const lines = d3.selectAll('.line');
    if (lines[0] && lines[0].length < 1) {
      const dataSvg = this.svg.selectAll('.line')
        .data(transformedSites);
      dataSvg.enter()
        .append('path')
        .attr('class', 'line')
        .style('stroke', (d, i) => {
          const color = colorInterpolator(i);
          this.siteColors.push(color);
          return color;
        })
        .style('fill', 'none')
        .attr('d', lineInterpolator)
        .attr('id', (d, i) => i)
        .append('svg:title')
        .text((d, i) => siteNames[i]);

      const legend = this.svg.append('g')
        .attr('class', 'legend')
        .selectAll('.color')
        .data(this.siteColors)
        .enter()
        .append('g');

      legend.append('text')
        .attr('x', (d, i) => this.width + 50)
        .attr('y', (d, i) => 22.21 * (i + 1))
        .style('font-size', '0.8rem')
        .text((d, i) => siteNames[i]);

      legend.append('rect')
        .attr('x', (d, i) => this.width + 25)
        .attr('y', (d, i) => 12 + 22 * i)
        .attr('width', 15)
        .attr('height', 15)
        .style('fill', (d, i) => d);

      const myCircleGroups = this.svg.selectAll('circle')
        .data(transformedSites)
        .enter()
        .append('g')
        .attr('class', 'dot')
        .attr('id', (d, i) => i)
        .selectAll('circle')
        .data((d, i) => transformedSites[i]);

      myCircleGroups.enter()
        .append('circle')
        .attr('cx', d => xInterpolator(d.created_at))
        .attr('cy', d => yInterpolator(d.domain_authority))
        .attr('fill', (d, i) => {
          return this.siteColors[$(this).closest('g').attr('id')];
        })
        .attr('r', 4)
        .attr('id', d => d.domain_authority);
    } else {
      this.svg.selectAll('.line')
        .data(transformedSites)
        .transition()
        .duration(1500)
        .attr('d', lineInterpolator);
      const dataSvg = this.svg.selectAll('.dot')
        .data(transformedSites);
      const dataCircles = dataSvg.selectAll('circle')
        .data((d, i) => transformedSites[i]);

      dataCircles.enter()
        .append('circle')
        .attr('cx', d => xInterpolator(d.created_at))
        .attr('cy', d => yInterpolator(d.domain_authority))
        .attr('fill', () => this.siteColors[$(this).closest('g').attr('id')])
        .attr('r', 4)
        .attr('id', d => d.domain_authority);

      dataCircles.transition()
        .duration(1500)
        .attr('cx', d => xInterpolator(d.created_at))
        .attr('cy', d => yInterpolator(d.domain_authority));

      dataCircles.exit()
        .remove();
    }
  }
}

export default SiteGraph;
