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
        :items="desserts"
        :search="search"
        :pagination.sync="pagination"
        v-model="selected"
        item-key="number"
        select-all
        hide-actions
        class="elevation-1"
      >
        <template slot="headerCell" slot-scope="props">
          <span class="item-headers" slot="activator">
            {{ props.header.text }}
          </span>
        </template>
        <template slot="items" slot-scope="props">
          <td>
            <v-checkbox
              v-model="props.selected"
              primary
              hide-details
            ></v-checkbox>
          </td>
          <td class="text-xs-center">{{ props.item.number }}</td>
          <td class="text-xs-center">{{ props.item.customer }}</td>
          <td class="text-xs-center">{{ props.item.customer_code }}</td>
          <td class="text-xs-center">{{ props.item.address }}</td>
          <td class="text-xs-center">{{ props.item.exponent }}</td>
          <td class="text-xs-center">{{ props.item.call_number }}</td>
          <td class="text-xs-center">{{ props.item.date }}</td>
          <td class="text-xs-center">{{ props.item.change_date }}</td>
          <td class="text-xs-center">{{ props.item.changer }}</td>
        </template>
      </v-data-table>
      <span class="bottom-total">전체건수 : <span class="bottom-total-result">{{desserts.length}}</span> 건</span>
      <div class="bottom-contents-wrap">
        <v-layout row wrap btn-group>
          <v-flex d-flex xs12 sm12 md1 offset-md11>
            <v-btn color="error" dark>삭제</v-btn>
          </v-flex>
        </v-layout>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
        </div>
      </div>
    </v-app>
  </div>
</template>

<script>
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
        { text: "푸시토큰", align: "center", value: "푸시토큰", sortable: false },
        { text: "등록일", align: "center", value: "등록일", sortable: false },
        { text: "상태", align: "center", value: "상태", sortable: false },
        { text: "변경일", align: "center", value: "변경일", sortable: false },
        { text: "변경자", align: "center", value: "변경자", sortable: false }
      ],
      desserts: [
        {
          value: false,
          number: "1",
          customer: 159,
          customer_code: 6.0,
          address: 24,
          exponent: 4.0,
          call_number: "1%",
          date: "1%",
          change_date: "2018.08.01",
          changer: 'icraft'
        },
        {
          value: false,
          number: "2",
          customer: 237,
          customer_code: 9.0,
          address: 37,
          exponent: 4.3,
          call_number: "1%",
          date: "1%",
          change_date: "2018.08.01",
          changer: 'icraft'
        },
        {
          value: false,
          number: "3",
          customer: 262,
          customer_code: 16.0,
          address: 23,
          exponent: 6.0,
          call_number: "7%",
          date: "7%",
          change_date: "2018.08.01",
          changer: 'icraft'
        },
        {
          value: false,
          number: "4",
          customer: 305,
          customer_code: 3.7,
          address: 67,
          exponent: 4.3,
          call_number: "8%",
          date: "8%",
          change_date: "2018.08.01",
          changer: 'icraft'
        },
        {
          value: false,
          number: "5",
          customer: 356,
          customer_code: 16.0,
          address: 49,
          exponent: 3.9,
          call_number: "16%",
          date: "16%",
          change_date: "2018.08.01",
          changer: 'icraft'
        },
        {
          value: false,
          number: "6",
          customer: 375,
          customer_code: 0.0,
          address: 94,
          exponent: 0.0,
          call_number: "0%",
          date: "0%",
          change_date: "2018.08.01",
          changer: 'icraft'
        },
        {
          value: false,
          number: "7",
          customer: 392,
          customer_code: 0.2,
          address: 98,
          exponent: 0,
          call_number: "2%",
          date: "2%",
          change_date: "2018.08.01",
          changer: 'icraft'
        },
        {
          value: false,
          number: "8",
          customer: 408,
          customer_code: 3.2,
          address: 87,
          exponent: 6.5,
          call_number: "45%",
          date: "45%",
          change_date: "2018.08.01",
          changer: 'icraft'
        },
        {
          value: false,
          number: "9",
          customer: 452,
          customer_code: 25.0,
          address: 51,
          exponent: 4.9,
          call_number: "22%",
          date: "22%",
          change_date: "2018.08.01",
          changer: 'icraft'
        },
        {
          value: false,
          number: "10",
          customer: 518,
          customer_code: 26.0,
          address: 65,
          exponent: 7,
          call_number: "6%",
          date: "6%",
          change_date: "2018.08.01",
          changer: 'icraft'
        },
        {
          value: false,
          number: "11",
          customer: 159,
          customer_code: 6.0,
          address: 24,
          exponent: 4.0,
          call_number: "1%",
          date: "1%",
          change_date: "2018.08.01",
          changer: 'icraft'
        },
        {
          value: false,
          number: "12",
          customer: 237,
          customer_code: 9.0,
          address: 37,
          exponent: 4.3,
          call_number: "1%",
          date: "1%",
          change_date: "2018.08.01",
          changer: 'icraft'
        },
        {
          value: false,
          number: "13",
          customer: 262,
          customer_code: 16.0,
          address: 23,
          exponent: 6.0,
          call_number: "7%",
          date: "7%",
          change_date: "2018.08.01",
          changer: 'icraft'
        },
        {
          value: false,
          number: "14",
          customer: 305,
          customer_code: 3.7,
          address: 67,
          exponent: 4.3,
          call_number: "8%",
          date: "8%",
          change_date: "2018.08.01",
          changer: 'icraft'
        },
        {
          value: false,
          number: "15",
          customer: 356,
          customer_code: 16.0,
          address: 49,
          exponent: 3.9,
          call_number: "16%",
          date: "16%",
          change_date: "2018.08.01",
          changer: 'icraft'
        },
        {
          value: false,
          number: "16",
          customer: 375,
          customer_code: 0.0,
          address: 94,
          exponent: 0.0,
          call_number: "0%",
          date: "0%",
          change_date: "2018.08.01",
          changer: 'icraft'
        },
        {
          value: false,
          number: "17",
          customer: 392,
          customer_code: 0.2,
          address: 98,
          exponent: 0,
          call_number: "2%",
          date: "2%",
          change_date: "2018.08.01",
          changer: 'icraft'
        },
        {
          value: false,
          number: "18",
          customer: 408,
          customer_code: 3.2,
          address: 87,
          exponent: 6.5,
          call_number: "45%",
          date: "45%",
          change_date: "2018.08.01",
          changer: 'icraft'
        },
        {
          value: false,
          number: "19",
          customer: 452,
          customer_code: 25.0,
          address: 51,
          exponent: 4.9,
          call_number: "22%",
          date: "22%",
          change_date: "2018.08.01",
          changer: 'icraft'
        },
        {
          value: false,
          number: "20",
          customer: 518,
          customer_code: 26.0,
          address: 65,
          exponent: 7,
          call_number: "6%",
          date: "6%",
          change_date: "2018.08.01",
          changer: 'icraft'
        },
      ]
    };
  },
  computed: {
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;

      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/table";
@import "../../scss/modal";
</style>
