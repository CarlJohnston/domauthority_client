import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AnimatedGraph from 'components/AnimatedGraph/AnimatedGraph';
import Benefits from 'components/Benefits/Benefits';

import './Home.css';
import 'jquery.tipsy/src/jquery.tipsy.css';

import Data from './Data';

import d3 from 'd3';
import $ from 'jquery';
import 'jquery.tipsy';
window.$ = window.jQuery = $;

class Home extends Component {
  componentDidMount() {
    let margin = {
      top: 20,
      right: 80,
      bottom: 30,
      left: 50
    };
    let width = 900 - margin.left - margin.right;
    let height = 440 - margin.top - margin.bottom;

    let svg = d3.select('#d3-graph').append('svg')
                .attr('id', 'chart')
                .attr('viewBox', '0 0 960 500')
                .attr('preserveAspectRatio', 'xMidYMid')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    let listOfSiteColors = [];

    function updateData(data) {
      let parseDate = d3.time.format('%Y-%m-%d').parse;

      let x = d3.time.scale()
                .range([0, width]);

      let y = d3.scale.linear()
                .range([height, 0]).domain([0,100]);

      let color = d3.scale.category20();

      let xAxis = d3.svg.axis()
                    .scale(x)
                    .orient('bottom')
                    .outerTickSize(0);

      let yAxis = d3.svg.axis()
                    .scale(y)
                    .orient('left')
                    .outerTickSize(0);

      let line = d3.svg.line()
                   .interpolate('linear')
                   .x(function (d) {
                     return x(d.date);
                   })
                   .y(function (d) {
                     return y(d.da);
                   });

      let fullDataSet = [];
      for (let key in data) {
        fullDataSet = fullDataSet.concat.apply(fullDataSet, data[key]);
      }

      fullDataSet.forEach(function (d) {
        if (!(d.date instanceof Date)) {
          d.date = parseDate(d.date);
        }
        d.da = +d.da;
      });

      x.domain(d3.extent(fullDataSet, function (d) {
        return d.date;
      }));

      y.domain(d3.extent(fullDataSet, function (d) {
        return d.da;
      }));

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
           .attr('transform', 'translate(0,' + height + ')')
           .call(xAxis);
      } else {
        svg.selectAll('.x.axis').transition().duration(1500).call(xAxis);
      }

      let myNewData = [];
      let listOfSiteNames = [];
      for (let key in data) {
        myNewData.push(data[key]);
        listOfSiteNames.push(key);
      }

      let lines = d3.selectAll('.line');
      if (lines[0] && lines[0].length < 1) {
        let myNewSvg = svg.selectAll('.line').data(myNewData);
        myNewSvg.enter()
                .append('path')
                .attr('class', 'line')
                .style('stroke', function (d, i) {
                  listOfSiteColors.push(color(i));
                  return color(i);
                })
                .style('fill', 'none')
                .attr('d', line)
                .attr('id', function(d, i) { return i; })
                .append('svg:title')
                .text(function(d, i) { return listOfSiteNames[i]; });

        let legend = svg.append('g')
                        .attr('class', 'legend')
                        .selectAll('.color')
                        .data(listOfSiteColors)
                        .enter()
                        .append('g');

        legend.append('text')
              .attr('x', function(d, i) { return width + 50; })
              .attr('y', function(d, i) { return 22.21*(i+1); })
              .style('font-size', '12px')
              .text(function(d, i) { return listOfSiteNames[i]; });

        legend.append('rect')
              .attr('x', function(d, i) { return width + 25; })
              .attr('y', function(d, i) { return 12+22*i; })
              .attr('width', 15)
              .attr('height', 15)
              .style('fill', function(d, i) { return d; });

        let myCircleGroups = svg.selectAll('circle').data(myNewData)
                                .enter()
                                .append('g')
                                .attr('class', 'dot')
                                .attr('id', function(d, i) { return i })
                                .selectAll('circle')
                                .data(function(d, i) { return myNewData[i]; });

        myCircleGroups.enter()
                      .append('circle')
                      .attr('cx', function(d) { return x(d.date); })
                      .attr('cy', function(d) { return y(d.da); })
                      .attr('fill', function(d, i) { return listOfSiteColors[$(this).closest('g').attr('id')]; })
                      .attr('r', 4)
                      .attr('id', function(d) { return d.da; });
      } else {
        svg.selectAll('.line').data(myNewData)
           .transition()
           .duration(1500)
           .attr('d', line);
        let newSvg = svg.selectAll('.dot')
                        .data(myNewData);
        let newCircles = newSvg.selectAll('circle')
                               .data(function(d, i) { return myNewData[i]; });

        newCircles.enter()
                  .append('circle')
                  .attr('cx', function(d) { return x(d.date); })
                  .attr('cy', function(d) { return y(d.da); })
                  .attr('fill', function() { return listOfSiteColors[$(this).closest('g').attr('id')]; })
                  .attr('r', 4)
                  .attr('id', function(d) { return d.da; });

        newCircles.transition()
                  .duration(1500)
                  .attr('cx', function(d) { return x(d.date); })
                  .attr('cy', function(d) { return y(d.da); });

        newCircles.exit()
                  .remove();
      }

      $('circle').tipsy({
        gravity: 'w',
        html: true,
        title: function() {
          let d = $(this).attr('id');
          return d;
        }
      });
    };

