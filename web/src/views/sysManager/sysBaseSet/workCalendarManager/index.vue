<template>
  <div class="workCalendarManager-container-list" ref="content">
    <form id="form1" runat="server">
      <div id="calendar">
      </div>
    </form>
  </div>
</template>

<script>
  import '@/assets/plugins/calendar/calendar'
  import '@/assets/plugins/calendar/calendar.css'
  import { getDayStatus, setDayStatus, initLowYear } from '@/api/sysManager/sysBaseSet/workCalendarManager'

  export default {
    name: 'index',
    data() {
      var that = this
      return {
        show: false,
        calendarData: {
          /*
          * 传入今天的时间
          */
          date: new Date(),
          width: 800,
          height: 400,
          /* 左右框显示的比例 */
          rate: 0.69,
          week: false, // 是否开启单双休
          week_walue: '2019/4/13', // 双休对应的周六
          isclick: true,
          configDay: {}, // 系统配置,
          goWork(Y, M, ClickDays, value) {
            return that.setWorkAndRestFun(Y, M, ClickDays, value)
          },
          rest(Y, M, ClickDays, value) {
            return that.setWorkAndRestFun(Y, M, ClickDays, value)
          },
          initBtn(year, month) {
            return that.initCalendar(year, month)
          },
          updateDate(Y, M) {
            return that.getCalendarData(Y, M).then(() => {
              return that.calendarData.restDay
            })
          },
          restDay: []
        },
        initYear: new Set()
      }
    },
    created() {
      let date = new Date()

    },
    mounted() {
      var date = new Date()
      let width = window.parseInt(window.getComputedStyle(this.$refs.content).width)
      if (width > 800) {
        width = 800
      }
      if (width < 500) {
        width = 500
      }
      this.calendarData.width = width
      this.calendarData.height = width / 1.5
      this.getCalendarData(date.getFullYear(), date.getMonth() + 1).then(() => {
        $('#calendar').calendar(this.calendarData)
      })
    },
    methods: {
      setWorkAndRestFun(Y, M, ClickDays, value) {
        let data = this.calendarData.restDay.filter(item => item.year === Y)
        if (this.initYear.has(Y)) {
          this.show = true
          let data = {
            date: `${Y}-${M}-${ClickDays}`,
            dayStatus: value
          }
          return setDayStatus(data).then(res => {
            if (res.rel) {
              this.calendarData.restDay = this.calendarData.restDay.filter(item => {
                if (item.year == Y && item.month == M) {
                  return
                }
                return true
              })
              this.getCalendarData(Y, M)
              this.$message({
                message: '设置成功',
                type: 'success'
              });
            }
          }).catch(() => new Promise((reslove, reject) => reslove()))
        } else {
          return this.$confirm('亲，当前年度没有进行初始化，请初始化后再进行操作', '提示', {
            showConfirmButton: false,
            cancelButtonText: '确定',
            type: 'warning'
          }).catch(() => {
            return new Promise((reslove, reject) => reject())
          })
        }
      },
      initCalendars(year, month) {
        this.show = true
        this.calendarData.restDay = this.calendarData.restDay.filter(item => item.year != year)
        return initLowYear({year}).then(res => {
          if (res.rel) {
            this.getCalendarData(year, month)
            this.$message({
              message: '初始化成功',
              type: 'success'
            });
          }
          return res
        })
      },
      initCalendar(year, month) {
        return new Promise((reslove, reject) => {
          if (this.initYear.has(year)) {
            this.$confirm(year + '年已经初始化，是否重新初始化？', '警告', {
              type:'warning'
            }).then(() => {
              this.initCalendars(year, month).then(res => {
                reslove(res)
              })
            }).catch(() => {})
          } else {
            this.$confirm('确认初始化' + year + '工作日历吗？', '提示', {
              type: 'info'
            }).then(() => {
              this.initCalendars(year, month).then(res => {
                reslove(res)
              })
            }).catch(() => {})
          }
        })
      },
      getCalendarData(Y, M) {
        let some = this.calendarData.restDay.some(item => {
          if (item.year == Y && item.month == M) {
            return true
          }
        })
        if (!some) {
          this.show = true
          if (M < 10) M = '0' + M
          return getDayStatus({date: `${Y}-${M}`}).then(res => {
            if (res.data.length > 0) {
              let data = res.data.map(item => {
                let date = new Date(item.date)
                item.month = date.getMonth() + 1
                item.day = date.getDate()
                item.value = item.status
                return item
              })
              let t = this.calendarData.restDay
              Array.prototype.push.apply(this.calendarData.restDay, data)
              // this.calendarData.restDay = this.calendarData.restDay.concat(data)
              this.initYear.add(res.data[0].year)
            }
            this.show = false
          })
        } else {
          this.show = false
          return new Promise(e => e())
        }
      }
    }
  }
</script>

<style scoped>
  .workCalendarManager {
    padding-top: 50px;
  }
</style>
