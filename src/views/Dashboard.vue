<template>
  <v-layout row wrap>
    <v-flex xs12 class="daily">
      <v-card>
        <v-card-text class="card-title">일간 현황 <span class="duration">({{nowDate}})</span></v-card-text>
        <div class="card-cont">
          <table>
            <thead>
              <th>인증수</th>
              <th>정품 | 공유하기</th>
              <th>가품 | 제보하기</th>
              <th>ETC</th>
            </thead>
            <tbody>
              <td>{{toDayStatus.Total}}</td>
              <td>{{toDayStatus.Genuine}} | {{toDayStatus.Share}}</td>
              <td>{{toDayStatus.Counterfeit}} | {{toDayStatus.Report}}</td>
              <td>{{toDayStatus.ETC}}</td>
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
    <v-flex xs12 md12 lg9 class="weekly">
      <v-card>
        <v-card-text class="card-title">주간 현황</v-card-text>
        <div class="card-cont">
          <bar-chart></bar-chart>
        </div>
      </v-card>    
    </v-flex>
    <v-flex xs12 md12 lg3 class="monthly">
      <v-card>
        <v-card-text class="card-title">월간 누적 <span class="duration">({{this.duration.monthly.firstDay}}~{{ this.duration.monthly.lastDay}})</span></v-card-text>
        <div class="card-cont">
          <table>
            <tbody>
              <tr>
                <td>정품</td>
                <td>{{monthlyStatus.Genuine}}</td>
              </tr>
               <tr>
                <td>가품</td>
                <td>{{monthlyStatus.Counterfeit}}</td>                
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
      toDayStatus: {},
      weeklyStatus: {},
      monthlyStatus: {
        Counterfeit: 0,
        Genuine: 0,
        Report: 0,
        Share: 0,
        ETC: 0,
        Total: 0
      },
      duration: {
        monthly: {
          firstDay: "",
          lastDay: ""
        },
        weekly: {
          firstDay: "",
          lastDay: ""
        }
      }
    };
  },
  mounted() {
    this.nowDate = formatDate();
    this.fetchLiveData();
    this.fetchData();
  },
  methods: {
    fetchLiveData() {
      this.$store.dispatch(Constant.FETCH_LIVE_STATUS).then(resp => {
        console.log("resp :", resp);
      });
    },
    fetchData() {
      this.$store.dispatch(Constant.FETCH_MONTHLY_STATUS).then(resp => {
        let box = resp.data.status;

        // FIRST and LAST DAY
        let keyList = Object.keys(box);
        this.duration.monthly.firstDay = keyList[0];
        this.duration.monthly.lastDay = keyList[keyList.length - 1];

        // TODAY STATUS
        this.toDayStatus = box[this.duration.monthly.lastDay];

        // WEEKLY STATUS
        let startWeekDay = keyList[keyList.length - 7];
        let onKey = false;
        for (let item in box) {
          if (item == startWeekDay) {
            onKey = true;
          }
          if (onKey == true) {
            this.weeklyStatus[item] = box[item];
          }
        }
        this.$store.dispatch(Constant.FETCH_WEEKLY_STATUS, {
          data: this.weeklyStatus
        });

        // MONTHLY STATUS
        for (let daily in box) {
          for (let item in box[daily]) {
            this.monthlyStatus[item] =
              this.monthlyStatus[item] + box[daily][item];
          }
        }
      });
    }
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
