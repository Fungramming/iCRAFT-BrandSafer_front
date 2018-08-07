<template>
  <div>
    <bar-chart :data="chartData" :loading="loading" :data-empty="dataEmpty" height="300px" class="bar-chart"></bar-chart>
  </div>
</template>

<script>
// CHART
import BarChart from "v-charts/lib/bar.common";
export default {
  components: { BarChart },
  data() {
    return {
      date: "",
      weeklyStatus: {},
      chartData: {
        columns: ["날짜", "정품", "가품", "공유", "제보"],
        rows: []
      },
      loading: true,
      dataEmpty: false
    };
  },
  mounted() {
    this.date = this.$store.state.date.split(" ")[0];
    this.weeklyStatus = this.$store.state.weeklyStatus;
    this.makeChartData();
  },
  methods: {
    makeChartData: function() {
      let box = this.weeklyStatus.data;
      for (let item in box) {
        let obj = {
          날짜: item,
          정품: box[item].Genuine,
          가품: box[item].Counterfeit,
          공유: box[item].Share,
          제보: box[item].Report
        };
        this.chartData.rows.push(obj);
      }
    }
  }
};
</script>

<style scoped>
.bar-chart {
  overflow: hidden;
}
</style>
