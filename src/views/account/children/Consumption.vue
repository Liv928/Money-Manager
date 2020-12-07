<template>
    <div class="consumption-wrap">
        <head-title :title="'Consumption：'"></head-title>
        <ul class="input-warp">
            <li class="input-item input-required">
                <calendar v-model="date_value" title="Date：" disable-future></calendar>
            </li>
            <li class="input-item input-required">
                <datetime
                    title="Time："
                    v-model="time_value"
                    format="HH:mm"
                    confirm-text="Finish"
                    cancel-text="Cancel">
                </datetime>
            </li>
            <li class="input-item input-required">
                <popup-picker
                    title="Consumption type："
                    :data="account_type_arr"
                    v-model="account_type">
                </popup-picker>
            </li>
            <li class="input-item input-required">
                <x-input v-model="sum_value" title="Money（$）：" keyboard="number"></x-input>
            </li>
            <li class="input-item input-required">
                <popup-picker
                    title="Account type："
                    :data="pay_type_arr"
                    v-model="pay_type">
                </popup-picker>
            </li>
            <li class="input-item input-required">
                <popup-picker
                    title="frequency："
                    :data="freq_arr"
                    v-model="freq_opt">
                </popup-picker>
            </li>
            <li class="input-item">
                <x-input v-model="remarks_value" title="Comment："></x-input>
            </li>
        </ul>
        <i class="sure-btn" @click="subBill()" :class="{'sure-active-true':sum_value}">Confirm</i>
    </div>
</template>
<script>
    import { PopupPicker, Datetime, Calendar, XInput } from 'vux'
    import headTitle from '../../../components/head-title.vue'
    import Tool from '../../../assets/lib/Tool'
    import Util from '../../../assets/lib/Util'
    import types from '../../../store/mutation-types'
    import consumption from '../../account/children/AccountIndex.vue'
    export default {
        name: 'consumption',
        created () {
            this.setNavIndex();
            if(this.$route.query.account_type) {
                this.account_type = [this.$route.query.account_type]
            }
        },
        components: {
            Calendar,
            Datetime,
            XInput,
            PopupPicker,
            headTitle
        },
        data () {
            return {
                is_btn_active: false,
                sum_value: '',
                remarks_value: '',
                account_type_arr: [JSON.parse(sessionStorage.getItem('consumption'))],
                account_type:['Snack'],
                pay_type_arr: [['Cash', 'Debit card','Credit card']],
                pay_type:['Debit card'],
                freq_arr:[['Once','Recurring']],
                freq_opt:['Once'],
                date_value: 'TODAY',
                time_value: Tool.format('hh:mm')
            }
        },
        methods: {
            /**submit bills*/
            subBill () {
                if(!this.sum_value) {
                    this.showMsg('Sum of consumption');
                    return;
                }
                if(isNaN(+this.sum_value)) {
                    this.showMsg('Error consumption number');
                    return;
                }
                var bill = {
                    _id: Date.parse(new Date()),
                    sum_value: this.sum_value,
                    date_value: this.date_value,
                    time_value: this.time_value,
                    remarks_value: this.remarks_value,
                    account_type: this.account_type,
                    pay_type: this.pay_type,
                    freq_opt:this.freq_opt,
                    billTypeNumber: this.billTypeNumber(this.account_type),
                    consumption_or_earn: 0
                };
                //console.log("acc_t "+this.account_type);
                Util.Bill.save(bill);
                this.showMsg('Done');
                this.resetValue();
            },
            showMsg (msg) {
                this.$vux.toast.show({
                    type: 'text',
                    width: 'auto',
                    text: msg,
                    position: 'top'
                });
            },
            resetValue () {
                this.sum_value = '';
                this.remarks_value = '';
                this.date_value = 'TODAY';
                this.time_value = Tool.format('hh:mm');
            },
            setNavIndex () {
                this.$store.commit(types.SET_NAV_INDEX,'2')
            },
            billTypeNumber ( account_type ) {
                switch (account_type[0]){
                    case 'Snack':
                        account_type = 'sgls';
                        break;
                    case 'Meal':
                        account_type = 'cyhs';
                        break;
                    case 'Travel':
                        account_type = 'cxly';
                        break;
                    case 'Shopping':
                        account_type = 'wsgw';
                        break;
                    case 'Daliy':
                        account_type = 'shrc';
                        break;
                    case 'Rent and Utilities':
                        account_type = 'cfsd';
                        break;
                    case 'Medicine':
                        account_type = 'ylyw';
                        break;
                    case 'Transportation':
                        account_type = 'qt';
                        break;
                }
                return account_type;
            }
        }
    }
</script>
