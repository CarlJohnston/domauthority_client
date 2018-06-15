import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Home.css';
import 'jquery.tipsy/src/jquery.tipsy.css';

import Data from './Data';

import d3 from 'd3';
import $ from 'jquery';
import 'jquery.tipsy';
window.$ = window.jQuery = $;

class Home extends Component {
  componentDidMount() {
	  var margin = {
		  top: 20,
		  right: 80,
		  bottom: 30,
		  left: 50
	  };
		var width = 900 - margin.left - margin.right;
		var height = 440 - margin.top - margin.bottom;

	  var svg = d3.select('#d3-graph').append('svg')
			          .attr('id', 'chart')
			          .attr('viewBox', '0 0 960 500')
			          .attr('preserveAspectRatio', 'xMidYMid')
			          .attr('width', width + margin.left + margin.right)
			          .attr('height', height + margin.top + margin.bottom)
			          .append('g')
			          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	  var listOfSiteColors = [];

	  function updateData(data) {
		  var parseDate = d3.time.format('%Y-%m-%d').parse;

		  var x = d3.time.scale()
				        .range([0, width]);

		  var y = d3.scale.linear()
				        .range([height, 0]).domain([0,100]);

		  var color = d3.scale.category20();

		  var xAxis = d3.svg.axis()
				            .scale(x)
				            .orient('bottom')
				            .outerTickSize(0);

		  var yAxis = d3.svg.axis()
				            .scale(y)
				            .orient('left')
				            .outerTickSize(0);

		  var line = d3.svg.line()
				           .interpolate('linear')
				           .x(function (d) {
					           return x(d.date);
				           })
				           .y(function (d) {
					           return y(d.da);
				           });

		  var fullDataSet = [];
		  for (var key in data) {
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

		  var myNewData = [];
		  var listOfSiteNames = [];
		  for (key in data) {
			  myNewData.push(data[key]);
			  listOfSiteNames.push(key);
		  }

		  if (d3.selectAll('.line')[0].length < 1) {
			  var myNewSvg = svg.selectAll('.line').data(myNewData);
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

			  var legend = svg.append('g')
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

			  var myCircleGroups = svg.selectAll('circle').data(myNewData)
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
			  var newSvg = svg.selectAll('.dot')
                        .data(myNewData);
			  var newCircles = newSvg.selectAll('circle')
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
				  var d = $(this).attr('id');
				  return d;
			  }
		  });
	  };

