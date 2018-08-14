<template>
  <div class="tableBs">
    <!-- table wrap -->
    <v-app class="inspire">
      <v-card-title>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6 md5>
          <span class="span-without-selectbox">기간조회</span>
          <date-picker v-model="dateStart" :lang="lang"></date-picker>
        </v-flex>
        <v-flex d-flex xs12 sm6 md5>
          <date-picker v-model="dateFinish" :lang="lang"></date-picker>
        </v-flex>
        <div class="search-btn" @click="getDateData">
          <v-icon>search</v-icon>
        </div>
      </v-layout>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="검색어"
        hide-details
      ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="logs"
        :search="search"
        :pagination.sync="pagination"
        v-model="selected"
        item-key="idx"
        select-all
        class="elevation-1"
      >
        <template slot="headers" slot-scope="props">
          <tr>
            <th>
              <v-checkbox
                :input-value="props.all"
                :indeterminate="props.indeterminate"
                primary
                hide-details
                @click.native="toggleAll"
              ></v-checkbox>
            </th>
            <th
              v-for="header in props.headers"
              :key="header.text"
              :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
              @click="changeSort(header.value)"
            >
              {{ header.text }}
            </th>
          </tr>
        </template>

        <template slot="items" slot-scope="props">
          <tr :active="props.selected" @click="props.selected = !props.selected">
            <td>
              <v-checkbox
                :input-value="props.selected"
                primary
                hide-details
              ></v-checkbox>
            </td>
            <td class="text-xs-left">{{ total - props.index - (pagination.page -1)* pagination.rowsPerPage }}</td>
            <td class="text-xs-left">{{ props.item.dtAttempted }}</td>
            <td class="text-xs-left">{{ props.item.role_name }}</td>
            <td class="text-xs-left">{{ props.item.id }}</td>
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.resultCode }}</td>
            <td class="text-xs-left">{{ props.item.remoteAddr }}</td>
          </tr>
        </template>
      </v-data-table>
      <div class="v-datatable__actions">
        <span>per page :</span>
        <div class="v-datatable__actions__select">          
          <select v-model="pagination.rowsPerPage">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <!-- <option value="-1">All</option> -->
          </select>
        </div>
      </div>

      <span class="bottom-total">전체건수 : <span class="bottom-total-result">{{total}}</span> 건</span>
      <div class="bottom-contents-wrap">
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages" :total-visible="7"></v-pagination>
        </div>
      </div>
    </v-app>

  </div>
</template>

<script>
import Constant from "../../constant.js";

export default {
  data() {
    return {
      search: "",
      dialog: false,
      pagination: {
        page: 1,
        rowsPerPage: 10
      },

      // date picker
      dateStart: "",
      dateFinish: "",
      lang: {
        days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        pickers: [
          "next 7 days",
          "next 30 days",
          "previous 7 days",
          "previous 30 days"
        ],
        placeholder: {
          date: "Select Date",
          dateRange: "Select Date Range"
        }
      },
      total: "",
      total_index: "",
      selected: [],
      headers: [
        { text: "번호", align: "left", value: "idx", sortable: false },

        {
          text: "로그인 일시",
          align: "left",
          value: "dtAttempted",
          sortable: false
        },
        { text: "구분", align: "left", value: "role_name", sortable: false },
        { text: "아이디", align: "left", value: "id", sortable: false },
        { text: "이름", align: "left", value: "name", sortable: false },
        {
          text: "작업내용",
          align: "left",
          value: "resultCode",
          sortable: false
        },
        { text: "접속 IP", align: "left", value: "remoteAddr", sortable: false }
      ],
      logs: []
    };
  },
  computed: {
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;

      return Math.ceil(this.total / this.pagination.rowsPerPage);
    }
  },
  // watch: {
  //   dateStart() {
  //     this.$store
  //       .dispatch(Constant.FETCH_ACCOUNT_LOG, {
  //         start: this.dateStart,
  //         end: this.dateFinish
  //       })
  //       .then(resp => {
  //         this.logs = resp.data.logs.reverse();
  //         this.total = this.logs.length;
  //       });
  //   },
  //   dateFinish() {
  //     this.$store
  //       .dispatch(Constant.FETCH_ACCOUNT_LOG, {
  //         start: this.dateStart,
  //         end: this.dateFinish
  //       })
  //       .then(resp => {
  //         this.logs = resp.data.logs.reverse();
  //         this.total = this.logs.length;
  //       });
  //   }
  // },
  updated() {
    // console.log("this.$children[0] :", this.$children[0].$children[0].text);
    // console.log("this.$children[0] :", this.$children[0].$children[1].text);
    this.dateStart = this.$children[0].$children[0].text;
    this.dateFinish = this.$children[0].$children[1].text;
  },
  mounted() {
    this.getDatas();
  },
  methods: {
    dateSet() {
      let today = new Date();
      let ThreeMonthAgo = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      let mm_1 = today.getMonth();
      let yyyy = today.getFullYear();

      if (dd < 10) {
        dd = "0" + dd;
      }

      if (mm < 10) {
        mm = "0" + mm;
      }

      if (mm_1 < 10) {
        mm_1 = "0" + mm_1;
      }

      today = yyyy + "-" + mm + "-" + dd;
      ThreeMonthAgo = yyyy + "-" + mm_1 + "-" + dd;

      this.dateStart = ThreeMonthAgo;
      // this.dateStart = today;
      this.dateFinish = today;
    },
    dateFormat() {
      let logs = this.logs;
      for (let item in logs) {
        let date = new Date(logs[item].dtAttempted);
        let formatDate = date.toLocaleDateString();
        logs[item].dtAttempted = formatDate;
      }
    },
    getDatas() {
      this.dateSet();
      this.$store
        .dispatch(Constant.FETCH_ACCOUNT_LOG, {
          start: this.dateStart,
          end: this.dateFinish
          // start: "2016-07-01",
          // end: "2016-08-14"
        })
        .then(resp => {
          this.logs = resp.data.logs.reverse();
          this.total = this.logs.length;
        });
      this.dateFormat();
    },
    getDateData() {
      this.$store
        .dispatch(Constant.FETCH_ACCOUNT_LOG, {
          start: this.dateStart,
          end: this.dateFinish
          // start: "2016-07-01",
          // end: "2016-08-14"
        })
        .then(resp => {
          this.logs = resp.data.logs.reverse();
          this.total = this.logs.length;
        });
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.logs.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/table";
@import "../../scss/modal";
</style>
