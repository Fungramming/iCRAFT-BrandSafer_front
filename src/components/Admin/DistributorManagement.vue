<template>
  <div class="tableBs">
    <!-- table top menu -->
    <div class="tableBs-top">
      <p>검색 조건</p>
      <v-layout row wrap>
        <v-flex mb0 d-flex xs12 sm12 md3>
          <div class="selectbox-input">
            <span>유통업체명</span>
            <input class="input-text" type="text">
          </div>
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
          <td class="text-xs-center">{{ props.item.distributor }}</td>
          <td class="text-xs-center">{{ props.item.address }}</td>
          <td class="text-xs-center">{{ props.item.status }}</td>
          <td class="text-xs-center">{{ props.item.account }}</td>
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
          <v-toolbar-title>유통업체 관리</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="dialog = false">저장</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="card-left">
          <v-card-text>
            <v-list three-line subheader>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">고객사
                  <span class="text-danger">*</span>
                </label>
                <span class="selectbox selectbox-100">
                  <select id="select1" name="searchType" class="form-control" size="1">
                    <option selected value="선택해주세요">선택해주세요</option>
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
                </span>
              </v-flex>    
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">유통업체명(한국어)
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text" type="text" required="required">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">유통업체명(영어)</label>
                <input class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">유통업체명(중국어)</label>
                <input class="input-text" type="text" placeholder="( * 5~15자 이내의 영/숫자 조합 )">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">노트</label>
                <input class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">상태</label>
                <input checked="checked" class="input-radio" type="radio" name="staus" value="사용">사용
                <input class="input-radio" type="radio" name="staus" value="정지">정지
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
        { text: "번호", align: "center", value: "번호", sortable: false },
        { text: "고객사", align: "center", value: "고객사", sortable: false },
        { text: "유통업체명", align: "center", value: "유통업체명", sortable: false },
        { text: "등록일", align: "center", value: "등록일", sortable: false },
        { text: "상태", align: "center", value: "상태", sortable: false },
        { text: "생성계정", align: "center", value: "생성계정", sortable: false }
      ],
      desserts: [
        {
          value: false,
          number: "1",
          customer: '오감바이오',
          distributor: '오감바이오',
          customer_code: 6.0,
          address: 24,
          status: '등록',
          account: 'newAccount',
        },
        {
          value: false,
          number: "2",
          customer: '오감바이오',
          distributor: '오감바이오',
          customer_code: 9.0,
          address: 37,
          status: '등록',
          account: 'newAccount',
        },
        {
          value: false,
          number: "3",
          customer: '오감바이오',
          distributor: '오감바이오',
          customer_code: 16.0,
          address: 23,
          status: '등록',
          account: 'newAccount',
          call_number: "7%",
        },
        {
          value: false,
          number: "4",
          customer: '오감바이오',
          distributor: '오감바이오',
          customer_code: 3.7,
          address: 67,
          status: '등록',
          account: 'newAccount',
          call_number: "8%",
        },
        {
          value: false,
          number: "5",
          customer: '오감바이오',
          distributor: '오감바이오',
          customer_code: 16.0,
          address: 49,
          status: '등록',
          account: 'newAccount',
          call_number: "16%",
        },
        {
          value: false,
          number: "6",
          customer: '오감바이오',
          distributor: '오감바이오',
          customer_code: 0.0,
          address: 94,
          status: '등록',
          account: 'newAccount',
          call_number: "0%",
        },
        {
          value: false,
          number: "7",
          customer: '오감바이오',
          distributor: '오감바이오',
          customer_code: 0.2,
          address: 98,
          status: '등록',
          account: 'newAccount',
          call_number: "2%",
        },
        {
          value: false,
          number: "8",
          customer: '오감바이오',
          distributor: '오감바이오',
          customer_code: 3.2,
          address: 87,
          status: '등록',
          account: 'newAccount',
          call_number: "45%",
        },
        {
          value: false,
          number: "9",
          customer: '오감바이오',
          distributor: '오감바이오',
          customer_code: 25.0,
          address: 51,
          status: '등록',
          account: 'newAccount',
          call_number: "22%",
        },
        {
          value: false,
          number: "10",
          customer: '오감바이오',
          distributor: '오감바이오',
          customer_code: 26.0,
          address: 65,
          status: '등록',
          account: 'newAccount',
          call_number: "6%",
        },
        {
          value: false,
          number: "11",
          customer: '오감바이오',
          distributor: '오감바이오',
          customer_code: 6.0,
          address: 24,
          status: '등록',
          account: 'newAccount',
        },
        {
          value: false,
          number: "12",
          customer: '오감바이오',
          distributor: '오감바이오',
          customer_code: 9.0,
          address: 37,
          status: '등록',
          account: 'newAccount',
        },
        {
          value: false,
          number: "13",
          customer: '오감바이오',
          distributor: '오감바이오',
          customer_code: 16.0,
          address: 23,
          status: '등록',
          account: 'newAccount',
        },
        {
          value: false,
          number: "14",
          customer: '오감바이오',
          distributor: '오감바이오',
          customer_code: 3.7,
          address: 67,
          status: '등록',
          account: 'newAccount',
        },
        {
          value: false,
          number: "15",
          customer: '오감바이오',
          distributor: '오감바이오',
          customer_code: 16.0,
          address: 49,
          status: '등록',
          account: 'newAccount',
        },
        {
          value: false,
          number: "16",
          customer: '오감바이오',
          distributor: '오감바이오',
          customer_code: 0.0,
          address: 94,
          status: '등록',
          account: 'newAccount',
        },
        {
          value: false,
          number: "17",
          customer: '오감바이오',
          distributor: '오감바이오',
          customer_code: 0.2,
          address: 98,
          status: '등록',
          account: 'newAccount',
        },
        {
          value: false,
          number: "18",
          customer: '오감바이오',
          distributor: '오감바이오',
          customer_code: 3.2,
          address: 87,
          status: '등록',
          account: 'newAccount',
        },
        {
          value: false,
          number: "19",
          customer: '오감바이오',
          distributor: '오감바이오',
          customer_code: 25.0,
          address: 51,
          status: '등록',
          account: 'newAccount',
        },
        {
          value: false,
          number: "20",
          customer: '오감바이오',
          distributor: '오감바이오',
          customer_code: 26.0,
          address: 65,
          status: '등록',
          account: 'newAccount',
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
