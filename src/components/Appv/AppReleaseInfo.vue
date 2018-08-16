<template>
  <div class="tableBs">
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
        :items="apps"
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
            <td class="text-xs-center">{{ props.item.company_name }}</td>
            <td class="text-xs-center"><a>{{ props.item.code }}</a></td>
            <td class="text-xs-center">{{ props.item.name_kr }}</td>
            <td class="text-xs-center">{{ props.item.tagType }}</td>
            <td class="text-xs-center">{{ props.item.osType }}</td>
            <td class="text-xs-center">{{ props.item.version }}</td>
            <td class="text-xs-center">{{ props.item.state }}</td>
            <td class="text-xs-center">{{ props.item.limitCertCnt }}</td>
            <td class="text-xs-center">{{ props.item.dtPublished}}</td>
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
        <v-layout row wrap btn-group>
          <v-flex d-flex xs12 sm12 md1 offset-md10>
            <v-btn color="error" dark @click.stop="deleteDatas">삭제</v-btn>
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
    <v-flex d-flex xs12 sm12 requiredInputd12>
      <modal :width="modal_size" :height="modal_size_height" name="releaseInfo" transition="pop-out">
        <v-card tile>
          <v-toolbar card dark color="primary">
            <v-btn icon dark @click.native="closeModal">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>APP 등록</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click.stop="addDatas">등록</v-btn>
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
                    <select id="select1" v-model="updateData.companyCode" name="searchType" class="form-control" size="1">
                      <option v-for="item in companyList" :value="item.code" :key="item.code">{{item.name_kr}}</option>
                    </select>
                  </span>
                </v-flex>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">태그타입
                    <span class="text-danger">*</span>
                  </label>
                  <span class="selectbox_arrow"></span>
                  <select id="select_tagtype" v-model="submitData.type" name="searchType" class="form-control selectbox selectbox-100 require-input" size="1">
                    <option value="HOLOTAG_ONLY">홀로태그</option>
                    <option value="HOLOTAG_BARCODE">홀로태그 + QR</option>
                    <option value="HYBRIDTAG">하이브리드태그</option>
                    <option value="RANDOMTAG">난수태그</option>
                    <option value="SQRTAG">SQR태그</option>
                  </select>
                  <span class="required-notice">*필수 입력사항입니다.</span>
                </v-flex>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">OS
                    <span class="text-danger">*</span>
                  </label>
                  <span class="selectbox_arrow"></span>
                  <select id="select_tagtype" v-model="submitData.osType" name="searchType" class="form-control selectbox selectbox-100 require-input" size="1">
                    <option value="iOS">iOS</option>
                    <option value="안드로이드">안드로이드</option>
                  </select>
                  <span class="required-notice">*필수 입력사항입니다.</span>
                </v-flex>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">APP 타입
                    <span class="text-danger">*</span>
                  </label>
                  <span class="selectbox_arrow"></span>
                  <select id="select_tagtype" v-model="submitData.type" name="searchType" class="form-control selectbox selectbox-100 require-input" size="1">
                    <option value="APP">APP</option>
                    <option value="LIB">LIB</option>
                  </select>
                  <span class="required-notice">*필수 입력사항입니다.</span>
                </v-flex>
                <v-flex d-flex xs12 sm12 md5 >
                  <label class="input-title">버전
                    <span class="text-danger">*</span>
                  </label>
                  <input v-model="submitData.version" class="input-text require-input" type="text">  
                  <span class="required-notice">*필수 입력사항입니다.</span>
                </v-flex>    
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">APP명(한국어)
                    <span class="text-danger">*</span>
                  </label>
                  <input v-model="submitData.name_kr" class="input-text require-input" type="text" required="required" placeholder="고객사(한국어)">
                  <span class="required-notice">*필수 입력사항입니다.</span>
                </v-flex>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">APP명(영어)</label>
                  <input v-model="submitData.name_en" class="input-text" type="text">
                </v-flex>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">APP명(중국어)</label>
                  <input v-model="submitData.name_zh" class="input-text" type="text">
                </v-flex>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">인증제한 수
                    <span class="text-danger">*</span>
                  </label>
                  <input v-model="submitData.name_kr" class="input-text require-input" type="text" required="required" placeholder="고객사(한국어)">
                  <span class="required-notice">*필수 입력사항입니다.</span>
                </v-flex>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">설명</label>
                  <input v-model="submitData.description" class="input-text" type="text">
                </v-flex>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">노트</label>
                  <input v-model="submitData.note" class="input-text" type="text">
                </v-flex>
                <v-flex d-flex xs12 sm12 md3>
                  <label class="input-title">상태</label>
                  <input v-model="submitData.state" checked="checked" class="input-radio" type="radio" name="staus" value="Enable">서비스
                  <input v-model="submitData.state" class="input-radio" type="radio" name="staus" value="Deleted">사용정지
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
import { getTotal } from "../CompHelper.js";

