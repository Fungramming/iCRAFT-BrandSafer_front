<template>
  <div class="tableBs">
    <!-- table top menu -->
    <!-- <div class="tableBs-top">
      <p>검색 조건</p>
      <v-layout row wrap>
        <v-flex mb0 d-flex xs12 sm12 md3>
          <div class="selectbox-input">
            <span>유통업체명</span>
            <input class="input-text" type="text">
          </div>
        </v-flex>
      </v-layout>
    </div> -->
    <!-- table wrap -->
    <v-app class="inspire">
      <v-card-title>
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
        :items="distributors"
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
            <td class="text-xs-left">{{ total - props.index - total_index }}</td>
            <!-- <td class="text-xs-left">{{ props.item.idx}}</td> -->
            <td class="text-xs-left">{{ props.item.name_kr }}</td>
            <td class="text-xs-left"><a @click.stop="showEditModal"> {{ props.item.name_kr }} </a></td>
            <td class="text-xs-left">{{ props.item.dtRegistered }}</td>
            <td class="text-xs-left">{{ props.item.state }}</td>
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
            <v-btn color="primary" dark @click.stop="showModal">등록</v-btn>
          </v-flex>
        </v-layout>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages" :total-visible="7"></v-pagination>
        </div>
      </div>
    </v-app>


    <!-- modal -->
    <v-flex d-flex xs12 sm12 md12>
      <modal :width="modal_size" :height="modal_size" name="distributors" transition="pop-out">
        <v-card tile>
        <v-toolbar card dark color="primary">
          <v-toolbar-title>유통업체 관리</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat>등록</v-btn>
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
      </modal>
    </v-flex>

    <!-- modal edit -->
    <v-flex d-flex xs12 sm12 md12>
      <modal :width="modal_size" :height="modal_size" name="distributors_edit" transition="pop-out">
        <v-card tile>
        <v-toolbar card dark color="primary">
          <v-toolbar-title>유통업체 수정</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat>수정</v-btn>
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
      </modal>
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
      modal_size: Constant.MODAL_SIZE,
      pagination: {
        page: 1,
        rowsPerPage: 10
      },
      total: "",
      total_index: "",
      selected: [],
      headers: [
        { text: "번호", align: "left", value: "idx", sortable: false },
        { text: "고객사", align: "left", value: "name_kr", sortable: false },
        {
          text: "유통업체명",
          align: "left",
          value: "name_kr",
          sortable: false
        },
        {
          text: "등록일",
          align: "left",
          value: "dtRegistered",
          sortable: false
        },
        { text: "상태", align: "left", value: "state", sortable: false },
        {
          text: "생성계정",
          align: "left",
          value: "registrant",
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

      return Math.ceil(this.total / this.pagination.rowsPerPage);
    }
  },
  updated() {
    this.getTotal();
  },
  mounted() {
    this.$store.dispatch(Constant.FETCH_DISTRIBUTOR).then(resp => {
      this.distributors = resp.data.distributors.reverse();
      // console.log("this.distributors :", this.distributors);
      // console.log("this.distributors.length :", this.distributors.length);
      this.total = this.distributors.length;
    });
  },
  methods: {
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
    showModal() {
      this.$modal.show("distributors");
    },
    showEditModal() {
      this.$modal.show("distributors_edit");
    },
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
