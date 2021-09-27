<template>
    <div class="container-view">
        <head-title :title="'Analysis：'"></head-title>
             <Tabs>
                <TabPane label="Expense">
                    <Row>
                        <p slot="title">Your Monthly Consumption Trend</p>
                        <div id="app">
                            <x-chart :id="id_1" :option="option_1"></x-chart>
                        </div>
                    </Row>
                    <br>
                    <Row>
                        <p slot="title">Your Consumption Categories</p>
                        <div id="app">
                            <x-chart :id="id_3" :option="option_3"></x-chart>
                        </div>
                    </Row>      
                </TabPane>
                <TabPane label="Income">
                    <Row>
                        <p slot="title">Your Monthly Income Trend</p>
                        <div id="app">
                            <x-chart :id="id_2" :option="option_2"></x-chart>
                        </div>
                    </Row>
                    <br>
                    <Row>
                        <p slot="title">Your Income Categories</p>
                        <div id="app">
                            <x-chart :id="id_4" :option="option_4"></x-chart>
                        </div>
                    </Row> 
                </TabPane>
             </Tabs>
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
            let option_pie_1 = options.pie_consump;
            let option_pie_2 = options.pie_earn;
            return {
                id_1:'line_cons',
                id_2:'line_earn',
                id_3:'pie_cons',
                id_4:'pie_earn',
                option_1: option_line_1,
                option_2: option_line_2,
                option_3: option_pie_1,
                option_4: option_pie_2,
                month_arr_consump:[],
                month_arr_earn:[],
                consumption_chart_arr: [0,0,0,0,0,0,0,0,0],
                earn_chart_arr: [0,0,0],
                pie_cons:[],
                pie_earn:[],
                cons_label:["Snack",
                        "Meal",
                        "Travel",
                        "Shopping",
                        "Daily",
                        "Rent and Utilities",
                        "Medicine",
                        "Transportation",
                        "Other expense"],
                earn_label:["Salary",
                        "Pocket Money",
                        "Other Income"],
               
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
                        "Snack",
                        "Meal",
                        "Travel",
                        "Shopping",
                        "Daily",
                        "Rent and Utilities",
                        "Medicine",
                        "Transportation",
                        "Other expense",
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
                        "Salary",
                        "Pocket Money",
                        "Other Income"
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
                /*var consumption_ctx = document.getElementById("consumption-chart").getContext("2d");
                var earn_ctx = document.getElementById("earn-chart").getContext("2d");
                new Chart(consumption_ctx,{
                    type: 'pie',
                    data: consumption_data
                });
                new Chart(earn_ctx,{
                    type: 'pie',
                    data: earn_data
                });*/
            })
        },
        methods: {
            initChart(){
                this.option_1.series[0].data=this.month_arr_consump;
                this.option_2.series[0].data=this.month_arr_earn;
                this.option_3.series[0].data=this.pie_cons;
                this.option_4.series[0].data=this.pie_earn;
                
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
                    if (item.consumption_or_earn==0){
                        if ( item.account_type[0] == 'Snack' )
                            this.consumption_chart_arr[0] = this.consumption_chart_arr[0] + (+item.sum_value);
                        else if ( item.account_type[0] == 'Meal' )
                            this.consumption_chart_arr[1] = this.consumption_chart_arr[1] + (+item.sum_value);
                        else if ( item.account_type[0] == 'Travel' )
                            this.consumption_chart_arr[2] = this.consumption_chart_arr[2] + (+item.sum_value);
                        else if ( item.account_type[0] == 'Shopping' )
                            this.consumption_chart_arr[3] = this.consumption_chart_arr[3] + (+item.sum_value);
                        else if ( item.account_type[0] == 'Daily' )
                            this.consumption_chart_arr[4] = this.consumption_chart_arr[4] + (+item.sum_value);
                        else if ( item.account_type[0] == 'Rent and Utilities' )
                            this.consumption_chart_arr[5] = this.consumption_chart_arr[5] + (+item.sum_value);
                        else if ( item.account_type[0] == 'Medicine' )
                            this.consumption_chart_arr[6] = this.consumption_chart_arr[6] + (+item.sum_value);
                        else if ( item.account_type[0] == 'Transportation' )
                            this.consumption_chart_arr[7] = this.consumption_chart_arr[7] + (+item.sum_value);
                        else
                            this.consumption_chart_arr[8] =  this.consumption_chart_arr[8] + (+item.sum_value);
                    }
                    
                    if ( item.account_type[0] == 'Salary' )
                        this.earn_chart_arr[0] = this.earn_chart_arr[0] + (+item.sum_value);
                    else if ( item.account_type[0] == 'Pocket Money' )
                        this.earn_chart_arr[1] = this.earn_chart_arr[1] + (+item.sum_value);
                    else
                        this.earn_chart_arr[2] = this.earn_chart_arr[2] + (+item.sum_value);
                });
                
                let i=0;
                for (i;i<this.consumption_chart_arr.length;i++){
                    var item;
                    item={
                        name:"",
                        y:0,
                    }
                    item.name=this.cons_label[i];
                    item.y=this.consumption_chart_arr[i];
                    //console.log("bill fet ", this.cons_label[i],this.consumption_chart_arr[i]);
                    this.pie_cons.push(item);
                }
                console.log("pie cons ", this.pie_cons);
                
                let j=0;
                for (j;j<this.earn_chart_arr.length;j++){
                    var item;
                    item={
                        name:"",
                        y:0,
                    }
                    item.name=this.earn_label[j];
                    item.y=this.earn_chart_arr[j];
                    this.pie_earn.push(item);

                }
                console.log("pie earn ", this.pie_earn);
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
    #line_cons {
        width:360px;
        height:240px;
        margin: 5px auto;
        text-align: center;
    }
    #line_earn {
        width: 360px;
        height: 240px;
        margin: 5px auto;
        text-align: center;
    }
    #pie_cons {
        width: 300px;
        height: 240px;
        margin: 10px auto;
    }
    #pie_earn {
        width: 300px;
        height: 240px;
        margin: 10px auto;
    }
</style>
