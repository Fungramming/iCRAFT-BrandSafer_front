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
    }
  }
};
</script>

<style scoped>
.line-chart {
  overflow: hidden;
}
</style>
