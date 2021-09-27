<template>
    <div class="container-view">
        <div class="home-wrap"
            :class="{'home-active': is_open}">
            <Tabs>
                <TabPane label="Property">
                    <div class="acc-list">
                            <List item-layout="vertical" class="overview" header="Accounts Overview" border size="small">
                                <ListItem class="debit-bal">
                                    <h2>Debit Card</h2>
                                    <template slot="extra">
                                        <li class='bal-value' id="debit_bal"></li>
                                    </template>
                                </ListItem>
                                <ListItem class="credit-bal"><h2>Credit Card</h2>
                                    <template slot="extra">
                                        <li class='bal-value' id="credit_bal"></li>
                                    </template>
                                </ListItem>
                                <ListItem class="cash-bal"><h2>Cash</h2>
                                    <template slot="extra">
                                        <li class='bal-value' id="cash_bal"></li>
                                    </template>
                                </ListItem> 
                                <ListItem class="total_bal"><h2>Total Assets</h2>
                                    <template slot="extra">
                                        <li class='bal-value' id="total_balance"></li>
                                    </template>
                                </ListItem>
                            </List>
                    </div>
                </TabPane>
                <TabPane label="Owing">
                    <div class="acc-list">
                        <List item-layout="vertical" class="overview" header="Owing Overview" border>
                            <ListItem class="debit-bal"><h2>Cedit Card</h2>
                                <template slot="extra">
                                        <li class='bal-value' id="credit_bal"></li>
                                    </template>
                            </ListItem>
                            <ListItem class="credit-bal"><h2>Borrowed</h2>
                                <template slot="extra">
                                        <li class='bal-value' id="credit_bal"></li>
                                </template>
                            </ListItem>
                            
                        </List>
                    </div>
                </TabPane>
            </Tabs>
            
            <div class="bdg-card">
                <Card :bordered="false" style="background-color: rgb(205, 228, 236)">
                    <p slot="title">Your Monthly Budget</p>
                    <Button type="primary" @click="modal1 = true">Set Your Budget</Button>
                    <p> {{model1}}</p>
                    <Modal
                            v-model="modal1"
                            title="Set your budget for this month!"
                            @on-ok="setBudget"
                            @on-cancel="cancel">
                            <InputNumber
                                :max="10000"
                                v-model="this.budget"
                                :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                :parser="value => value.replace(/\$\s?|(,*)/g, '')"></InputNumber>
                    </Modal>    
                    
                    <p style="margin-left:6px;margin-top:14px;font-weight:bold;"> Budget: {{this.budget}} for {{this.current_month}}</p>
                </Card>
            </div>
            
            <div class="acc-button">
                <Button to="/account/" type="primary" size="large" shape="circle">Let's start your recorder!</Button>
            </div>
            <!--
            <a href="#/account/consumption" class="go-account go-consumption">Consumption</a>
            <a href="#/account/earn" class="go-account go-earn">Earn</a>
            <svg @click="is_open = true" slot="icon" class="home-arrow" v-show="!is_open">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#nav-arrow"></use>
            </svg>
            -->
        </div>
    </div>
