<template>
    <div class="container-view">
        <head-title :title="'Analysis：'"></head-title>
             <Tabs>
                <TabPane label="Expenses">
                    <div id="app">
                        <x-chart :id="id_1" :option="option_1"></x-chart>
                    </div>
                </TabPane>
                <TabPane label="Income">
                    <div id="app">
                        <x-chart :id="id_2" :option="option_2"></x-chart>
                    </div>
                </TabPane>
             </Tabs>
           
               <!--
                    <div class="chart-item">
                        <h2 class="chart-title">消费状况：</h2>
                        <canvas id="consumption-chart" width="400" height="400"></canvas>
                    </div>
                    <div class="chart-item">
                        <h2 class="chart-title">入账状况：</h2>
                        <canvas id="earn-chart" width="400" height="400"></canvas>
                    </div>
                --->
            
        
    </div>
</template>
<script>
    import types from '../../store/mutation-types'
    import headTitle from '../../components/head-title.vue'
    import Util from '../../assets/lib/Util'
    import { Scroller } from 'vux'
    import XChart from '../../components/chart.vue'
    import options from '../../assets/chart-option/chart-options.js'
    export default {
        name: 'chart',
        data () {
            let option_line_1 = options.line_consump;
            let option_line_2 = options.line_earn;
            return {
                id_1:'line_cons',
                id_2:'line_earn',
                option_1: option_line_1,
                option_2:option_line_2,
                month_arr_consump:[],
                month_arr_earn:[],
                consumption_chart_arr: [0,0,0,0,0,0,0,0],
                earn_chart_arr: [0,0,0]
            }
        },
        components: {
            Scroller,
            headTitle,
            XChart
        },
        created () {
            this.$store.commit(types.SET_NAV_INDEX,'4');
            this.fetchBillData();
            this.fetchMonthlyConsump();
            this.initChart();
            this.$nextTick(() => {
                var consumption_data = {
                    labels: [
                        "水果零食",
                        "餐饮伙食",
                        "出行旅游",
                        "网上购物",
                        "生活日常",
                        "租房水电",
                        "医疗药物",
                        "其它消费",
                    ],
                    datasets: [{
                        data: this.consumption_chart_arr,
                        backgroundColor: [
                            "#999933",
                            "#FF9933",
                            "#FF6666",
                            "#36A2EB",
                            "#666699",
                            "#CCFF00",
                            "#66CCCC",
                            "#663366"
                        ]
                    }]
                };
                var earn_data = {
                    labels: [
                        "基本工资",
                        "公司福利",
                        "其它入账"
                    ],
                    datasets: [{
                        data: this.earn_chart_arr,
                        backgroundColor: [
                            "#13CE66",
                            "#F7BA2A",
                            "#FF4949"
                        ]
                    }]
                };
                var consumption_ctx = document.getElementById("consumption-chart").getContext("2d");
                var earn_ctx = document.getElementById("earn-chart").getContext("2d");
                new Chart(consumption_ctx,{
                    type: 'pie',
                    data: consumption_data
                });
                new Chart(earn_ctx,{
                    type: 'pie',
                    data: earn_data
                });
            })
        },
        methods: {
            initChart(){
                this.option_1.series[0].data=this.month_arr_consump;
                this.option_2.series[0].data=this.month_arr_earn;
                //console.log(this.monthly_arr);
            },
            fetchMonthlyConsump(){
                this.month_arr_consump = Util.MonthlyConsump.query_consump();
                this.month_arr_earn = Util.MonthlyConsump.query_earn();
                console.log('fetch '+ this.month_arr_earn)
            },
            onScroll (pos) {
                this.scrollTop = pos.top;
            },
            fetchBillData () {
                var bill_arr = Util.Bill.query();
                bill_arr.forEach((item,index) =>{
                    if ( item.account_type[0] == '水果零食' )
                        this.consumption_chart_arr[0] = this.consumption_chart_arr[0] + (+item.sum_value);
                    else if ( item.account_type[0] == '餐饮伙食' )
                        this.consumption_chart_arr[1] = this.consumption_chart_arr[1] + (+item.sum_value);
                    else if ( item.account_type[0] == '出行旅游' )
                        this.consumption_chart_arr[2] = this.consumption_chart_arr[2] + (+item.sum_value);
                    else if ( item.account_type[0] == '网上购物' )
                        this.consumption_chart_arr[3] = this.consumption_chart_arr[3] + (+item.sum_value);
                    else if ( item.account_type[0] == '生活日常' )
                        this.consumption_chart_arr[4] = this.consumption_chart_arr[4] + (+item.sum_value);
                    else if ( item.account_type[0] == '租房水电' )
                        this.consumption_chart_arr[5] = this.consumption_chart_arr[5] + (+item.sum_value);
                    else if ( item.account_type[0] == '医疗药物' )
                        this.consumption_chart_arr[6] = this.consumption_chart_arr[6] + (+item.sum_value);
                    else if ( item.account_type[0] == '其它消费' )
                        this.consumption_chart_arr[7] = this.consumption_chart_arr[7] + (+item.sum_value);
                    else if ( item.account_type[0] == '基本工资' )
                        this.earn_chart_arr[0] = this.earn_chart_arr[0] + (+item.sum_value);
                    else if ( item.account_type[0] == '公司福利' )
                        this.earn_chart_arr[1] = this.earn_chart_arr[1] + (+item.sum_value);
                    else if ( item.account_type[0] == '其它入账' )
                        this.earn_chart_arr[2] = this.earn_chart_arr[2] + (+item.sum_value);
                });
            }
        }
    }
</script>
<style lang="scss">
    @import "../../assets/scss/define";
    .chart-wrap{
        @extend %oya;
        @extend %pa;
        @extend %w100;
        @extend %ios;
        @extend %b0;
        top: 64px;
    }
    .chart-title{
        @extend %f14;
        @extend %fwn;
        color: #58B7FF;
    }
    .chart-item{
        padding: 10px;
    }
</style>
