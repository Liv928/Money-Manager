export default {
    line_consump: {
      chart: {
        type:''
        },
        credits: {
            enabled:false
        },
        title: {
			text: 'Monthly Expenses Trend',
			style:{fontSize:'14px'}
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
			enabled: false,
		},
		plotOptions: {
				series: {
						label: {
								connectorAllowed: false
						},	
				}
		},
		series: [{
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
			  text: 'Monthlt Income Trend',
			  style:{fontSize:'14px'}
		  },
		  xAxis: {
			  categories: ['January', 'February', 'March','April','May','June','July','August','September','October','November','December'] 
		  },
		  yAxis: {
			  title: {
				  text: 'Monthly Income'
			  }
		  },
		  legend: {
			  enabled: false,
		  },
		  plotOptions: {
				  series: {
						  label: {
								  connectorAllowed: false
						  },	
				  }
		  },
		  series: [{
				  
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
			text: 'Expenses Categories',
			style:{fontSize:'14px'}
		},
		credits: {
            enabled:false
        },
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					format: '<b>{point.name}</b>: {point.y:.1f} $',
					distance: 20,
					zIndex:999,
					style: {
						color: [
							'#e8bb69',//第一个颜色，
							'#ff6c6b',//第二个颜色
							'#b39ce8',//第三个颜色
							'#1aadce', //。。。。
							'#94f4ff',
							'#d4ff87',
							'#77a1e5',
							'#c42525',
							'#a6c96a'
					]
					}
				}
			}
		},
		series: [{data: []}],
	  },
	  pie_earn:{
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		title: {
			text: 'Income Categories',
			style:{fontSize:'14px'}
		},
		credits: {
            enabled:false
        },
		tooltip: {
				pointFormat: '{series.name}: <b>{point.y:.1f}$</b>'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					format: '<b>{point.name}</b>: {point.y:.1f} $',
					//distance: 20,
					//zIndex:999,
					style: {
						color: [
							'#e8bb69',//第一个颜色，
							'#ff6c6b',//第二个颜色
							'#b39ce8',//第三个颜色
							'#1aadce', //。。。。
							'#94f4ff',
							'#d4ff87',
							'#77a1e5',
							'#c42525',
							'#a6c96a'
					]
					}
				}
			}
		},
		series: [{data: []}],
	  }
  }