export default {
  data() {
    return {
      search: "",
      dialog: false,
      dialog_edit: false,
      modal_size: Constant.MODAL_SIZE,
      modal_size_height: Constant.MODAL_SIZE_HEIGHT,
      pagination: {
        page: 1,
        rowsPerPage: 10
      },
      total: "",
      selected: [],
      headers: [
        { text: "번호", align: "center", value: "번호", sortable: false },
        { text: "고객사", align: "center", value: "고객사", sortable: false },
        { text: "App코드", align: "center", value: "App코드", sortable: false },
        { text: "App명", align: "center", value: "App명", sortable: false },
        {
          text: "태그타입",
          align: "center",
          value: "태그타입",
          sortable: false
        },
        { text: "OS", align: "center", value: "OS", sortable: false },
        { text: "버전", align: "center", value: "버전", sortable: false },
        { text: "상태", align: "center", value: "상태", sortable: false },
        {
          text: "인증제한 수",
          align: "center",
          value: "인증제한 수",
          sortable: false
        },
        { text: "배포일", align: "center", value: "배포일", sortable: false }
      ],
      apps: [],
      companyList: [],

      // SUBMIT DATA
      submitData: {
        attachedPath: "",
        code: "",
        companyCode: "",
        company_name: "",
        description: "",
        dtModified: "",
        dtPublished: "",
        dtRegistered: "",
        idx: "",
        limitCertCnt: "",
        limitCertHour: "",
        modifier: "",
        name_en: "",
        name_kr: "",
        name_zh: "",
        note: "",
        osType: "",
        registrant: "",
        state: "",
        tagType: "",
        type: "",
        updateUrl: "",
        version: ""
      },

      updateData: {
        attachedPath: "",
        code: "",
        companyCode: "",
        company_name: "",
        description: "",
        dtModified: "",
        dtPublished: "",
        dtRegistered: "",
        idx: "",
        limitCertCnt: "",
        limitCertHour: "",
        modifier: "",
        name_en: "",
        name_kr: "",
        name_zh: "",
        note: "",
        osType: "",
        registrant: "",
        state: "",
        tagType: "",
        type: "",
        updateUrl: "",
        version: ""
      }
    };
  },
  computed: {
    pages() {
      if (this.pagination.rowsPerPage == null || this.total == null) return 0;

      return Math.ceil(this.total / this.pagination.rowsPerPage);
    }
  },
  mounted() {
    this.getDatas();
    this.getCompanyList();
  },
  updated() {
    getTotal(this);
  },
  methods: {
    getDatas() {
      this.$store.dispatch(Constant.FETCH_APP_LELEASE).then(resp => {
        this.apps = resp.data.apps.reverse();
        this.dateFormat();
      });
    },
    getCompanyList() {
      this.$store.dispatch(Constant.FETCH_COMPANY).then(resp => {
        let box = resp.data.company;
        console.log("box :", box);
        for (let item in box) {
          this.companyList.push(box[item]);
        }
      });
    },
    dateFormat() {
      let apps = this.apps;
      for (let item in apps) {
        let date = new Date(apps[item].dtPublished);
        let formatDate = date.toLocaleDateString();
        apps[item].dtPublished = formatDate;
      }
    },
    showModal() {
      this.$modal.show("releaseInfo");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/table";
@import "../../scss/modal";
</style>
