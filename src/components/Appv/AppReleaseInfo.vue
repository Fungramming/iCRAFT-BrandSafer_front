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
              <!-- <v-checkbox
                :input-value="props.all"
                :indeterminate="props.indeterminate"
                primary
                hide-details
                @click.native="toggleAll"
              ></v-checkbox> -->
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
            <td class="text-xs-center companyName">{{ props.item.company_name }}</td>
            <td class="text-xs-center"><a class="code" @click.stop="showEditModal">{{ props.item.code }}</a></td>
            <td class="text-xs-center nameKr">{{ props.item.name_kr }}</td>
            <td class="text-xs-center tagType">{{ props.item.tagType }}</td>
            <td class="text-xs-center osType">{{ props.item.osType }}</td>
            <td class="text-xs-center version">{{ props.item.version }}</td>
            <td class="text-xs-center state">{{ props.item.state }}</td>
            <td class="text-xs-center limitCertCnt">{{ props.item.limitCertCnt }}</td>
            <td class="text-xs-center dtPublished">{{ props.item.dtPublished}}</td>
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
                  <select id="select1" v-model="submitData.companyCode" name="searchType" class="selectbox selectbox-100 form-control require-input" size="1">
                    <option v-for="item in companyList" :value="item.code" :key="item.code">{{item.name_kr}}</option>
                  </select>
                  <span class="required-notice">*필수 입력사항입니다.</span>
                </v-flex>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">태그타입
                    <span class="text-danger">*</span>
                  </label>
                  <span class="selectbox_arrow"></span>
                  <select id="select_tagtype" v-model="submitData.tagType" name="searchType" class="form-control selectbox selectbox-100 require-input" size="1">
                    <option value="HOLOTAG_ONLY">홀로태그</option>
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
                <v-flex d-flex xs12 sm12 md5 class="app-code">
                  <label class="input-title">APP 코드
                    <span class="text-danger">*</span>
                  </label>
                  <input v-model="submitData.code" class="input-text require-input not-allowed" type="text" disabled="disabled">  
                  <v-btn class="create-code" @click.stop="createAppcode">생성</v-btn>
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
                  <input v-model="submitData.limitCertCnt" class="input-text require-input" type="text" required="required">
                  <span class="required-notice">*필수 입력사항입니다.</span>
                </v-flex>
                 <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">업데이트 URL
                  </label>
                  <input v-model="submitData.updateUrl" class="input-text " type="text">
                </v-flex>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">설명</label>
                  <input v-model="submitData.description" class="input-text" type="text-area">
                </v-flex>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">배포일</label>
                  <input v-model="submitData.dtPublished" class="input-text" type="text-area">
                </v-flex>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">노트</label>
                  <input v-model="submitData.note" class="input-text" type="text">
                </v-flex>
              </v-list>
            </v-card-text>
          </div>
        </v-card>
      </modal>
    </v-flex>
    
    <!-- modal edit -->
    <v-flex d-flex xs12 sm12 requiredInputd12>
      <modal :width="modal_size" :height="modal_size_height" name="releaseInfo_edit" transition="pop-out">
        <v-card tile>
          <v-toolbar card dark color="primary">
            <v-btn icon dark @click.native="closeModal">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>고객사 수정</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click.stop="updateDatas">수정</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <div class="card-left">
            <v-card-text>
              <v-list three-line subheader>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">고객사
                  </label>
                  <input v-model="updateData.company_name" class="input-text require-input not-allowed" type="text" disabled="disabled">  
                </v-flex>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">태그타입
                  </label>
                  <input v-model="updateData.tagType" class="input-text require-input not-allowed" type="text" disabled="disabled">  
                </v-flex>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">OS
                  </label>
                  <input v-model="updateData.osType" class="input-text require-input not-allowed" type="text" disabled="disabled">  
                </v-flex>
                <!-- <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">APP 타입
                  </label>
                  <input v-model="updateData.type" class="input-text require-input not-allowed" type="text" disabled="disabled">  
                </v-flex> -->
                <v-flex d-flex xs12 sm12 md5 class="app-code">
                  <label class="input-title">APP 코드
                  </label>
                  <input v-model="updateData.code" class="input-text require-input not-allowed" type="text" disabled="disabled">  
                </v-flex>  
                <v-flex d-flex xs12 sm12 md5 >
                  <label class="input-title">버전
                    <span class="text-danger">*</span>
                  </label>
                  <input v-model="updateData.version" class="input-text require-input" type="text">  
                  <span class="required-notice">*필수 입력사항입니다.</span>
                </v-flex>    
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">APP명(한국어)
                    <span class="text-danger">*</span>
                  </label>
                  <input v-model="updateData.name_kr" class="input-text require-input" type="text" required="required" placeholder="고객사(한국어)">
                  <span class="required-notice">*필수 입력사항입니다.</span>
                </v-flex>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">APP명(영어)</label>
                  <input v-model="updateData.name_en" class="input-text" type="text">
                </v-flex>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">APP명(중국어)</label>
                  <input v-model="updateData.name_zh" class="input-text" type="text">
                </v-flex>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">인증제한 수
                    <span class="text-danger">*</span>
                  </label>
                  <input v-model="updateData.limitCertCnt" class="input-text require-input" type="text" required="required">
                  <span class="required-notice">*필수 입력사항입니다.</span>
                </v-flex>
                 <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">업데이트 URL
                  </label>
                  <input v-model="updateData.updateUrl" class="input-text " type="text">
                </v-flex>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">설명</label>
                  <input v-model="updateData.description" class="input-text" type="text-area">
                </v-flex>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">배포일</label>
                  <input v-model="updateData.dtPublished" class="input-text" type="text-area">
                </v-flex>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">노트</label>
                  <input v-model="updateData.note" class="input-text" type="text">
                </v-flex>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">상태
                    <span class="text-danger">*</span>
                  </label>
                  <span class="selectbox_arrow"></span>
                  <select id="select_state" v-model="updateData.state" name="searchType" class="form-control selectbox selectbox-100 require-input" size="1">
                    <option value="Enable">서비스</option>
                    <option value="Disable">사용정지</option>
                  </select>
                  <span class="required-notice">*필수 입력사항입니다.</span>
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
import { checkRequired, getTotal } from "../CompHelper.js";

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
        { text: "번호", align: "center", value: "idx", sortable: false },
        {
          text: "고객사",
          align: "center",
          value: "company_name",
          sortable: false
        },
        { text: "App코드", align: "center", value: "code", sortable: false },
        { text: "App명", align: "center", value: "name_kr", sortable: false },
        {
          text: "태그타입",
          align: "center",
          value: "tagType",
          sortable: false
        },
        { text: "OS", align: "center", value: "osType", sortable: false },
        { text: "버전", align: "center", value: "version", sortable: false },
        { text: "상태", align: "center", value: "state", sortable: false },
        {
          text: "인증제한 수",
          align: "center",
          value: "limitCertCnt",
          sortable: false
        },
        {
          text: "배포일",
          align: "center",
          value: "dtPublished",
          sortable: false
        }
      ],
      apps: [],
      companyList: [],

      // SUBMIT DATA
      submitData: {
        attachedPath: "",
        companyCode: "",
        description: "",
        code: "",
        dtModified: this.$store.state.submitTime,
        dtRegistered: this.$store.state.submitTime,
        dtPublished: this.$store.state.submitTime,
        limitCertCnt: "",
        limitCertHour: "",
        modifier: this.$store.state.user.modifier,
        name_en: null,
        name_kr: "",
        name_zh: null,
        note: "",
        osType: "",
        registrant: this.$store.state.user.modifier,
        tagType: "",
        type: "",
        updateUrl: null,
        version: ""
      },

      updateData: {
        attachedPath: "",
        companyCode: "",
        description: "",
        code: "",
        dtModified: this.$store.state.submitTime,
        dtRegistered: this.$store.state.submitTime,
        dtPublished: this.$store.state.submitTime,
        limitCertCnt: "",
        limitCertHour: "",
        modifier: this.$store.state.user.modifier,
        name_en: null,
        name_kr: "",
        name_zh: null,
        note: "",
        osType: "",
        registrant: this.$store.state.user.modifier,
        tagType: "",
        type: "",
        updateUrl: null,
        version: "",
        state: ""
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
        for (let item in box) {
          this.companyList.push(box[item]);
        }
      });
    },
    addDatas() {
      checkRequired();
      if (
        this.submitData.tagType &&
        this.submitData.osType &&
        this.submitData.type &&
        this.submitData.code &&
        this.submitData.name_kr &&
        this.submitData.code &&
        this.submitData.limitCertCnt &&
        this.submitData.dtPublished
      ) {
        this.$store
          .dispatch(Constant.ADD_APP_LELEASE, this.submitData)
          .then(() => {
            this.getDatas();
            this.closeModal();
            this.$store.commit(Constant.SHOW_MODAL, {
              isModal: true,
              modalText: "등록 되었습니다."
            });
          })
          .catch(err => {
            console.log("err :", err);
          });
      }
    },
    updateDatas({ idx, app }) {
      idx = this.updateData.idx;
      app = this.updateData;
      this.$store
        .dispatch(Constant.UPDATE_APP_LELEASE, {
          aid: idx,
          app: app
        })
        .then(() => {
          // updateData = this.updateData;
          this.getDatas();
          this.closeModal();
          this.$store.commit(Constant.SHOW_MODAL, {
            isModal: true,
            modalText: "수정 되었습니다."
          });
        })
        .catch(err => {
          console.log("err :", err);
        });
    },
    deleteDatas() {
      for (let item in this.selected) {
        this.$store
          .dispatch(Constant.DELETE_APP_LELEASE, this.selected[item].idx)
          .then(() => {
            this.getDatas();
          });
      }
      this.$store.commit(Constant.SHOW_MODAL, {
        isModal: true,
        modalText: "삭제 되었습니다."
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
    },
    showEditModal(e) {
      this.$modal.show("releaseInfo_edit");
      this.selected_index = e.target.parentNode.parentNode["sectionRowIndex"];
      this.updateData = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ];

      for (let item in this.updateData) {
        if (this.updateData[item] == "null") {
          this.updateData[item] = " ";
        }
      }
    },
    closeModal() {
      let vModal = this.$children[1];
      let vModalEdit = this.$children[2];

      if (vModal.visible) vModal.visible = false;
      else if (vModalEdit.visible) vModalEdit.visible = false;
    },
    createAppcode() {
      let tagCode = this.submitData.tagType;
      let OS = this.submitData.osType;
      let appType = this.submitData.type;
      let companyCode = this.submitData.companyCode;
      switch (OS) {
        case "iOS":
          OS = "I";
          break;
        case "안드로이드":
          OS = "A";
          break;
      }

      switch (tagCode) {
        case "HOLOTAG_ONLY":
          tagCode = "H";
          break;
        case "HYBRIDTAG":
          tagCode = "Y";
          break;
        case "RANDOMTAG":
          tagCode = "R";
          break;
        case "SQRTAG":
          tagCode = "S";
          break;
      }

      switch (appType) {
        case "APP":
          appType = "A";
          break;
        case "LIP":
          appType = "L";
          break;
      }

      this.submitData.code = appType + tagCode + "C" + OS + companyCode;
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.apps.slice();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/table";
@import "../../scss/modal";
.app-code {
  .create-code {
    background-color: #607d8b;
    color: #fff;
    border-radius: 0 4px 4px 0;
    position: absolute;
    right: -7px;
    top: -5px;
    min-width: 40px;
    height: 33px;
  }
}
.input-radio {
  margin: 0 30px;
}
</style>
