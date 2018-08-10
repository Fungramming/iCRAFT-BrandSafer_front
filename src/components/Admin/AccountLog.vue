<template>
  <div class="tableBs">
    <!-- table top menu -->
    <!-- <div class="tableBs-top">
      <p>검색 조건</p>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6 md2>
          <span class="span-without-selectbox">기간조회</span>
          <date-picker v-model="date_start" :lang="lang"></date-picker>
        </v-flex>
        <v-flex d-flex xs12 sm6 md2>
          <date-picker v-model="date_finish" :lang="lang"></date-picker>
        </v-flex>
        <v-flex d-flex xs12 sm12 md4>
          <div class="selectbox selectbox-with-date">
            <span>구분</span>
            <select id="select1" name="searchType" class="form-control" size="1">
              <option selected value="전체">전체</option>
              <option value="관리자">관리자</option>
              <option value="운영자">운영자</option>
            </select>
          </div>
        </v-flex>
        <v-flex d-flex xs12 sm12 md4>
          <div class="selectbox select-search">
            <span>검색어</span>
            <select id="select2" name="searchType" class="form-control" size="1">
              <option selected value="아이디">아이디</option>
              <option value="이름">이름</option>
            </select>
          </div>
          <input class="input-text input-with-date" type="text">
        </v-flex>
      </v-layout>
    </div> -->
    <!-- table wrap -->
    <v-app class="inspire">
      <v-card-title>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6 md5>
          <span class="span-without-selectbox">기간조회</span>
          <date-picker v-model="date_start" :lang="lang"></date-picker>
        </v-flex>
        <v-flex d-flex xs12 sm6 md5>
          <date-picker v-model="date_finish" :lang="lang"></date-picker>
        </v-flex>
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
            <td class="text-xs-left">{{ total - props.index - total_index }}</td>
            <td class="text-xs-left">{{ props.item.customer }}</td>
            <td class="text-xs-left">{{ props.item.customer_code }}</td>
            <td class="text-xs-left">{{ props.item.address }}</td>
            <td class="text-xs-left">{{ props.item.exponent }}</td>
            <td class="text-xs-left">{{ props.item.call_number }}</td>
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
            <option value="-1">All</option>
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
      date_start: "",
      date_finish: "",
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
      selected: [],
      headers: [
        {
          text: "로그인 일시",
          align: "left",
          value: "로그인 일시",
          sortable: false
        },
        { text: "구분", align: "left", value: "구분", sortable: false },
        { text: "아이디", align: "left", value: "아이디", sortable: false },
        { text: "이름", align: "left", value: "이름", sortable: false },
        {
          text: "작업내용",
          align: "left",
          value: "작업내용",
          sortable: false
        },
        { text: "접속 IP", align: "left", value: "접속 IP", sortable: false }
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
  updated() {
    this.getTotal();
  },
  mounted() {
    this.getDatas();
  },
  methods: {
    getDatas() {
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      let yyyy = today.getFullYear();

      if (dd < 10) {
        dd = "0" + dd;
      }

      if (mm < 10) {
        mm = "0" + mm;
      }
      today = yyyy + "-" + mm + "-" + dd;

      this.date_start = today;
      this.date_finish = today;
      // this.queryDateToday = today;

      this.$store
        .dispatch(Constant.FETCH_ACCOUNT_LOG, {
          start: "2018-07-01",
          end: "2018-07-15"
        })
        .then(resp => {
          this.logs = resp.data.logs;
          console.log("this.logs :", this.logs);
          this.total = this.logs.length;
        });
    },
    getTotal() {
      let update_total = this.$children[0].$children[1].searchLength;
      this.total = update_total;

      let page = document.getElementsByClassName("v-select__selection");
      let pageActive = document.getElementsByClassName(
        "v-pagination__item--active"
      );
      let pageText = page[0].innerText;
      let pageActiveText = pageActive[0].innerText;
      let pageNum = pageActiveText - 1;
      let calPage = pageNum * pageText;
      this.total_index = calPage;
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
