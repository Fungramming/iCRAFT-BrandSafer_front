<template>
  <div class="tableBs">
    <!-- table top menu -->
    <!-- <div class="tableBs-top">
      <p>검색 조건</p>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm12 md4>
          <div class="selectbox">
            <span>제품 타입</span>
            <select id="select1" name="searchType" class="form-control" size="1">
              <option selected value="전체">전체</option>
              <option value="홀로태그">홀로태그</option>
              <option value="하이브리드태그">하이브리드태그</option>
              <option value="하이브리드태그">하이브리드태그</option>
              <option value="난수태그">난수태그</option>
              <option value="SQR태그">SQR태그</option>
            </select>
          </div>
        </v-flex>
        <v-flex d-flex xs12 sm12 md4>
          <div class="selectbox">
            <span>유형</span>
            <select id="select2" name="searchType" class="form-control" size="1">
              <option selected value="전체">전체</option>
              <option value="가품제조">가품제조</option>
              <option value="과다인증">과다인증</option>
            </select>
          </div>
        </v-flex>
        <v-flex d-flex xs12 sm12 md4>
          <div class="selectbox select-search">
            <span>검색어</span>
            <select id="select3" name="searchType" class="form-control" size="1">
              <option selected value="푸시토큰">푸시토큰</option>
              <option value="과다인증번호">과다인증번호</option>
            </select>
          </div>
          <input class="input-text" type="text">
        </v-flex>
      </v-layout>
    </div> -->
    <!-- table wrap -->
    <v-app class="inspire">
      <v-card-title>
        검색조건
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="검색어"
        single-line
        hide-details
      ></v-text-field>
      </v-card-title>


      <v-data-table
        :headers="headers"
        :items="blacklists"
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
            <td class="text-xs-left">{{ props.item.blType }}</td>
            <td class="text-xs-left">{{ props.item.delYN }}</td>
            <td class="text-xs-left">{{ props.item.dtModified }}</td>
            <td class="text-xs-left"><a>{{ props.item.dtRegistered }}</a></td>
            <td class="text-xs-left">{{ props.item.idx }}</td>
            <td class="text-xs-left">{{ props.item.modifier }}</td>
            <td class="text-xs-left">{{ props.item.pushToken }}</td>
            <td class="text-xs-left">{{ props.item.registrant }}</td>
          </tr>
        </template>
      </v-data-table>
      <span class="bottom-total">전체건수 : <span class="bottom-total-result">{{total}}</span> 건</span>
      <div class="bottom-contents-wrap">
        <v-layout row wrap btn-group>
          <v-flex d-flex xs12 sm12 md1 offset-md10>
            <v-btn color="error" dark>삭제</v-btn>
          </v-flex>
          <v-flex d-flex xs12 sm12 md1>
            <v-btn color="primary" dark @click.stop="dialog = true">등록</v-btn>
          </v-flex>
        </v-layout>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
        </div>
      </div>
    </v-app>

    <v-flex d-flex xs12 sm12 md12>
    <!-- modal dialog -->
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <!-- start modal -->
      <v-card tile>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>블랙리스트 App</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="dialog = false">저장</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="card-left">
          <v-card-text>
            <v-list three-line subheader>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">푸시토큰</label>
                <input class="input-text" type="text" required="required">
              </v-flex>
            </v-list>
          </v-card-text>
        </div>
      </v-card>
    </v-dialog>
    </v-flex>
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
      total: "",
      selected: [],
      headers: [
        { text: "번호", align: "left", value: "번호", sortable: false },
        { text: "App명", align: "left", value: "App명", sortable: false },
        {
          text: "제품 타입",
          align: "left",
          value: "제품 타입",
          sortable: false
        },
        { text: "푸시토큰", align: "left", value: "푸시토큰", sortable: false },
        { text: "유형", align: "left", value: "유형", sortable: false },
        { text: "등록일", align: "left", value: "등록일", sortable: false },
        { text: "변경일", align: "left", value: "변경일", sortable: false },
        { text: "변경자", align: "left", value: "변경자", sortable: false }
      ],
      blacklists: []
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
  mounted() {
    this.$store.dispatch(Constant.FETCH_BLACKLIST).then(resp => {
      this.blacklists = resp.data.blacklists;
      console.log("blacklists :", this.blacklists);
      this.total = this.blacklists.legnth;
    });
  },
  methods: {
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.distributors.slice();
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
