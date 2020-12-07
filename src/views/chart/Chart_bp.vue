<template>
    <div class="container-view">
        <head-title :title="'Analysis：'"></head-title>
            <Tabs>
                <TabPane label="Expenses">
                        <!--
                        <Row>
                            <div id="app">
                                <x-chart :id="id" :option="option_month_consump"></x-chart>
                            </div>
                        </Row>
                        <br>
                        -->
                        
                    
                    <Hchart :id="id_1" :option="option_month_consump"></Hchart>
                    
                        
                </TabPane>
                <TabPane label="Income">
                </TabPane>
            </Tabs>
           
    </div>
</template>

<script>
    import types from '../../store/mutation-types'
    import headTitle from '../../components/head-title.vue'
    import Util from '../../assets/lib/Util'
    import { Scroller } from 'vux'
    import Hchart from '../../components/chart.vue'
    import options from '../../assets/chart-option/chart-options'
    export default {
        name: 'chart',
        data () {
            //let chart_option_1 = options.line_consump;
            //let chart_option_2 = options.line_earn;
            //let chart_option_3 = options.pie_consump;
            //let chart_option_4 = options.pie_earn;
            return {
                id_1: 'consum_line',
                id_2: 'earn_line',
                id_3: 'consum_pie',
                id_4: 'earn_pie',
                option_month_consump:{
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
                    series: [{
                            name: 'monthly consumption',
                            data: [],
                    }],
                },
                option_month_earn: chart_option_2,
                option_pie_consump: chart_option_3,
                option_pie_earn: chart_option_4,
                consumpution_month_arr:[0,0,0,0,0,0,0,0,0,0,0,0],
                earn_month_arr:[0,0,0,0,0,0,0,0,0,0,0,0],
                consumption_cate_arr:[],
                earn_cate_arr:[],
            }
        },
        components: {
            Scroller,
            headTitle,
            Hchart
        },
        created () {
            this.$store.commit(types.SET_NAV_INDEX,'4');
            this.fetchCategoryData();
            this.fetchMonthlyData();
            this.initChart();
        },
        methods: {
             initChart(){
                console.log('data ',this.consumption_month_arr);
                //this.option_month_consump.series[0].data=this.consumption_month_arr;
                //this.option_month_earn.series[0].data=this.earn_month_arr;
                //this.option_pie_consump.series[0].data=this.consumption_cate_arr;
                //this.option_pie_earn.series[0].data=this.eanr_cate_arr;
                
                this.option_month_consump= {
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
                    series: [{
                            name: 'monthly consumption',
                            data: this.consumpution_month_arr
                    }],
                };  
               
            },
            onScroll (pos) {
                this.scrollTop = pos.top;
            },
            fetchMonthlyData(){
                var bill_arr = Util.Bill.query();
                var consump_arr =[];
                var earn_arr=[];
                let i=0;
                for (i;i<12;i++){
                    this.consump_arr[i]=0;
                    this.earn_arr[i]=0;
                }
                bill_arr.forEach((item,index) => { 
                    if(item.date_value.split('-')[1] == 12){
                        if(item.consumption_or_earn == 0 ){
                            consump_arr[11] +=parseInt(item.sum_value); 
                        }else{
                            earn_arr[11] +=parseInt(item.sum_value);  
                        }                
                    }
                    if(item.date_value.split('-')[1] == 11){
                        if(item.consumption_or_earn == 0 ){
                            consump_arr[10] +=parseInt(item.sum_value); 
                        }else{
                            earn_arr[10] +=parseInt(item.sum_value);  
                        }  
                    }
                    if(item.date_value.split('-')[1] == 10){
                         if(item.consumption_or_earn == 0 ){
                            consump_arr[9] +=parseInt(item.sum_value); 
                        }else{
                            earn_arr[9] +=parseInt(item.sum_value);  
                        }                  
                    }
                    if(item.date_value.split('-')[1] == 9){
                         if(item.consumption_or_earn == 0 ){
                            consump_arr[8] +=parseInt(item.sum_value); 
                        }else{
                            earn_arr[8] +=parseInt(item.sum_value);  
                        }                   
                    }
                    if(item.date_value.split('-')[1] == 8){
                         if(item.consumption_or_earn == 0 ){
                            consump_arr[7] +=parseInt(item.sum_value); 
                        }else{
                            earn_arr[7] +=parseInt(item.sum_value);  
                        }                  
                    }
                    if(item.date_value.split('-')[1] == 7){
                         if(item.consumption_or_earn == 0 ){
                            consump_arr[6] +=parseInt(item.sum_value); 
                        }else{
                            earn_arr[6] +=parseInt(item.sum_value);  
                        }                  
                    }
                    if(item.date_value.split('-')[1] == 6){
                         if(item.consumption_or_earn == 0 ){
                            consump_arr[5] +=parseInt(item.sum_value); 
                        }else{
                            earn_arr[5] +=parseInt(item.sum_value);  
                        }                 
                    }
                    if(item.date_value.split('-')[1] == 5){
                         if(item.consumption_or_earn == 0 ){
                            consump_arr[4] +=parseInt(item.sum_value); 
                        }else{
                            earn_arr[4] +=parseInt(item.sum_value);  
                        }                 
                    }
                    if(item.date_value.split('-')[1] == 4){
                         if(item.consumption_or_earn == 0 ){
                            consump_arr[3] +=parseInt(item.sum_value); 
                        }else{
                            earn_arr[3] +=parseInt(item.sum_value);  
                        }                 
                    }
                    if(item.date_value.split('-')[1] == 3){
                        if(item.consumption_or_earn == 0 ){
                            consump_arr[2] +=parseInt(item.sum_value); 
                        }else{
                            earn_arr[2] +=parseInt(item.sum_value);  
                        }                  
                    }
                    if(item.date_value.split('-')[1] == 2){
                         if(item.consumption_or_earn == 0 ){
                            consump_arr[1] +=parseInt(item.sum_value); 
                        }else{
                            earn_arr[1] +=parseInt(item.sum_value);  
                        }                  
                    }
                    if(item.date_value.split('-')[1] == 1){
                         if(item.consumption_or_earn == 0 ){
                            consump_arr[0] +=parseInt(item.sum_value); 
                        }else{
                            earn_arr[0] +=parseInt(item.sum_value);  
                        }                
                    }              
                });
                this.consumpution_month_arr = consump_arr;
                console.log('data arr: ',this.consumpution_month_arr)
                this.earn_month_arr = earn_arr;
            },
            fetchCategoryData () {
                var bill_arr = Util.Bill.query();
                bill_arr.forEach((item,index) =>{
                    /*
                    if ( item.account_type[0] == 'Snack' )
                        this.consumption_cate_arr[0] = {name:'Snack',y:(this.consumption_cate_arr[0].y + (+item.sum_value))};
                    else if ( item.account_type[0] == 'Meal' )
                       this.consumption_cate_arr[1] = {name:'Meal',y:(this.consumption_cate_arr[0].y + (+item.sum_value))};
                    else if ( item.account_type[0] == 'Travel' )
                       this.consumption_cate_arr[2] = {name:'Travel',y:(this.consumption_cate_arr[0].y + (+item.sum_value))};
                    else if ( item.account_type[0] == 'Shopping' )
                       this.consumption_cate_arr[3] = {name:'Shopping',y:(this.consumption_cate_arr[0].y + (+item.sum_value))};
                    else if ( item.account_type[0] == 'Daily' )
                        this.consumption_cate_arr[4] = {name:'Daily',y:(this.consumption_cate_arr[0].y + (+item.sum_value))};
                    else if ( item.account_type[0] == 'Rent and Utilities' )
                        this.consumption_cate_arr[5] = {name:'Rent and Utilities',y:(this.consumption_cate_arr[0].y + (+item.sum_value))};
                    else if ( item.account_type[0] == 'Medecine' )
                        this.consumption_cate_arr[6] = {name:'Medicine',y:(this.consumption_cate_arr[0].y + (+item.sum_value))};
                    else if ( item.account_type[0] == 'Transportation' )
                        this.consumption_cate_arr[7] = {name:'Transportation',y:(this.consumption_cate_arr[0].y + (+item.sum_value))};
                    else 
                        this.consumption_cate_arr[8] = {name:'Others',y:(this.consumption_cate_arr[0].y + (+item.sum_value))};

                    if ( item.account_type[0] == 'Salary' )
                        this.earn_cate_arr[0] = {name:'Salary',y:(this.earn_cate_arr[0].y + (+item.sum_value))};
                    else if ( item.account_type[0] == 'Pocket Money' )
                        this.earn_cate_arr[1] = {name:'Pocket Money',y:(this.earn_cate_arr[0].y + (+item.sum_value))};
                    else
                        this.earn_cate_arr[2] = {name:'Others',y:(this.earn_cate_arr[0].y + (+item.sum_value))};*/
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
