export default {
    line_consump: {
      chart: {
        type:''
        },
        credits: {
            enabled:false
        },
        title: {
            text: null
		},
		xAxis: {
			categories: ['January', 'February', 'March','April','May','June','July','August','September','October','November','December'] 
		},
        yAxis: {
		    title: {
				text: 'Monthly Overhead'
            }
		},
		legend: {
		},
		plotOptions: {
				series: {
						label: {
								connectorAllowed: false
						},	
				}
		},
		series: [{
				name: 'monthly consumption',
				data: []
		}],
	},
	line_earn: {
		chart: {
		  type:'line'
		  },
		  credits: {
			  enabled:false
		  },
		  title: {
			  text: null
		  },
		  xAxis: {
			  categories: ['January', 'February', 'March','April','May','June','July','August','September','October','November','December'] 
		  },
		  yAxis: {
			  title: {
				  text: 'Monthly Overhead'
			  }
		  },
		  legend: {
		  },
		  plotOptions: {
				  series: {
						  label: {
								  connectorAllowed: false
						  },	
				  }
		  },
		  series: [{
				  name: 'monthly consumption',
				  data: []
		  }],
	  },
	  pie_consump:{
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		title: {
				text: 'Expenses Analysis'
		},
		tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
				pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
								enabled: true,
								format: '<b>{point.name}</b>: {point.percentage:.1f} %',
								style: {
										
								}
						}
				}
		},
		series: [{name:'Expenses Category', data: []}],
	  },
	  pie_earn:{
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		title: {
				text: 'Income Analysis'
		},
		tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
				pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
								enabled: true,
								format: '<b>{point.name}</b>: {point.percentage:.1f} %',
								style: {
										
								}
						}
				}
		},
		series: [{name:'Income Category', data: []}],
	  }
  }