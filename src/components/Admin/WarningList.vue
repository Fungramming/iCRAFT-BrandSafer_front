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
            <span>제품 타입</span>
            <select id="select1" name="searchType" class="form-control" size="1">
              <option selected value="전체">전체</option>
              <option value="홀로태그">홀로태그</option>
              <option value="하이브리드태그">하이브리드태그</option>
              <option value="난수태그">난수태그</option>
              <option value="SQR태그">SQR태그</option>
            </select>
          </div>
        </v-flex>
        <v-flex d-flex xs12 sm12 md4>
          <div class="selectbox-input">
            <span>푸시토큰</span>
            <input class="input-text input-with-date" type="text">
          </div>
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
        :items="oversert"
        :search="search"
        :pagination.sync="pagination"
        v-model="selected"
        item-key="app_name"
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
            <td class="text-xs-left">{{ props.item.dtTermAgreement }}</td>
            <td class="text-xs-left">{{ props.item.app_name }}</td>
            <td class="text-xs-left">{{ props.item.appTagType }}</td>
            <td class="text-xs-left"><a>{{ props.item.pushToken }}</a></td>
            <td class="text-xs-left">{{ props.item.times }}</td>
            <td class="text-xs-left">{{ props.item.dtTermAgreement }}</td>
            <td class="text-xs-left">{{ props.item.dtLastConnected }}</td>
            <td class="text-xs-left">{{ props.item.dtRegistered }}</td>
            <td class="text-xs-left">{{ props.item.os }}</td>
            <td class="text-xs-left">{{ props.item.model }}</td>
            <td class="text-xs-left">{{ props.item.language }}</td>
          </tr>
        </template>
      </v-data-table>


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
import { getSelectedFunc } from "../CompHelper.js";

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
      total_index: "",
      selected: [],
      headers: [
        { text: "번호", align: "left", value: "idx", sortable: false },
        {
          text: "관제일자",
          align: "left",
          value: "dtTermAgreement",
          sortable: false
        },
        { text: "App명", align: "left", value: "app_name", sortable: false },
        {
          text: "태그타입",
          align: "left",
          value: "appTagType",
          sortable: false
        },
        {
          text: "푸시토큰",
          align: "left",
          value: "pushToken",
          sortable: false
        },
        {
          text: "인증횟수",
          align: "left",
          value: "인증횟수",
          sortable: false
        },
        {
          text: "관제갱신일시",
          align: "left",
          value: "dtTermAgreement",
          sortable: false
        },
        // { text: "블랙리스트유형", align: "left", value: "블랙리스트유형", sortable: false },
        {
          text: "마지막 인증일시",
          align: "left",
          value: "dtLastConnected",
          sortable: false
        },
        {
          text: "App등록",
          align: "left",
          value: "dtRegistered",
          sortable: false
        },
        { text: "OS", align: "left", value: "os", sortable: false },
        { text: "모델명	", align: "left", value: "model	", sortable: false },
        { text: "언어셋", align: "left", value: "language", sortable: false }
      ],
      oversert: [],
      page: "",
      queryDateToday: ""
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
        .dispatch(Constant.FETCH_OVER_CERT, {
          start: "2015-05-05",
          end: "2015-05-31"
        })
        .then(resp => {
          this.oversert = resp.data.certs.reverse();
          console.log("oversert.length :", this.oversert.length);
          this.total = this.oversert.length;
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
      else this.selected = this.oversert.slice();
    },
    getSelected: function(e) {
      getSelectedFunc(e);
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
