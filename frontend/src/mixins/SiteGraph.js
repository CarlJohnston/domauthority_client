import d3 from 'd3';
import $ from 'jquery';


class SiteGraph {
  constructor(id) {
    Date.isLeapYear = function (year) {
      return (((year % 4 === 0) && (year % 100 !== 0)) ||
              (year % 400 === 0));
    };

    Date.getDaysInMonth = function (year, month) {
      return [
        31,
        (Date.isLeapYear(year) ? 29 : 28),
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
      ][month];
    };

    Date.prototype.isLeapYear = function () {
      return Date.isLeapYear(this.getFullYear());
    };

    Date.prototype.getDaysInMonth = function () {
      return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
    };

    Date.prototype.addMonths = function (value) {
      let n = this.getDate();
      this.setDate(1);
      this.setMonth(this.getMonth() + value);
      this.setDate(Math.min(n, this.getDaysInMonth()));
      return this;
    };

    const margin = {
      top: 30,
      right: 100,
      bottom: 30,
      left: 50,
    };
    this.width = 800;
    this.height = 400;

    this.svg = d3.select(`#${id}`)
      .append('svg')
      .attr('id', 'chart')
      .attr('viewBox', `0 0 ${this.width + margin.left + margin.right} ${this.height + margin.top + margin.bottom}`)
      .attr('preserveAspectRatio', 'xMidYMid')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    this.listOfSiteColors = [];

    $('circle').tipsy({
      gravity: 'w',
      html: true,
      title: () => $(this).attr('id'),
    });
  }

  update(data) {
    const parseDate = d3.time.format('%Y-%m-%d').parse;

    const x = d3.time.scale()
      .range([0, this.width]);

    const y = d3.scale.linear()
      .range([this.height, 0])
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
      .x(d => x(d.date))
      .y(d => y(d.da));

    let fullDataSet = [];
    for (let key in data) {
      fullDataSet = fullDataSet.concat.apply(fullDataSet, data[key]);
    }

    fullDataSet.forEach((d) => {
      if (!(d.date instanceof Date)) {
        d.date = parseDate(d.date);
      }
      d.da = +d.da;
    });

    x.domain(d3.extent(fullDataSet, d => d.date));
    y.domain(d3.extent(fullDataSet, d => d.da));

    if (this.svg.selectAll('.y.axis')[0].length < 1) {
      this.svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('DA ');
    } else {
      this.svg.selectAll('.y.axis')
        .transition()
        .duration(1500)
        .call(yAxis);
    }

    if (this.svg.selectAll('.x.axis')[0].length < 1) {
      this.svg.append('g')
        .attr('class', 'x axis')
        .call(xAxis)
        .attr('transform', `translate(0, ${this.height})`)
        .call(xAxis);
    } else {
      this.svg.selectAll('.x.axis')
        .transition()
        .duration(1500)
        .call(xAxis);
    }

    const myNewData = [];
    const listOfSiteNames = [];
    for (let key in data) {
      myNewData.push(data[key]);
      listOfSiteNames.push(key);
    }

    const lines = d3.selectAll('.line');
    if (lines[0] && lines[0].length < 1) {
      const myNewSvg = this.svg.selectAll('.line').data(myNewData);
      myNewSvg.enter()
        .append('path')
        .attr('class', 'line')
        .style('stroke', (d, i) => {
          this.listOfSiteColors.push(color(i));
          return color(i);
        })
        .style('fill', 'none')
        .attr('d', line)
        .attr('id', (d, i) => i)
        .append('svg:title')
        .text((d, i) => listOfSiteNames[i]);

      const legend = this.svg.append('g')
        .attr('class', 'legend')
        .selectAll('.color')
        .data(this.listOfSiteColors)
        .enter()
        .append('g');

      legend.append('text')
        .attr('x', (d, i) => this.width + 50)
        .attr('y', (d, i) => 22.21 * (i + 1))
        .style('font-size', '12px')
        .text((d, i) => listOfSiteNames[i]);

      legend.append('rect')
        .attr('x', (d, i) => this.width + 25)
        .attr('y', (d, i) => 12 + 22 * i)
        .attr('width', 15)
        .attr('height', 15)
        .style('fill', (d, i) => d);

      const myCircleGroups = this.svg.selectAll('circle')
        .data(myNewData)
        .enter()
        .append('g')
        .attr('class', 'dot')
        .attr('id', (d, i) => i)
        .selectAll('circle')
        .data((d, i) => myNewData[i]);

      myCircleGroups.enter()
        .append('circle')
        .attr('cx', d => x(d.date))
        .attr('cy', d => y(d.da))
        .attr('fill', (d, i) => {
          return this.listOfSiteColors[$(this).closest('g').attr('id')];
        })
        .attr('r', 4)
        .attr('id', d => d.da);
    } else {
      this.svg.selectAll('.line')
        .data(myNewData)
        .transition()
        .duration(1500)
        .attr('d', line);
      const newSvg = this.svg.selectAll('.dot')
        .data(myNewData);
      const newCircles = newSvg.selectAll('circle')
        .data((d, i) => myNewData[i]);

      newCircles.enter()
        .append('circle')
        .attr('cx', d => x(d.date))
        .attr('cy', d => y(d.da))
        .attr('fill', () => this.listOfSiteColors[$(this).closest('g').attr('id')])
        .attr('r', 4)
        .attr('id', d => d.da);

      newCircles.transition()
        .duration(1500)
        .attr('cx', d => x(d.date))
        .attr('cy', d => y(d.da));

      newCircles.exit()
        .remove();
    }
  }
}

export default SiteGraph;
