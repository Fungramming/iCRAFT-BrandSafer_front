<template>
  <div>
    <line-chart :data="chartData" :loading="loading" :data-zoom="dataZoom" height="300px"></line-chart>
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
      chartData: {
        columns: ["date", "cost", "profit"],
        rows: [
          { date: "00:01", cost: 15, profit: 12 },
          { date: "00:02", cost: 12, profit: 25 },
          { date: "00:03", cost: 21, profit: 10 },
          { date: "00:04", cost: 41, profit: 32 },
          { date: "00:05", cost: 31, profit: 30 },
          { date: "00:06", cost: 31, profit: 30 },
          { date: "00:07", cost: 31, profit: 30 },
          { date: "00:08", cost: 31, profit: 30 },
          { date: "00:09", cost: 31, profit: 30 },
          { date: "00:10", cost: 31, profit: 30 },
          { date: "00:11", cost: 31, profit: 30 },
          { date: "00:12", cost: 31, profit: 30 },
          { date: "00:13", cost: 31, profit: 30 },
          { date: "00:14", cost: 31, profit: 30 },
          { date: "00:15", cost: 31, profit: 30 },
          { date: "00:16", cost: 31, profit: 30 },
          { date: "00:17", cost: 31, profit: 30 },
          { date: "00:18", cost: 31, profit: 30 },
          { date: "00:19", cost: 31, profit: 30 },
          { date: "00:20", cost: 31, profit: 30 },
          { date: "00:21", cost: 31, profit: 30 },
          { date: "00:22", cost: 31, profit: 30 },
          { date: "00:23", cost: 31, profit: 30 },
          { date: "00:24", cost: 31, profit: 30 },
          { date: "00:25", cost: 31, profit: 30 },
          { date: "00:26", cost: 31, profit: 30 },
          { date: "00:27", cost: 31, profit: 30 },
          { date: "00:28", cost: 31, profit: 30 },
          { date: "00:29", cost: 31, profit: 30 },
          { date: "00:30", cost: 31, profit: 30 },
          { date: "00:31", cost: 31, profit: 30 },
          { date: "00:32", cost: 31, profit: 30 },
          { date: "00:33", cost: 31, profit: 30 },
          { date: "00:34", cost: 31, profit: 30 },
          { date: "00:35", cost: 71, profit: 55 }
        ]
      },
      dataZoom: [
        {
          type: "slider"
        }
      ],
      loading: true
    };
  }
};
</script>

<style scoped>
</style>
