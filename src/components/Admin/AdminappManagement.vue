<template>
  <div class="tableBs">
    <!-- table top menu -->
    <div class="tableBs-top">
      <p>검색 조건</p>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm12 md1>
          <div class="selectbox select-search">
            <span>검색어</span>
            <select id="select1" name="searchType" class="form-control" size="1">
              <option selected value="고객사">회사명</option>
              <option value="이름">이름</option>
              <option value="연락처">연락처</option>
              <option value="푸시토큰">푸시토큰</option>
            </select>
          </div>
        </v-flex>
        <v-flex d-flex xs12 sm12 md3>
          <input class="input-text" type="text">
        </v-flex>
      </v-layout>
      <!-- <v-flex d-flex xs12 sm12 md1 offset-md11>
        <v-btn class="search-btn" color="primary" dark>검색</v-btn>
      </v-flex> -->
    </div>
    <!-- table wrap -->
    <v-app class="inspire">
      <v-data-table
        :headers="headers"
        :items="apps"
        :search="search"
        :pagination.sync="pagination"
        v-model="selected"
        item-key="number"
        select-all
        hide-actions
        class="elevation-1"
      >
        <template slot="headerCell" slot-scope="props">
          <span slot="activator" class="item-headers">
            {{ props.header.text }}
          </span>
        </template>
        <template slot="items" slot-scope="props">
          <td @click="getSelected">
            <v-checkbox primary
              hide-details
              
            ></v-checkbox>
          </td>
          <td class="text-xs-center">{{ props.item.idx }}</td>
          <td class="text-xs-center">{{ props.item.companyName }}</td>
          <td class="text-xs-center">{{ props.item.name }}</td>
          <td class="text-xs-center">{{ props.item.contact }}</td>
          <td class="text-xs-center">{{ props.item.pushToken }}</td>
          <td class="text-xs-center">{{ props.item.dtRegistered }}</td>
          <td class="text-xs-center">{{ props.item.state }}</td>
          <td class="text-xs-center">{{ props.item.dtModified }}</td>
          <td class="text-xs-center">{{ props.item.modifier }}</td>
        </template>
      </v-data-table>
      <span class="bottom-total">전체건수 : <span class="bottom-total-result">{{apps.length}}</span> 건</span>
      <div class="bottom-contents-wrap">
        <v-layout row wrap btn-group>
          <v-flex d-flex xs12 sm12 md1 offset-md11>
            <v-btn color="error" dark>삭제</v-btn>
          </v-flex>
        </v-layout>
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
      selected: [],
      headers: [
        { text: "번호", align: "center", value: "번호", sortable: false },
        { text: "회사명", align: "center", value: "회사명", sortable: false },
        { text: "이름", align: "center", value: "이름", sortable: false },
        { text: "연락처", align: "center", value: "연락처", sortable: false },
        {
          text: "푸시토큰",
          align: "center",
          value: "푸시토큰",
          sortable: false
        },
        { text: "등록일", align: "center", value: "등록일", sortable: false },
        { text: "상태", align: "center", value: "상태", sortable: false },
        { text: "변경일", align: "center", value: "변경일", sortable: false },
        { text: "변경자", align: "center", value: "변경자", sortable: false }
      ],
      apps: []
    };
  },
  computed: {
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;
      return Math.ceil(this.apps.length / this.pagination.rowsPerPage);
    }
  },
  mounted() {
    this.$store.dispatch(Constant.FETCH_ADMIN_APP).then(resp => {
      this.apps = resp.data.apps;
    });
  },
  methods: {
    getSelected: function(e) {
      getSelectedFunc(e);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/table";
@import "../../scss/modal";
</style>
