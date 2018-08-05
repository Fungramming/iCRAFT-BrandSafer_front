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
        :items="distributors"
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
          <td class="text-xs-left">{{ props.item.idx}}</td>
          <td class="text-xs-left">{{ props.item.name_kr }}</td>
          <td class="text-xs-left"><a @click="dialog_edit = true"> {{ props.item.name_kr }} </a></td>
          <td class="text-xs-left">{{ props.item.dtRegistered }}</td>
          <td class="text-xs-left">{{ props.item.state }}</td>
          <td class="text-xs-left">{{ props.item.registrant }}</td>
        </template>
      </v-data-table>
      <span class="bottom-total">전체건수 : <span class="bottom-total-result">{{distributors.length}}</span> 건</span>
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
          <v-pagination v-model="pagination.page" :length="pages" :total-visible="7"></v-pagination>
        </div>
      </div>
    </v-app>

    <!-- modal dialog -->
    <v-flex d-flex xs12 sm12 md12>
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
              <v-flex d-flex xs12 sm12 md2>
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

    <!-- modal edit dialog -->
    <v-flex d-flex xs12 sm12 md12>
    <v-dialog
      v-model="dialog_edit"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <!-- start modal -->
      <v-card tile>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click.native="dialog_edit = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>유통업체 수정</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="dialog_edit = false">수정</v-btn>
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
              <v-flex d-flex xs12 sm12 md2>
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
import Constant from "../../constant.js";

export default {
  data() {
    return {
      search: "",
      dialog: false,
      dialog_edit: false,
      pagination: {
        page: 1,
        rowsPerPage: 10
      },
      selected: [],
      headers: [
        { text: "번호", align: "left", value: "번호", sortable: false },
        { text: "고객사", align: "left", value: "고객사", sortable: false },
        {
          text: "유통업체명",
          align: "left",
          value: "유통업체명",
          sortable: false
        },
        { text: "등록일", align: "left", value: "등록일", sortable: false },
        { text: "상태", align: "left", value: "상태", sortable: false },
        {
          text: "생성계정",
          align: "left",
          value: "생성계정",
          sortable: false
        }
      ],
      distributors: []
    };
  },
  computed: {
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;

      return Math.ceil(this.distributors.length / this.pagination.rowsPerPage);
    }
  },
  mounted() {
    this.$store.dispatch(Constant.FETCH_DISTRIBUTOR).then(resp => {
      this.distributors = resp.data.distributors.reverse();
      console.log("this.distributors :", this.distributors);
      console.log("this.distributors.length :", this.distributors.length);
    });
    // this.changer();
  }
  // methods: {
  //   changer: function() {
  //     if (this.distributors.state === "Registered") {
  //       this.distributors.state = "등록";
  //     }
  //     console.log("this.distributors :", this.distributors);
  //   }
  // }
};
</script>

<style lang="scss" scoped>
@import "../../scss/table";
@import "../../scss/modal";
</style>