    var initialData = Data.data1;

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
		  var n = this.getDate();
		  this.setDate(1);
		  this.setMonth(this.getMonth() + value);
		  this.setDate(Math.min(n, this.getDaysInMonth()));
		  return this;
	  };

	  function valBetween(v, min, max) {
		  return (Math.min(max, Math.max(min, v)));
	  }

    var currentData = JSON.parse(JSON.stringify(Data.data9));

	  var max = 50;
	  var counter = 0;
    var interval = 2300;

	  this.timer = setInterval(function () {
		  if (counter++ >= max) {
        return;
      }

			for (var i = 0; i < 4; i++) {
				var currentSite = currentData['Site' + parseInt(i+1, 10)];

				var lastItemObject = currentSite[currentSite.length-1];

				var newNumber;
				if (lastItemObject.da === 100) {
					newNumber = getRandomInt(85,90);
				} else if (lastItemObject.da === 0) {
					newNumber = getRandomInt(10,15);
				} else {
					newNumber = valBetween(lastItemObject.da + getRandomInt(-10,10), 0, 100);
				}

				var previousDate = lastItemObject.date;
				var previousYear = previousDate.toString().slice(0,4, 10);
				var previousMonth = parseInt(previousDate.toString().slice(5,7), 10);
				var previousDay = parseInt(previousDate.toString().slice(8,10), 10);

				var currentDate = new Date(previousYear, previousMonth-1, previousDay);
				currentDate.addMonths(1);

				currentData['Site' + parseInt(i+1, 10)].push({
          'da': newNumber,
          'date': currentDate.toISOString().slice(0,10),
        });
			};

			var copiedData = JSON.parse(JSON.stringify(currentData));

			updateData(copiedData);
		}, interval);

	  var chart = $('#chart');
	  var aspect = chart.width() / chart.height();
	  var container = chart.parent();

	  $(window).on('resize', function() {
		  var targetWidth = container.width();
		  chart.attr('width', targetWidth);
		  chart.attr('height', Math.round(targetWidth / aspect));
	  }).trigger('resize');
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div>
        <section className='grid-container-fluid alternate-container-fluid callout-container'>
          <div className='grid-container'>
            <div className='grid-x'>
              <div className='cell medium-offset-2 medium-4 text-center'>
				        <h2>Domain Tracking & Visualization</h2>
                <p className='lead'>Made for SEO Professionals</p>
              </div>
              <div className='cell medium-4 text-center'>
				        <svg width='400' height='200' viewBox='0 0 340 200' id='top-graph'>
					        <line x1='20' y1='155' x2='320' y2='155' style={{ stroke: 'black' }} />
					        <line x1='20' y1='0' x2='20' y2='155' style={{ stroke: 'black' }} />
					        <circle cx='50' cy='50' r='3' stroke='black' strokeWidth='3' fill='black'>
						        <animate attributeName='cy' begin='0s' dur='4s' values='50;70;70;35;35;50;50' keySplines='0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1' calcMode='spline' repeatCount='indefinite'/>
					        </circle>
					        <line x1='50' y1='50' x2='100' y2='100' style={{ stroke: 'black' }}>
						        <animate attributeName='y1' begin='0s' dur='4s' values='50;70;70;35;35;50;50' keySplines='0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1' calcMode='spline' repeatCount='indefinite'/>
						        <animate attributeName='y2' begin='0s' dur='4s' values='100;85;85;110;110;100;100' keySplines='0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1' calcMode='spline' repeatCount='indefinite'/>
					        </line>
					        <circle cx='100' cy='100' r='3' stroke='black' strokeWidth='3' fill='black'>
						        <animate attributeName='cy' begin='0s' dur='4s' values='100;85;85;110;110;100;100' keySplines='0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1' calcMode='spline' repeatCount='indefinite'/>
					        </circle>
					        <line x1='100' y1='100' x2='150' y2='80' style={{ stroke: 'black' }}>
						        <animate attributeName='y1' begin='0s' dur='4s' values='100;85;85;110;110;100;100' keySplines='0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1' calcMode='spline' repeatCount='indefinite'/>
						        <animate attributeName='y2' begin='0s' dur='4s' values='80;45;45;110;110;80;80' keySplines='0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1' calcMode='spline' repeatCount='indefinite'/>
					        </line>
					        <circle cx='150' cy='80' r='3' stroke='black' strokeWidth='3' fill='black'>
						        <animate attributeName='cy' begin='0s' dur='4s' values='80;45;45;110;110;80;80' keySplines='0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1' calcMode='spline' repeatCount='indefinite'/>
					        </circle>
					        <line x1='150' y1='80' x2='200' y2='70' style={{ stroke: 'black' }}>
						        <animate attributeName='y1' begin='0s' dur='4s' values='80;45;45;110;110;80;80' keySplines='0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1' calcMode='spline' repeatCount='indefinite'/>
						        <animate attributeName='y2' begin='0s' dur='4s' values='70;45;45;90;90;70;70' keySplines='0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1' calcMode='spline' repeatCount='indefinite'/>
					        </line>
					        <circle cx='200' cy='70' r='3' stroke='black' strokeWidth='3' fill='black'>
						        <animate attributeName='cy' begin='0s' dur='4s' values='70;45;45;90;90;70;70' keySplines='0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1' calcMode='spline' repeatCount='indefinite'/>
					        </circle>
					        <line x1='200' y1='70' x2='250' y2='50' style={{ stroke: 'black' }}>
						        <animate attributeName='y1' begin='0s' dur='4s' values='70;45;45;90;90;70;70' keySplines='0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1' calcMode='spline' repeatCount='indefinite'/>
						        <animate attributeName='y2' begin='0s' dur='4s' values='50;20;20;30;30;50;50' keySplines='0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1' calcMode='spline' repeatCount='indefinite'/>
					        </line>
					        <circle cx='250' cy='50' r='3' stroke='black' strokeWidth='3' fill='black'>
						        <animate attributeName='cy' begin='0s' dur='4s' values='50;20;20;30;30;50;50' keySplines='0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1' calcMode='spline' repeatCount='indefinite'/>
					        </circle>
					        <line x1='250' y1='50' x2='300' y2='80' style={{ stroke: 'black' }}>
						        <animate attributeName='y1' begin='0s' dur='4s' values='50;20;20;30;30;50;50' keySplines='0.1 0.8 0.2 1; 
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1' calcMode='spline' repeatCount='indefinite'/>
						        <animate attributeName='y2' begin='0s' dur='4s' values='25;40;40;60;60;25;25' keySplines='0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1' calcMode='spline' repeatCount='indefinite'/>
					        </line>
					        <circle cx='300' cy='25' r='3' stroke='black' strokeWidth='3' fill='black'>
						        <animate attributeName='cy' begin='0s' dur='4s' values='25;40;40;60;60;25;25' keySplines='0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1;
								    0.1 0.8 0.2 1' calcMode='spline' repeatCount='indefinite'/>
					        </circle>
				        </svg>
              </div>
            </div>
          </div>
        </section>
        <section className='grid-container text-center section-container'>
	        <div className='grid-x features-grid'>
            <div className='cell'>
              <h2>Benefits</h2>
            </div>
            <div className='cell'>
              <p>Setup is painless and offers immediate benefits to both you and your clients.</p>
            </div>
            <div className='cell small-6 medium-4'>
              <i className='fi-wrench'></i>
			        <h4>Useful</h4>
			        <p>Track relative to your competitors.</p>
            </div>
            <div className='cell small-6 medium-4'>
              <i className='fi-graph-trend'></i>
			        <h4>Visual</h4>
			        <p>Visualize your metrics at a glance.</p>
            </div>
            <div className='cell small-6 medium-4'>
              <i className='fi-calendar'></i>
			        <h4>Automatic</h4>
			        <p>No maintenance on your part.</p>
            </div>
            <div className='cell small-6 medium-4'>
              <i className='fi-mail'></i>
			        <h4>Updates</h4>
			        <p>Summaries straight to your inbox.</p>
            </div>
            <div className='cell small-6 medium-4'>
              <i className='fi-star'></i>
			        <h4>Simple</h4>
			        <p>Only a URL and name required.</p>
            </div>
            <div className='cell small-6 medium-4'>
              <i className='fi-dollar'></i>
			        <h4>Free</h4>
			        <p>Tracking without any fees.</p>
            </div>
          </div>
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
