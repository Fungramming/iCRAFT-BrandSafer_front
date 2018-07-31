<template>
  <div>
    <bar-chart :data="chartData" :loading="loading" :data-empty="dataEmpty" height="300px"></bar-chart>
  </div>
</template>

<script>
// CHART
import BarChart from "v-charts/lib/bar.common";
export default {
  components: { BarChart },
  data() {
    return {
      chartData: {
        columns: ["date", "정품", "가품", "공유", "제보"],
        rows: [
          { date: "01/01", 정품: 15, 가품: 12, 공유: 1, 제보: 2 },
          { date: "01/02", 정품: 12, 가품: 25, 공유: 1, 제보: 2 },
          { date: "01/03", 정품: 21, 가품: 10, 공유: 1, 제보: 2 },
          { date: "01/04", 정품: 41, 가품: 32, 공유: 1, 제보: 2 },
          { date: "01/05", 정품: 31, 가품: 30, 공유: 1, 제보: 2 },
          { date: "01/06", 정품: 71, 가품: 55, 공유: 1, 제보: 2 }
        ]
      },
      loading: true,
      dataEmpty: false
    };
  }
};
</script>

<style scoped>
</style>