    let initialData = Data.data1;

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

    let currentData = JSON.parse(JSON.stringify(Data.data9));

    let max = 50;
    let counter = 0;
    let interval = 2300;

    this.timer = setInterval(function () {
      if (counter++ >= max) {
        return;
      }

      for (let i = 0; i < 4; i++) {
        let currentSite = currentData['Site' + parseInt(i+1, 10)];

        let lastItemObject = currentSite[currentSite.length-1];

        let newNumber;
        if (lastItemObject.da === 100) {
          newNumber = getRandomInt(85,90);
        } else if (lastItemObject.da === 0) {
          newNumber = getRandomInt(10,15);
        } else {
          newNumber = valBetween(lastItemObject.da + getRandomInt(-10,10), 0, 100);
        }

        let previousDate = lastItemObject.date;
        let previousYear = previousDate.toString().slice(0,4, 10);
        let previousMonth = parseInt(previousDate.toString().slice(5,7), 10);
        let previousDay = parseInt(previousDate.toString().slice(8,10), 10);

        let currentDate = new Date(
          previousYear,
          previousMonth-1,
          previousDay
        );
        currentDate.addMonths(1);

        currentData['Site' + parseInt(i+1, 10)].push({
          da: newNumber,
          date: currentDate.toISOString().slice(0,10),
        });
      };

      let copiedData = JSON.parse(JSON.stringify(currentData));

      updateData(copiedData);
    }, interval);

    let chart = $('#chart');
    let aspect = chart.width() / chart.height();
    let container = chart.parent();

    $(window).on('resize', function() {
      let targetWidth = container.width();
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
      <div>
        <section className='grid-container-fluid alternate-container-fluid callout-container'>
          <div className='grid-container'>
            <div className='grid-x'>
              <div className='cell medium-offset-2 medium-4 text-center'>
                <h1>Domain Tracking & Visualization</h1>
                <p className='lead'>Made for SEO Professionals</p>
              </div>
              <div className='cell medium-4 text-center animated-graph'>
                <AnimatedGraph />
              </div>
            </div>
          </div>
        </section>
        <section className='grid-container text-center section-container'>
          <Benefits />
        </section>
        <section className='grid-container-fluid alternate-container-fluid section-container-alternate'>
          <div className='grid-container text-center'>
            <div className='grid-x'>
              <div className='cell'>
                <h2>Ready to Sign Up?</h2>
              </div>
              <div className='cell'>
                <Link to='/register' className='button large'>Register</Link>
              </div>
            </div>
          </div>
        </section>
        <section className='grid-container graph-container'>
          <div className='grid-x text-center'>
            <div className='cell'>
              <h2>Visualization</h2>
            </div>
            <div className='cell large-11 large-offset-1'>
              <div id='d3-graph'>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
