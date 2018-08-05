<template>
  <v-layout row wrap>
    <v-flex xs12 class="daily">
      <v-card>
        <v-card-text class="card-title">일간 현황 ({{nowDate}})</v-card-text>
        <div class="card-cont">
          <table>
            <thead>
              <th>인증수</th>
              <th>정품 | 공유하기</th>
              <th>가품 | 제보하기</th>
              <th>ETC</th>
            </thead>
            <tbody>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tbody>
          </table>
        </div>
      </v-card>    
    </v-flex>
    <v-flex xs12 class="live">
      <v-card>
        <v-card-text class="card-title">실시간 현황</v-card-text>
        <div class="card-cont">
          <line-chart></line-chart>
        </div>
      </v-card>    
    </v-flex>
    <v-flex xs12 md9 class="weekly">
      <v-card>
        <v-card-text class="card-title">주간 현황</v-card-text>
        <div class="card-cont">
          <bar-chart></bar-chart>
        </div>
      </v-card>    
    </v-flex>
    <v-flex xs12 md3 class="monthly">
      <v-card>
        <v-card-text class="card-title">월간 누적</v-card-text>
        <div class="card-cont">
          <table>
            <tbody>
              <tr>
                <td>정품</td>
                <td>{{monthlyStatus.Genuine}}</td>
              </tr>
               <tr>
                <td>가품</td>
                <td>{{monthlyStatus.Genuine}}</td>                
              </tr>
               <tr>
                <td>공유</td>
                <td>{{monthlyStatus.Share}}</td>
              </tr>
               <tr>
                <td>제보</td>
                <td>{{monthlyStatus.Report}}</td>                
              </tr>
            </tbody>
          </table>
        </div>
      </v-card>    
    </v-flex>
  </v-layout>
</template>

<script>
import { formatDate } from "../store/helper.js";
import LineChart from "../components/Dashboard/LineChart.vue";
import BarChart from "../components/Dashboard/BarChart.vue";
import Constant from "../constant.js";
export default {
  components: { LineChart, BarChart },
  data() {
    return {
      nowDate: "value",
      monthlyStatus: {
        Counterfeit: 0,
        Genuine: 0,
        Report: 0,
        Share: 0,
        ETC: 0,
        Total: 0
      }
    };
  },
  mounted() {
    this.nowDate = formatDate();
    this.$store.dispatch(Constant.FETCH_DAILY_STATUS).then(resp => {
      console.log("resp :", resp);
    });
    this.$store.dispatch(Constant.FETCH_MONTHLY_STATUS).then(resp => {
      let box = resp.data.status;
      for (let daily in box) {
        for (let item in box[daily]) {
          this.monthlyStatus[item] =
            this.monthlyStatus[item] + box[daily][item];
        }
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.flex {
  padding: 4px;
}
.flex + .flex {
  margin-top: 10px;
}
.card-title {
  background-color: #f9f9f9;
  color: #646464;
  padding: 10px 20px;
  text-align: left;
  font-size: 1.2em;
  font-weight: 600;
}
.card-cont {
  padding: 10px;
  table {
    width: 100%;
    th {
      font-weight: 400;
    }
    tbody {
      font-weight: 600;
    }
  }
}
</style>
