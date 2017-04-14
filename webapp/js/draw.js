
function draw(container,currentComposer){
	// tree is array
	function tra(t,d){
		var o = {};
		if(d==0)
			return {id:t.id};
		o.id = t.id;
		if(_.has(t,'children')){
			o.children = [];
			for(var x in t.children)
				o.children.push(tra(t.children[x],d-1));
		}
		return o;
	}
	// var ed = require('edit-distance');
	// Define cost functions. 
	var insert, remove, update;
	insert = remove = function(node) { return 1; };
	update = function(nodeA, nodeB) { return nodeA.id !== nodeB.id ? 1 : 0; };
	 
	// Define two trees. 
	var rootA = {id: 1, children: [{id: 2}, {id: 3}]};
	var rootB = {id: 1, children: [{id: 4}, {id: 3}]};
	var children = function(node) { return node.children; };
	 
	// Compute edit distance, mapping, and alignment. 
	var ted1 = ted(rootA, rootB, children, insert, remove, update);
	console.log('Tree Edit Distance', ted1.distance, ted1.pairs(), ted1.alignment());

	var composers = {'Ludwig van Beethoven':[3,5,14,31,55,98,101,109,128,131,134,137,140,161,165,166,169,170,182,184,187,188,204,211,241,247,248,249,262],
						'Wolfgang Amadeus Mozart':[38,47,79,80,91,95,100,133,136,138,178,213,227,250,251,252],
						'Franz Peter Schubert':[2,9,22,44,59,90,122,162,174,191,196,222,256,258,261],
						'Frédéric François Chopin':[1,4,7,58,67,68,87,88,89,99,102,146,214,216,217,220,235,264,266],
						'Pyotr Il’yich Tchaikovsky':[32,33,41,42,66,113,130,139,180,194,212,237,263]};
	// var queryDict = {}
	// location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]})
	
	// var currentComposer = decodeURI(queryDict.c);

	var tree2 = tree.filter(function(el,i){
	  return (i in composers[currentComposer]);
	});

	var graph2 = 
		{
		  "nodes": [
		    {"id": "Myriel", "group": 1},
		    {"id": "Napoleon", "group": 1}
		  ],
		  "links": [
		    {"source": "Napoleon", "target": "Myriel", "value": 1}
		  ]
		};

	var max = -Infinity;
	var steps = [];

	tree2.forEach(function(x,i){
		tree2.forEach(function(y,j){
			if(i<=j) return;
			var temp1 = [], temp2 = [];
			var d = ted(tree2[i], tree2[j], children, insert, remove, update).distance;
			temp1.push(i);
			temp1.push(j);
			temp2.push(j);
			temp2.push(i);
			temp1.push(d);
			temp2.push(d);
			steps.push(temp1)
			steps.push(temp2);
			if(max < steps[i+"_"+j]) max = steps[i+"_"+j];
		});
	});

	// for(var x in steps){
	// 	var current = max - steps[x] + 1;
	// 	var from = x.split('_')[0];
	// 	var to = x.split('_')[1];
	// 	graph.addLink(from, to,{ connectionStrength: current });
	// }


	Highcharts.chart('container', {

	    chart: {
	        type: 'heatmap',
	        marginTop: 80,
	        marginBottom: 80,
	        plotBorderWidth: 1
	    },


	    title: {
	        text: currentComposer

	    },

	    subtitle: {
	        text: 'tree edit distance'
	    },

	    xAxis: {
	        categories: composers[currentComposer]
	    },

	    yAxis: {
	        categories: composers[currentComposer],
	        title: null
	    },

	    colorAxis: {
	        min: 0,
	        minColor: '#FFFFFF',
	        maxColor: Highcharts.getOptions().colors[0]
	    },

	    legend: {
	        align: 'right',
	        layout: 'vertical',
	        margin: 0,
	        verticalAlign: 'top',
	        y: 65,
	        symbolHeight: 280
	    },

	    tooltip: {
	        formatter: function () {
	            return this.series.xAxis.categories[this.point.x] + ' and ' + this.series.yAxis.categories[this.point.y] + '<br><b>' +
	                this.point.value + '</b>';
	        }
	    },

	    series: [{
	        name: 'Sales per employee',
	        borderWidth: 1,
	        data: steps,
	        dataLabels: {
	            enabled: true,
	            color: '#000000'
	        }
	    }]

	});
}
