var splotsFactory = function(idSelector) {
	var points = [];
  var readOnly = true;
  var width = 300;
  var height = 300;
  var snapThreshold = 20; // snap to 10 px
  var click = null; // event handle for click
  var clickNoPoint = null; // 
  var dblClick = null; // event handle for dblClick
  var swept = null; // event handle for swept
  var line = d3.line()
    .curve(d3.curveBasis)
    .x(function(d) { return d.x;})
    .y(function(d) { return d.y;});
  var svg = null;
    
  function snap(x, y) {
  	var found = null;
  	d3.map(points, function(d) {
    	var dtx = d.x - x;
      var dty = d.y - y;
      var dt2 = Math.sqrt(dtx * dtx + dty * dty);
      // console.error(dt2);
      if(!found && dt2 < snapThreshold)
      	found =  d;
    });
    // console.log(found);
    return found;
  }
  function render() {
    var div = d3.select(idSelector);
    svg = div.selectAll('svg').data([0]);
    //alert(svg.size());
    var enterSvg = svg.enter().append('svg');
    enterSvg.append('g').classed('points', true);
    enterSvg.append('g').classed('drawing', true);
    enterSvg.attr('width', width)
      .attr('height', height);
    svg.exit().remove();
    svg = enterSvg.merge(svg);
    svg.on('click', function(d) {
    	if(clickNoPoint) {
        var pts = d3.clientPoint(svg.select('g').node(), d3.event);
        clickNoPoint(pts[0], pts[1]);
      }
    });
    var pts = svg.select('g.points').selectAll('g.point')
    	.data(points, function(d) {
    		return d.value;
    	});
    var enterPts = pts.enter().append('g')
    	.classed('point', true);
    enterPts.append('circle').classed('c1', true)
    	.attr('r', 5).attr('cx', 0).attr('cy', 0);
    enterPts.append('circle').classed('c2', true)
    	.attr('r', 10).attr('cx', 0).attr('cy', 0);
    enterPts.append('text').classed('txt', true)
    	.attr('dx', -18).attr('dy', 6)
      .attr('text-anchor', 'middle');
    pts.exit().remove();
    pts = enterPts.merge(pts);
    pts
      .attr('transform', function(d) {
        return 'translate(' + d.x + ',' + d.y + ')';
      }).on('click', function(d) {
      	// console.log('clicked', d);
        d3.event.stopPropagation();
        if(click) 
        	click(d);
      }).on('dblclick', function(d) {
      	// console.log('dblclicked', d);
        d3.event.stopPropagation();
        if(dblClick)
        	dblClick(d);
      });
    pts.selectAll('text').text(function(d) {
    	return d.value;
    })
     
    var gDrawing = svg.select('g.drawing');
    svg.call(d3.drag()
        .container(function() { 
        	return this; 
    		})
        .subject(function() {
        	return [];
    		})
        .on("start", dragstarted)
        .on("end", dragended));
    
    function dragended() {
    	var pts = _.unique(d3.event.subject);
    	if(swept) 
      	swept(pts);
      // console.log('swept', pts);
    }
    function dragstarted() {
    	clearSweptPath();
      var d = d3.event.subject,
          active = gDrawing.append("path").classed('swept', true).datum(d),
          x0 = d3.event.x,
          y0 = d3.event.y;
          
      var startedPts = snap(x0, y0);
      if(!startedPts) 
      	return;
        
			//alert(x0, y0);
      d3.event.on("drag", function() {
        var x1 = d3.event.x,
            y1 = d3.event.y,
            dx = x1 - x0,
            dy = y1 - y0;
				var nextPts = snap(x1, y1);
        if(nextPts)
        	if(!_.find(d, {value: nextPts.value})) {
        		d.push(nextPts);
            d.push(nextPts);
          }
        
        active.attr("d", line);
      });
    }
  }
  function clearSweptPath() {
    if(svg)
      svg.select('g.drawing').selectAll('path.swept').remove();
  }
  function drawPath(listPoints) {
  	clearPath();
    var pts = [];
    _.each(listPoints, function(d){
    	pts.push(d);
      pts.push(d);
    });
    svg.select('g.drawing').append("path").classed('draw', true).datum(pts).attr('d', line);
  }
  function clearPath() {
  	if(svg)
      svg.select('g.drawing').selectAll('path.draw').remove();
  }
	return {
  	add: function(x, y, value) {
    	points.push({
        x: x,
        y: y, 
        value: value
      });
    },
    render: render,
    points: function(x) {
    	points = x;
    },
    readOnly: function(x){
    	readOnly = x;
    },
    width: function(x) {
    	width = x;
    },
    height: function(x) {
    	height = x;
    },
    click: function(x) {
    	click = x;
    },
    clickNoPoint: function(x) {
    	clickNoPoint = x;
    },
    dblClick: function(x) {
    	dblClick = x;
    },
    swept: function(x) {
    	swept = x;
    },
    clearSweptPath: clearSweptPath,
    drawPath: drawPath,
    clearPath: clearPath
  };
}