</template>
<script>
    import { Scroller } from 'vux'
    import GestureMobile from '../../assets/lib/GestureMobile'
    import types from '../../store/mutation-types'
    import CountUp from '../../assets/lib/countUp'
    import Util from '../../assets/lib/Util'
    import XChart from '../../components/chart.vue'
    import options from '../../assets/chart-option/chart-options'
    export default {
        name: 'home',
        data: function () {
            let chart_option = options.line;
            
            return {
                id:'test',
                option: chart_option,
                monthly_arr:[],
                is_open: false,
                total_balance: 0,
                debit_bal:0,
                credit_bal:0,
                cash_bal:0,
                modal1:false,
                budget:0,
                current_month:'',
            }
        },
        components:{
            Scroller,
            XChart
        },
        created () {
            this.addDate();
            this.gestureMobile();
            this.setNavIndex();
            this.fetchBalance();
            this.fetchMonthlyConsump();
            this.initChart();
            //this.initModel();
        },
        methods: {
            
            setBudget(){
                this.budget = budget;
                this.$Message.info('You have successfully set your monthly budget!')
            },
            cancel () {
                this.$Message.info('Canceled');
            },
            /**手势*/
            gestureMobile () {
                this.$nextTick(() => {
                    let _this = this;
                    GestureMobile(this.$el,{
                        upCallBackFun () {
                            _this.is_open = true;
                        },
                        downCallBackFun () {
                            _this.is_open = false;
                        }
                    });
                })
            },
            initChart(){
                this.option.series[0].data=this.monthly_arr;
                //console.log(this.monthly_arr);
            },
            fetchMonthlyConsump(){
                this.monthly_arr = Util.MonthlyConsump.query();
            },
            /**获取可用余额*/
            fetchBalance () {
                
                this.total_balance = Util.TotalBalance.query();
                this.debit_bal = Util.DabitBalance.query();
                this.credit_bal = Util.CreditBalance.query();
                this.cash_bal = Util.CashBalance.query();

                this.$nextTick(() => {
                    new CountUp("total_balance", 0, this.total_balance, 2, 2).start();
                    new CountUp("debit_bal",0,this.debit_bal,2,0).start();
                    new CountUp("credit_bal",0,this.credit_bal,2,0).start();
                    new CountUp("cash_bal",0,this.cash_bal,2,0).start();
                })
                
            },
            /**设置导航条按钮状态*/
            setNavIndex () {
                this.$store.commit(types.SET_NAV_INDEX,'1')
            },
            /**Get current year and months */
            addDate() {
                    var nowDate = new Date();
                    let date = {
                        year: nowDate.getFullYear(),
                        month: nowDate.getMonth() + 1
                    }
                    console.log(date);
                    if (date.month == 12){
                        this.current_month = 'December';
                    }
                    if (date.month == 11){
                        this.current_month = 'November';
                    }
                    if (date.month == 10){
                        this.current_month = 'October';
                    }
                    if (date.month == 9){
                        this.current_month = 'September';
                    }
                    if (date.month == 8){
                        this.current_month = 'August';
                    }
                    if (date.month == 7){
                        this.current_month = 'July';
                    }
                    if (date.month == 6){
                        this.current_month = 'June';
                    }
                    if (date.month == 5){
                        this.current_month = 'May';
                    }
                    if (date.month == 4){
                        this.current_month = 'April';
                    }
                    if (date.month == 3){
                        this.current_month = 'March';
                    }
                    if (date.month == 2){
                        this.current_month = 'February';
                    }
                    if (date.month == 1){
                        this.current_month = 'January';
                    }

                    this.current_year = date.year;
                    
            },
        }
    }
</script>
<style lang="scss">
    @import "../../assets/scss/define";
    .bdg-card{
        margin-right: 20px;
        margin-left: 20px;
        margin-top: 10px;
        background-color: rgb(136, 174, 189) ;
    }
    .acc-button{
        margin-top: 50px;
        text-align: center;
        
    }
    .acc-list{
        margin-right: 20px;
        margin-left: 20px;
        margin-top: 5px;
        
        height: 300px;
    }
    .overview{
        font-size: 16px;
        font-weight: bold;
        background-color:rgb(205, 228, 236);
    }
    .bal-value{
        &:before{
            content: '$ ';
        }
    }
    .total-bal{
        background-color: rgb(92, 222, 240);
    }
    .debit-bal{
        background-color: rgb(106, 194, 209);
    }
    .credit-bal{
        background-color: rgb(128, 190, 161);
    }
    .cash-bal{
        background-color: rgb(198, 204, 144);
    }
    .home-active{
        .balance-wrap{
            top: 35%;
        }
        .home-btn-wrap{
            bottom: 15%;
            opacity: 1;
        }
    }
    .balance-wrap{
        @extend %pa;
        @extend %oh;
        @extend %l50;
        @extend %t50;
        width: 60%;
        transition: all 1s;
        transform: translate3d(-50%,-50%,0);
        padding-bottom: 60%;
        border-radius: 50%;
        background-color: #fff;
        border: 1px solid rgb(224, 230, 237)
    }
    .balance-title{
        /*@extend %pa;*/
        @extend %f12;
        @extend %fwn;
        @extend %tar;
        @extend %l0;
        @extend %r0;
        color: rgb(3, 3, 3);
        top: 30%;
    }
    .balance-total{
      background-color: rgb(248, 186, 207);
    }
    .balance-icon{
        @extend %pa;
        top: 25%;
        left: 25%;
        width: 50%;
        height: 50%;
        fill: #ddd;
    }
    .home-btn-wrap{
        @extend %pa;
        @extend %r0;
        @extend %l0;
        @extend %tac;
        @extend %f14;
        @extend %cfff;
        opacity: 0;
        transition: all .5s;
        bottom: -30%;
    }
    .home-btn-item{
        @extend %db;
        @extend %cp;
        @extend %cfff;
        margin: 20px auto 0;
        width: 120px;
        height: 32px;
        line-height: 32px;
        background-color: #58B7FF;
        border-radius: 5px;
        box-shadow: 0 3px 0 0 #1D8CE0;
    }
    .home-arrow{
        @extend %pa;
        @extend %l50;
        margin-left: -10px;
        bottom: 20px;
        width: 20px;
        height: 20px;
        fill: #999;
        animation: arrow-animate 2s ease-in-out infinite;
    }
    @keyframes arrow-animate {
        0%{
            bottom: 10px;
        }
        50%{
            bottom: 20px;
        }
        100%{
            bottom: 10px;
        }
    }
</style>
