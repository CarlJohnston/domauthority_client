import React, { Component } from 'react';

import 'jquery.tipsy/src/jquery.tipsy.css';

import Data from './Data';

import d3 from 'd3';
import $ from 'jquery';
import 'jquery.tipsy';

window.$ = window.jQuery = $;

const CONTAINER_ID = 'd3-graph';


class Demo extends Component {
  componentDidMount() {
    const margin = {
      top: 30,
      right: 100,
      bottom: 30,
      left: 50,
    };
    const width = 800;
    const height = 400;

    const svg = d3.select(`#${CONTAINER_ID}`)
      .append('svg')
      .attr('id', 'chart')
      .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .attr('preserveAspectRatio', 'xMidYMid')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const listOfSiteColors = [];

    function updateData(data) {
      const parseDate = d3.time.format('%Y-%m-%d').parse;

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
      for (let key in data) {
        myNewData.push(data[key]);
        listOfSiteNames.push(key);
      }

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
          .attr('cx', d => x(d.date))
          .attr('cy', d => y(d.da))
          .attr('fill', (d, i) => {
            return listOfSiteColors[$(this).closest('g').attr('id')];
          })
          .attr('r', 4)
          .attr('id', d => d.da);
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
          .attr('cx', d => x(d.date))
          .attr('cy', d => y(d.da))
          .attr('fill', () => listOfSiteColors[$(this).closest('g').attr('id')])
          .attr('r', 4)
          .attr('id', d => d.da);

        newCircles.transition()
          .duration(1500)
          .attr('cx', d => x(d.date))
          .attr('cy', d => y(d.da));

        newCircles.exit()
          .remove();
      }

      $('circle').tipsy({
        gravity: 'w',
        html: true,
        title: () => $(this).attr('id'),
      });
    }

    const initialData = JSON.parse(JSON.stringify(Data.data));

    const currentData = JSON.parse(JSON.stringify(initialData));

    updateData(initialData);

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

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

    function valBetween(v, min, max) {
      return (Math.min(max, Math.max(min, v)));
    }

    const max = 50;
    const interval = 2300;

    let counter = 0;
    this.timer = setInterval(() => {
      if (counter++ >= max) {
        return;
      }

      for (let i = 0; i < 4; i++) {
        const currentSite = currentData[`Site${parseInt(i + 1, 10)}`];

        const lastItemObject = currentSite[currentSite.length - 1];

        let newNumber;
        if (lastItemObject.da === 100) {
          newNumber = getRandomInt(85,90);
        } else if (lastItemObject.da === 0) {
          newNumber = getRandomInt(10,15);
        } else {
          newNumber = valBetween(lastItemObject.da + getRandomInt(-10, 10), 0, 100);
        }

        const previousDate = lastItemObject.date;
        const previousYear = previousDate.toString().slice(0, 4, 10);
        const previousMonth = parseInt(previousDate.toString().slice(5, 7), 10);
        const previousDay = parseInt(previousDate.toString().slice(8, 10), 10);

        const currentDate = new Date(
          previousYear,
          previousMonth - 1,
          previousDay,
        );
        currentDate.addMonths(1);

        currentData[`Site${parseInt(i + 1, 10)}`].push({
          da: newNumber,
          date: currentDate.toISOString().slice(0, 10),
        });
      }

      const copiedData = JSON.parse(JSON.stringify(currentData));

      updateData(copiedData);
    }, interval);

    const chart = $('#chart');
    const aspect = chart.width() / chart.height();
    const container = chart.parent();

    $(window).on('resize', () => {
      const targetWidth = container.width();
      chart.attr('width', targetWidth);
      chart.attr('height', Math.round(targetWidth / aspect));
    }).trigger('resize');
  }

  componentWillUnmount() {
    clearInterval(this.timer);

    $(window).off('resize');
  }

  render() {
    return (
      <div id={CONTAINER_ID}>
      </div>
    );
  }
}

export default Demo;
