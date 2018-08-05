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
      monthlyStatus: {},
      chartData: {
        columns: ["날짜", "정품", "가품", "공유", "제보"],
        rows: [
          { 날짜: "01/01", 정품: 15, 가품: 12, 공유: 1, 제보: 2 },
          { 날짜: "01/02", 정품: 12, 가품: 25, 공유: 1, 제보: 2 },
          { 날짜: "01/03", 정품: 21, 가품: 10, 공유: 1, 제보: 2 },
          { 날짜: "01/04", 정품: 41, 가품: 32, 공유: 1, 제보: 2 },
          { 날짜: "01/05", 정품: 31, 가품: 30, 공유: 1, 제보: 2 },
          { 날짜: "01/06", 정품: 71, 가품: 55, 공유: 1, 제보: 2 }
        ]
      },
      loading: true,
      dataEmpty: false
    };
  },
  mounted() {
    this.date = this.$store.state.date.split(" ")[0];
    this.getChartData();
    this.makeWeekday();
  },
  methods: {
    getChartData() {
      let today = new Date();
      this.monthlyStatus = this.$store.state.monthlyStatus.status;
      console.log("this.monthlyStatus :", this.monthlyStatus);
      for (let item in this.monthlyStatus) {
        let obj = {
          날짜: "",
          정품: 1,
          가품: 1,
          공유: 1,
          제보: 1
        };
        obj["날짜"] = item.replace("2018-", "");
        // obj["정품"] = item.obj["가품"] = obj["공유"] = obj[
        //   "제보"
        // ] =
        this.chartData.rows.push(obj);
      }
    },
    makeWeekday() {
      function getMonday() {
        let d = new Date();
        var day = d.getDay(),
          diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        return new Date(d.setDate(diff));
      }

      console.log(getMonday());
    }
  }
};
</script>

<style scoped>
.bar-chart {
  overflow: hidden;
}
</style>
