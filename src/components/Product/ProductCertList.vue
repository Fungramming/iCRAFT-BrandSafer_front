<template>
  <div class="tableBs">
    <!-- table top menu -->
    <div class="tableBs-top">
      <p>검색 조건</p>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6 lg4>
          <v-calendar>캘린더가 들어갈 자리입니다^^</v-calendar>
        </v-flex>
        <v-flex d-flex xs12 sm6 lg4>
          <div class="selectbox">
            <span>고객사</span>
            <select id="select1" name="searchType" class="form-control" size="1">
              <option value="전체" selected>전체</option>
              <option value="고객사1">고객사1</option>
              <option value="고객사2">고객사2</option>
              <option value="고객사3">고객사3</option>
            </select>
          </div>
        </v-flex>
        <v-flex d-flex xs12 sm6 lg4>
          <div class="selectbox">
            <span>태그타입</span>
            <select id="select1" name="searchType" class="form-control" size="1">
              <option value="전체" selected>전체</option>
              <option value="태그타입1">태그타입1</option>
              <option value="태그타입2">태그타입2</option>
              <option value="태그타입3">태그타입3</option>
            </select>
          </div>
        </v-flex>
        <v-flex d-flex xs12 sm6 lg4>
          <div class="selectbox">
            <span>OS</span>
            <select id="select1" name="searchType" class="form-control" size="1">
              <option value="전체" selected>전체</option>
              <option value="OS1">OS1</option>
              <option value="OS2">OS2</option>
              <option value="OS3">OS3</option>
            </select>
          </div>
        </v-flex>
        <v-flex d-flex xs12 sm6 lg4>
          <div class="selectbox">
            <span>인증결과</span>
            <select id="select1" name="searchType" class="form-control" size="1">
              <option value="전체" selected>전체</option>
              <option value="인증결과1">인증결과1</option>
              <option value="인증결과2">인증결과2</option>
              <option value="인증결과3">인증결과3</option>
            </select>
          </div>
        </v-flex>
        <v-flex d-flex xs12 sm6 lg4>
          <div class="selectbox select-search">
            <span>검색어</span>
            <select id="select1" name="searchType" class="form-control" size="1">
              <option value="전체" selected>전체</option>
              <option value="검색어1">검색어1</option>
              <option value="검색어2">검색어2</option>
              <option value="검색어3">검색어3</option>
            </select>
          </div>
          <input class="input-text" type="text">
        </v-flex>
        <!-- <v-flex d-flex xs12 sm12 md3>
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
        <v-flex d-flex xs12 sm12 md3>
          <div class="selectbox">
            <span>유형</span>
            <select id="select1" name="searchType" class="form-control" size="1">
              <option selected value="전체">전체</option>
              <option value="가품제조">가품제조</option>
              <option value="과다인증">과다인증</option>
            </select>
          </div>
        </v-flex>
        <v-flex d-flex xs12 sm12 md3>
          <div class="selectbox select-search">
            <span>검색어</span>
            <select id="select1" name="searchType" class="form-control" size="1">
              <option selected value="푸시토큰">푸시토큰</option>
              <option value="과다인증번호">과다인증번호</option>
            </select>
          </div>
          <input class="input-text" type="text">
        </v-flex> -->
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
        item-key="number"
        hide-actions
        class="elevation-1"
      >
        <template slot="headerCell" slot-scope="props">
          <span slot="activator" class="item-headers">
            {{ props.header.text }}
          </span>
        </template>
        <template slot="items" slot-scope="props">
          <td class="text-xs-center">{{ props.item.number }}</td>
          <td class="text-xs-center">{{ props.item.customer }}</td>
          <td class="text-xs-center">{{ props.item.tag_type }}</td>
          <td class="text-xs-center">{{ props.item.image }}</td>
          <td class="text-xs-center">{{ props.item.product }}</td>
          <td class="text-xs-center">{{ props.item.OS }}</td>
          <td class="text-xs-center">{{ props.item.cert_count }}</td>
          <td class="text-xs-center">{{ props.item.distributor }}</td>
          <td class="text-xs-center">{{ props.item.time }}</td>
          <td class="text-xs-center">{{ props.item.cert_result }}</td>
          <td class="text-xs-center">{{ props.item.location }}</td>
        </template>
      </v-data-table>
      <span class="bottom-total">전체건수 : <span class="bottom-total-result">{{desserts.length}}</span> 건</span>
      <div class="bottom-contents-wrap">
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
  <!-- <section class="search">
    <h3>검색조건</h3>
    <v-layout row wrap align-center>
      <v-flex sm12 lg4 xl2>
        <select name="기간선택" id="">
          <option disabled="disabled" selected>기간선택</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </v-flex>
      <v-flex sm12 lg4 xl2>
        <v-select solo items="[1, 2, 3]" label="고객사"></v-select>
      </v-flex>
      <v-flex sm12 lg4 xl2>
        <v-select solo items="[1, 2, 3]" label="태그타입"></v-select>
      </v-flex>
      <v-flex sm12 lg4 xl2>
        <v-select solo items="[1, 2, 3]" label="OS"></v-select>
      </v-flex>
      <v-flex sm12 lg4 xl2>
        <v-select solo items="[1, 2, 3]" label="인증결과"></v-select>
      </v-flex>
      <v-flex sm12 lg4 xl2>
        <v-select solo items="[1, 2, 3]" label="검색어"></v-select>
      </v-flex>
    </v-layout>
    <v-btn>검색</v-btn>
  </section> -->
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
      headers: [
        { text: "번호", align: "center", value: "number", sortable: false },
        { text: "고객사", align: "center", value: "customer", sortable: false },
        {
          text: "태그타입",
          align: "center",
          value: "tag_type",
          sortable: false
        },
        { text: "이미지", align: "center", value: "image", sortable: false },
        { text: "제품명", align: "center", value: "product", sortable: false },
        { text: "OS", align: "center", value: "OS", sortable: false },
        {
          text: "인증수",
          align: "center",
          value: "cert_count",
          sortable: false
        },
        {
          text: "유통업체",
          align: "center",
          value: "distributor",
          sortable: false
        },
        { text: "시간", align: "center", value: "time", sortable: false },
        {
          text: "인증결과",
          align: "center",
          value: "cert_result",
          sortable: false
        },
        {
          text: "위치보기",
          align: "center",
          value: "location",
          sortable: false
        }
      ],
      desserts: [
        {
          number: 5903,
          customer: "파파레시피",
          tag_type: "SQR태그",
          image: "img",
          product: "봄비 마스크팩",
          OS: "안드로이드",
          cert_count: "1",
          distributor: "파파레시피 본사",
          time: "2018-07-31 17:19:31",
          cert_result: "(100)",
          location: "위치보기"
        },
        {
          number: 5903,
          customer: "파파레시피",
          tag_type: "SQR태그",
          image: "img",
          product: "봄비 마스크팩",
          OS: "안드로이드",
          cert_count: "1",
          distributor: "파파레시피 본사",
          time: "2018-07-31 17:19:31",
          cert_result: "(100)",
          location: "위치보기"
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
