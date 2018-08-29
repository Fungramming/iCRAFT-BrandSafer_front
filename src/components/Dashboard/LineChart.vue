<template>
  <div>
    <line-chart :data="chartData" :loading="loading"  class="line-chart" height="300px"></line-chart>
  </div>
</template>

<script>
// CHART
import LineChart from "v-charts/lib/line.common";
import "echarts/lib/component/dataZoom";
export default {
  components: { LineChart },
  data() {
    return {
      liveStatus: {},
      chartSettings: {
        xAxisType: " "
      },
      chartData: {
        columns: ["시간", "정품", "가품", "제보하기"],
        rows: []
      },
      // dataZoom: [
      //   {
      //     type: "slider",
      //     start: 0,
      //     end: 100
      //   }
      // ],
      loading: true
    };
  },
  mounted() {
    this.liveStatus = this.$store.state.liveStatus;
    this.makeChartData();
  },
  methods: {
    makeChartData: function() {
      let box = this.liveStatus.status;
      console.log("box :", box);
      for (let item in box) {
        let time = item.split(" ")[1];
        let obj = {
          시간: time,
          정품: box[item].Genuine,
          가품: box[item].Counterfeit,
          제보: box[item].Report
        };
        this.chartData.rows.push(obj);
      }
      // let keyList = Object.keys(box);
      // let startTime = keyList[0];
      // let lastTime = keyList[keyList.length - 1];
      // console.log("startTime ,lastTime:", startTime, lastTime);
      // let sTime = new Date("2018,02,03 10:32");
      // let lTime = new Date("2018,02,03 12:32");
      //   console.log((lTime - sTime) / 60 / 1000);

      // let sTime = new Date("2018,02,03 10:32");
      // let lTime = new Date("2018,02,03 18:32");
      // let terms = [];
      // console.log((lTime - sTime) / 60 / 1000);

      // console.log("dt :", sTime);
      // for (let i = 1; i <= 8; i++) {
      //   sTime.setMinutes(sTime.getMinutes() + 30 * 1);
      //   terms.push(sTime);
      // }
      // console.log("sTime :", sTime);
      // console.log("terms :", terms);
    }
  }
};
</script>

<style scoped>
.line-chart {
  overflow: hidden;
}
</style>
