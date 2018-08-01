<template>
  <div class="tableBs">
    <!-- table top menu -->
    <div class="tableBs-top">
      <p>검색 조건</p>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm12 md3>
          <div class="selectbox">
            <span>고객사</span> 
            <select id="select1" name="searchType" class="form-control" size="1">
              <option selected value="고객사 전체">고객사 전체</option>
              <option value="블랙야크">블랙야크</option>
              <option value="CJ E&M">CJ E&M</option>
              <option value="브랜드세이퍼">브랜드세이퍼</option>
              <option value="LF">LF</option>
              <option value="아모레퍼시픽">아모레퍼시픽</option>
              <option value="카버코리아">카버코리아</option>
              <option value="엘앤피코스메틱">엘앤피코스메틱</option>
              <option value="파파레서피">파파레서피</option>
              <option value="젬나컴퍼니">젬나컴퍼니</option>
              <option value="(주)차바이오에프앤씨">(주)차바이오에프앤씨</option>
              <option value="AUDIO BANK">AUDIO BANK</option>
              <option value="제이준메딕스㈜">제이준메딕스㈜</option>
              <option value="아이시드">아이시드</option>
              <option value="난수발권테스트">난수발권테스트</option>
              <option value="TWOTSP">TWOTSP</option>
              <option value="엘앤피코스메틱㈜">엘앤피코스메틱㈜</option>
              <option value="(주)노드메이슨">(주)노드메이슨</option>
              <option value="제이준코스메틱㈜">제이준코스메틱㈜</option>
              <option value="BrandSafer">BrandSafer</option>
              <option value="문경오미자">문경오미자</option>
              <option value="문경 테스트">문경 테스트</option>
              <option value="오감 바이오">오감 바이오</option>
            </select>
          </div>
        </v-flex>
        <v-flex d-flex xs12 sm12 md3>
          <div class="selectbox">
            <span>구분</span>
            <select id="select2" name="searchType" class="form-control" size="1">
              <option selected value="전체">전체</option>
              <option value="관리자">관리자</option>
              <option value="운영자">운영자</option>
            </select>
          </div>
        </v-flex>
        <v-flex d-flex xs12 sm12 md3>
          <div class="selectbox">
            <span>상태</span>
            <select id="select3" name="searchType" class="form-control" size="1">
              <option selected value="전체">전체</option>
              <option value="등록">등록</option>
              <option value="일시정지">일시정지</option>
            </select>
          </div>
        </v-flex>
        <v-flex d-flex xs12 sm12 md3>
          <div class="selectbox select-search">
            <span>검색어</span>
            <select id="select4" name="searchType" class="form-control" size="1">
              <option selected value="부서">부서</option>
              <option value="아이디">아이디</option>
              <option value="이름">이름</option>
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
          <td class="text-xs-center">{{ props.item.number }}</td>
          <td class="text-xs-center">{{ props.item.customer }}</td>
          <td class="text-xs-center">{{ props.item.customer_code }}</td>
          <td class="text-xs-center">{{ props.item.address }}</td>
          <td class="text-xs-center">{{ props.item.exponent }}</td>
          <td class="text-xs-center">{{ props.item.call_number }}</td>
          <td class="text-xs-center">{{ props.item.date }}</td>
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
      pagination: {
        page: 1,
        rowsPerPage: 10
      },
      selected: [],
      headers: [
        { text: '번호', align: 'center', value: '번호', sortable: false, },
        { text: '고객사', align: 'center', value: '고객사', sortable: false, },
        { text: '구분', align: 'center', value: '구분', sortable: false, },
        { text: '이름', align: 'center', value: '이름', sortable: false, },
        { text: '부서', align: 'center', value: '부서', sortable: false, },
        { text: '최종로그인', align: 'center', value: '최종로그인', sortable: false, },
        { text: '상태', align: 'center', value: '상태', sortable: false, },
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
          date: "1%"
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
