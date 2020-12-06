module.exports = {
    line: {
      chart: {
        type:''//指定图表的类型，默认是折线图（line）
        },
        credits: {
            enabled:false
        },
        title: {
            text: null
        },
        yAxis: {
		    title: {
				text: 'Consumption'
            }
		},
		legend: {
		},
		plotOptions: {
				series: {
						label: {
								connectorAllowed: false
						},
						pointStart: 2010
				}
		},
		series: [{
				name: 'monthly consumption',
				data: []
		}],
    }
  }