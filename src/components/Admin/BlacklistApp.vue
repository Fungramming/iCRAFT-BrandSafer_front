<template>
  <div class="tableBs">
    <!-- table top menu -->
    <div class="tableBs-top">
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
          <span slot="activator" class="item-headers">
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
          <td class="text-xs-left">{{ props.item.number }}</td>
          <td class="text-xs-left">{{ props.item.customer }}</td>
          <td class="text-xs-left">{{ props.item.customer_code }}</td>
          <td class="text-xs-left"><a>{{ props.item.push_token }}</a></td>
          <td class="text-xs-left">{{ props.item.exponent }}</td>
          <td class="text-xs-left">{{ props.item.call_number }}</td>
          <td class="text-xs-left">{{ props.item.date }}</td>
          <td class="text-xs-left">{{ props.item.changer }}</td>
        </template>
      </v-data-table>
      <span class="bottom-total">전체건수 : <span class="bottom-total-result">{{desserts.length}}</span> 건</span>
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
      desserts: [
        {
          value: false,
          number: "1",
          customer: 159,
          customer_code: 6.0,
          push_token: "e5db3e3784bcaec2AQCA199999LG-F600L",
          exponent: 4.0,
          call_number: "1%",
          date: "1%",
          changer: "person"
        },
        {
          value: false,
          number: "2",
          customer: 237,
          customer_code: 9.0,
          push_token: "e5db3e3784bcaec2AQCA199999LG-F600L",
          exponent: 4.3,
          call_number: "1%",
          date: "1%",
          changer: "person"
        },
        {
          value: false,
          number: "3",
          customer: 262,
          customer_code: 16.0,
          push_token: "e5db3e3784bcaec2AQCA199999LG-F600L",
          exponent: 6.0,
          call_number: "7%",
          date: "7%",
          changer: "person"
        },
        {
          value: false,
          number: "4",
          customer: 305,
          customer_code: 3.7,
          push_token: "e5db3e3784bcaec2AQCA199999LG-F600L",
          exponent: 4.3,
          call_number: "8%",
          date: "8%",
          changer: "person"
        },
        {
          value: false,
          number: "5",
          customer: 356,
          customer_code: 16.0,
          push_token: "e5db3e3784bcaec2AQCA199999LG-F600L",
          exponent: 3.9,
          call_number: "16%",
          date: "16%",
          changer: "person"
        },
        {
          value: false,
          number: "6",
          customer: 375,
          customer_code: 0.0,
          push_token: "e5db3e3784bcaec2AQCA199999LG-F600L",
          exponent: 0.0,
          call_number: "0%",
          date: "0%",
          changer: "person"
        },
        {
          value: false,
          number: "7",
          customer: 392,
          customer_code: 0.2,
          push_token: "e5db3e3784bcaec2AQCA199999LG-F600L",
          exponent: 0,
          call_number: "2%",
          date: "2%",
          changer: "person"
        },
        {
          value: false,
          number: "8",
          customer: 408,
          customer_code: 3.2,
          push_token: "e5db3e3784bcaec2AQCA199999LG-F600L",
          exponent: 6.5,
          call_number: "45%",
          date: "45%",
          changer: "person"
        },
        {
          value: false,
          number: "9",
          customer: 452,
          customer_code: 25.0,
          push_token: "e5db3e3784bcaec2AQCA199999LG-F600L",
          exponent: 4.9,
          call_number: "22%",
          date: "22%",
          changer: "person"
        },
        {
          value: false,
          number: "10",
          customer: 518,
          customer_code: 26.0,
          push_token: "e5db3e3784bcaec2AQCA199999LG-F600L",
          exponent: 7,
          call_number: "6%",
          date: "6%",
          changer: "person"
        },
        {
          value: false,
          number: "11",
          customer: 159,
          customer_code: 6.0,
          push_token: "e5db3e3784bcaec2AQCA199999LG-F600L",
          exponent: 4.0,
          call_number: "1%",
          date: "1%",
          changer: "person"
        },
        {
          value: false,
          number: "12",
          customer: 237,
          customer_code: 9.0,
          push_token: "e5db3e3784bcaec2AQCA199999LG-F600L",
          exponent: 4.3,
          call_number: "1%",
          date: "1%",
          changer: "person"
        },
        {
          value: false,
          number: "13",
          customer: 262,
          customer_code: 16.0,
          push_token: "e5db3e3784bcaec2AQCA199999LG-F600L",
          exponent: 6.0,
          call_number: "7%",
          date: "7%",
          changer: "person"
        },
        {
          value: false,
          number: "14",
          customer: 305,
          customer_code: 3.7,
          push_token: "e5db3e3784bcaec2AQCA199999LG-F600L",
          exponent: 4.3,
          call_number: "8%",
          date: "8%",
          changer: "person"
        },
        {
          value: false,
          number: "15",
          customer: 356,
          customer_code: 16.0,
          push_token: "e5db3e3784bcaec2AQCA199999LG-F600L",
          exponent: 3.9,
          call_number: "16%",
          date: "16%",
          changer: "person"
        },
        {
          value: false,
          number: "16",
          customer: 375,
          customer_code: 0.0,
          push_token: "e5db3e3784bcaec2AQCA199999LG-F600L",
          exponent: 0.0,
          call_number: "0%",
          date: "0%",
          changer: "person"
        },
        {
          value: false,
          number: "17",
          customer: 392,
          customer_code: 0.2,
          push_token: "e5db3e3784bcaec2AQCA199999LG-F600L",
          exponent: 0,
          call_number: "2%",
          date: "2%",
          changer: "person"
        },
        {
          value: false,
          number: "18",
          customer: 408,
          customer_code: 3.2,
          push_token: "e5db3e3784bcaec2AQCA199999LG-F600L",
          exponent: 6.5,
          call_number: "45%",
          date: "45%",
          changer: "person"
        },
        {
          value: false,
          number: "19",
          customer: 452,
          customer_code: 25.0,
          push_token: "e5db3e3784bcaec2AQCA199999LG-F600L",
          exponent: 4.9,
          call_number: "22%",
          date: "22%",
          changer: "person"
        },
        {
          value: false,
          number: "20",
          customer: 518,
          customer_code: 26.0,
          push_token: "e5db3e3784bcaec2AQCA199999LG-F600L",
          exponent: 7,
          call_number: "6%",
          date: "6%",
          changer: "person"
        }
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
