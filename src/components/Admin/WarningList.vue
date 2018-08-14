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
        :items="oversert"
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
            <td class="text-xs-left">{{ props.item.dtTermAgreement }}</td>
            <td class="text-xs-left">{{ props.item.appCode }}</td>
            <td class="text-xs-left">{{ props.item.appTagType }}</td>
            <td class="text-xs-left"><a>{{ props.item.pushToken }}</a></td>
            <td class="text-xs-left">{{ props.item.times }}</td>
            <td class="text-xs-left">{{ props.item.dtTermAgreement }}</td>
            <td class="text-xs-left">{{ props.item.dtLastConnected }}</td>
            <td class="text-xs-left">{{ props.item.dtRegistered }}</td>
            <td class="text-xs-left">{{ props.item.os }}</td>
            <td class="text-xs-left">{{ props.item.model }}</td>
            <td class="text-xs-left">{{ props.item.languageCode }}</td>
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
import { getTotal } from "../CompHelper.js";

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
        {
          text: "언어셋",
          align: "left",
          value: "languageCode",
          sortable: false
        }
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
    this.dateStart = this.$children[0].$children[0].text;
    this.dateFinish = this.$children[0].$children[1].text;
  },
  mounted() {
    this.getDatas();
  },
  methods: {
    getTotal() {
      this.total = this.$children[0].$children[3].searchLength;
    },
    dateSet() {
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

      this.dateStart = today;
      this.dateFinish = today;
    },
    dateFormat() {
      let oversert = this.oversert;
      for (let item in oversert) {
        let date = new Date(oversert[item].dtTermAgreement);
        let formatDate = date.toLocaleDateString();
        oversert[item].dtTermAgreement = formatDate;
      }
    },
    getDateData() {
      this.$store
        .dispatch(Constant.FETCH_ACCOUNT_LOG, {
          start: this.dateStart,
          end: this.dateFinish
        })
        .then(resp => {
          this.oversert = resp.data.certs.reverse();
          this.total = this.oversert.length;
          this.dateFormat();
        });
    },
    getDatas() {
      this.dateSet();
      this.$store
        .dispatch(Constant.FETCH_OVER_CERT, {
          start: this.dateStart,
          end: this.dateFinish
        })
        .then(resp => {
          this.oversert = resp.data.certs.reverse();
          console.log("oversert.length :", this.oversert.length);
          this.total = this.oversert.length;
          this.dateFormat();
        });
    },
    deleteDatas() {
      for (let item in this.selected) {
        this.$store
          .dispatch(Constant.DELETE_TAG_TYPE, this.selected[item].idx)
          .then(() => {
            this.getDatas();
          });
      }
      this.$store.commit(Constant.SHOW_MODAL, {
        isModal: true,
        modalText: "삭제 되었습니다."
      });
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.oversert.slice();
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
