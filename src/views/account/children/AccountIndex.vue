<template>
    <div class="account-wrap">
        <head-title :title="'Recorder：'"></head-title>
        <Tabs>
            <TabPane label="Consumption">
                <dl style="line-height: 40px;font-size: 16px;display: flex; align-items: center; flex-wrap: wrap">
                    <dd v-for="(item, index) in consumption" :key="index" @click="toDetail('consumption', item.name)" style="cursor: pointer; width: 25%; text-align: center">
                        <img :src="item.icon" class="icon">{{item.name}}
                    </dd>
                    <dd style="cursor: pointer; width: 25%; text-align: center">
                        <img src="../../../assets/images/add.png" @click="modal = true; type = 'consumption'" class="icon">Add
                    </dd>
                    <dd style="cursor: pointer; width: 25%; text-align: center">
                        <img src="../../../assets/images/subtract.png" class="icon" @click="remove('consumption')">Delete
                    </dd>
                </dl>
            </TabPane>
            <TabPane label="Income">
                <dl style="line-height: 40px;font-size: 16px;display: flex; align-items: center; flex-wrap: wrap">
                    <dd v-for="(item, index) in earn" :key="index" @click="toDetail('earn', item.name)" style="cursor: pointer; width: 25%; text-align: center">
                        <img :src="item.icon" class="icon">{{item.name}}
                    </dd>
                    <dd style="cursor: pointer; width: 25%; text-align: center">
                        <img src="../../../assets/images/add.png" @click="modal = true; type = 'earn'" class="icon">Add
                    </dd>
                    <dd style="cursor: pointer; width: 25%; text-align: center">
                        <img src="../../../assets/images/subtract.png" class="icon" @click="remove('earn')">Delete
                    </dd>
                </dl>
            </TabPane>
        </Tabs>
        <Modal
            v-model="modal"
            title="New type"
            @on-ok="save"
            @on-cancel="cancel">
            <Input v-model="value" placeholder="Type name"/>
        </Modal>
    </div>
</template>
<script>
    import types from '../../../store/mutation-types'
    import headTitle from '../../../components/head-title.vue'
    export default {
        name: 'account_index',
        data () {
          return {
              value: '',
              type: 'consumption',
              modal: false,
              earn: [
                  {
                      name: 'Salary',
                      icon: require('../../../assets/images/default.png')
                  },
                  {
                      name: 'Pocket money',
                      icon: require('../../../assets/images/default.png')
                  }
              ],
              consumption: [
                  {
                      name: 'Snack',
                      icon: require('../../../assets/images/default.png')
                  },
                  {
                      name: 'Meal',
                      icon: require('../../../assets/images/default.png')
                  },
                  {
                      name: 'Travel',
                      icon: require('../../../assets/images/default.png')
                  },
                  {
                      name: 'Shopping',
                      icon: require('../../../assets/images/default.png')
                  },
                  {
                      name: 'Daliy',
                      icon: require('../../../assets/images/default.png')
                  },
                  {
                      name: 'Rent and Utilities',
                      icon: require('../../../assets/images/default.png')
                  },
                  {
                      name: 'Medicine',
                      icon: require('../../../assets/images/default.png')
                  },
                  {
                      name: 'Transportation',
                      icon: require('../../../assets/images/default.png')
                  }
              ]
          }
        },
        created () {
            let consumption = JSON.parse(sessionStorage.getItem('consumption'))
            let earn = JSON.parse(sessionStorage.getItem('earn'))
            console.log(earn)
            if (consumption && consumption.length > 0) {
                let arr = consumption.map((item) => {
                    return {
                        name: item,
                        icon: require('../../../assets/images/default.png')
                    }
                })
                this.consumption = arr
            }
            if (earn && earn.length > 0) {
                let arr = earn.map((item) => {
                    return {
                        name: item,
                        icon: require('../../../assets/images/default.png')
                    }
                })
                this.earn = arr
            }
            this.setNavIndex();
        },
        components: {
            headTitle
        },
        methods: {
            remove (type) {
                this.type = type
                if (this.type === 'consumption') {
                    this.consumption.pop()
                    this.setLocalStorage('consumption', this.consumption)
                } else {
                    this.earn.pop()
                    this.setLocalStorage('earn', this.earn)
                }
            },
            setLocalStorage (name, data) {
                let arr = data.map((item) => {
                    return item.name
                })
                sessionStorage.setItem(name, JSON.stringify(arr))
                console.log(JSON.parse(sessionStorage.getItem(name)))
            },
            save () {
                if (this.type === 'consumption') {
                    this.consumption.push({
                        name: this.value,
                        icon: require('../../../assets/images/default.png')
                    })
                    this.setLocalStorage('consumption', this.consumption)
                } else {
                    this.earn.push({
                        name: this.value,
                        icon: require('../../../assets/images/default.png')
                    })
                    this.setLocalStorage('earn', this.earn)
                }
                this.value = ''
            },
            cancel () {
                this.value = ''
            },
            toDetail (name, val) {
              this.$router.push({
                  name,
                  query: {
                      account_type: val
                  }
              })
            },
            setNavIndex () {
                this.$store.commit(types.SET_NAV_INDEX,'2')
            }
        }
    }
</script>
<style lang="scss" >
    @import "../../../assets/scss/define";
    .icon{
        width: 50px;
        display: block;
        margin: 0 auto;
    }
    .ivu-tabs-nav-wrap {
        text-align: center;
    }
    .ivu-tabs-nav-scroll {
        display: inline-block;
    }
    .go-btn-box{
        @extend %pa;
        @extend %tac;
        @extend %f14;
        @extend %cfff;
        @extend %l0;
        @extend %r0;
        @extend %t50;
        transform: translate3d(0,-50%,0);
    }
    .go-account{
        @extend %db;
        @extend %cp;
        @extend %cfff;
        margin: 0 auto 20px;
        width: 150px;
        height: 35px;
        line-height: 35px;
        border-radius: 5px;
        &.go-consumption{
            background-color: #FF4949;
            box-shadow: 0 3px 0 0 red;
        }
        &.go-earn{
            background-color: #69ce72;
            box-shadow: 0 3px 0 0 #13CE66;
        }
    }
</style>

