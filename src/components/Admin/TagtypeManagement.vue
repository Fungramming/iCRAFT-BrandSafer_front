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
        :items="tag_type"
        :search="search"
        :pagination.sync="pagination"
        v-model="selected"
        item-key="idx"
        select-all
        class="elevation-1"
      >

        <template slot="headers" slot-scope="props">
          <tr>
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
            <td class="text-xs-left"><a @click.stop="showEditModal"> {{ props.item.version }} </a></td>
            <td class="text-xs-left">{{ props.item.type }}</td>
            <td class="text-xs-left">{{ props.item.width }} * {{ props.item.height }}</td>
            <td class="text-xs-left">{{ props.item.state }}</td>
            <td class="text-xs-left">{{ props.item.registrant }}</td>
            <td class="text-xs-left">{{ props.item.dtRegistered }}</td>
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
          </select>
        </div>
      </div>

      <div class="bottom-contents-wrap">
        <v-layout row wrap btn-group>
          <v-flex d-flex align-center xs12 md2 >
            <span class="bottom-total">전체건수 : <span class="bottom-total-result">{{total}}</span> 건</span>
          </v-flex>
          <v-flex d-flex align-center justify-center xs12 md8>
            <v-pagination v-model="pagination.page" :length="pages" :total-visible="7" class="justify-center"></v-pagination>
          </v-flex>
          <v-flex d-flex align-center xs12 md2>
            <v-btn color="error" dark @click.stop="deleteDatas">삭제</v-btn>
            <v-btn color="primary" dark @click.stop="showModal">등록</v-btn>
          </v-flex>
        </v-layout>
      </div>
    </v-app>

    <!-- modal -->
    <v-flex d-flex xs12 sm12 requiredInputd12>
      <modal :width="modal_size.width" :height="modal_size.height" name="tagtype" transition="pop-out">
        <v-card tile>
          <v-toolbar card dark color="primary">
            <v-btn icon dark @click.native="closeModal">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>태그타입 관리</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click.stop="addDatas">등록</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <div class="card-left">
            <v-card-text>
              <v-list three-line subheader>
                <v-flex d-flex xs12 sm12 md5 >
                  <label class="input-title">버전
                    <span class="text-danger">*</span>
                  </label>
                  <input v-model="submitData.version" class="input-text require-input" type="text">  
                  <span class="required-notice">*필수 입력사항입니다.</span>
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
                  <label class="input-title">사이즈
                    <span class="text-danger">*</span>
                  </label>
                  <input v-model="submitData.width" class="input-text input-size require-input" type="text" placeholder="width">
                  <input v-model="submitData.height" class="input-text input-size require-input" type="text" placeholder="height">        
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

    <!-- modal edit -->
    <v-flex d-flex xs12 sm12 md12>
      <modal :width="modal_size.width" :height="modal_size.height" name="tagtype_edit" transition="pop-out">
        <v-card tile>
          <v-toolbar card dark color="primary">
            <v-btn icon dark @click.native="closeModal">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>태그타입 수정</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click.stop="updateDatas">수정</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <div class="card-left">
            <v-card-text>
              <v-list three-line subheader>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">버전
                    <span class="text-danger">*</span>
                  </label>
                  <input v-model="updateData.version" class="input-text not-allowed require-input" type="text" disabled>
                  <span class="required-notice">*필수 입력사항입니다.</span>
                </v-flex>    
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">태그타입
                    <span class="text-danger">*</span>
                  </label>
                  <span class="selectbox_arrow"></span>
                  <select id="select_tagtype_u" v-model="updateData.type" name="searchType" class="form-control selectbox selectbox-100 require-input" size="1">
                    <option value="HOLOTAG_ONLY">홀로태그</option>
                    <option value="HOLOTAG_BARCODE">홀로태그 + QR</option>
                    <option value="HYBRIDTAG">하이브리드태그</option>
                    <option value="RANDOMTAG">난수태그</option>
                    <option value="SQRTAG">SQR태그</option>
                  </select>
                  <span class="required-notice">*필수 입력사항입니다.</span>
                </v-flex>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">사이즈
                    <span class="text-danger">*</span>
                  </label>
                  <input v-model="updateData.width" class="input-text input-size require-input" type="text" placeholder="width">
                  <input v-model="updateData.height" class="input-text input-size require-input" type="text" placeholder="height">
                  <span class="required-notice">*필수 입력사항입니다.</span>
                </v-flex>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">설명</label>
                  <input v-model="updateData.description" class="input-text" type="text">
                </v-flex>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">노트</label>
                  <input v-model="updateData.note" class="input-text" type="text">
                </v-flex>
                <v-flex d-flex xs12 sm12 md3>
                  <label class="input-title">상태</label>
                  <input v-model="updateData.state" checked="checked" class="input-radio" type="radio" name="staus" value="Enable">서비스
                  <input v-model="updateData.state" class="input-radio" type="radio" name="staus" value="Deleted">사용정지
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
      modal_size: {
        width: Constant.MODAL_SIZE,
        height: 400
      },
      pagination: {
        page: 1,
        rowsPerPage: 10
      },
      required: false,
      required_notice: "",
      total: "",
      selected: [],
      headers: [
        { text: "선택", align: "left", value: "select", sortable: false },
        { text: "번호", align: "left", value: "idx", sortable: false },
        { text: "버전", align: "left", value: "version", sortable: false },
        {
          text: "태그타입",
          align: "left",
          value: "type",
          sortable: false
        },
        { text: "사이즈", align: "left", value: "width", sortable: false },
        { text: "상태", align: "left", value: "state", sortable: false },
        { text: "작성자", align: "left", value: "registrant", sortable: false },
        {
          text: "등록일",
          align: "left",
          value: "dtRegistered",
          sortable: false
        }
      ],
      tag_type: [],

      //submitData
      submitData: {
        description: "",
        dtModified: "",
        dtRegistered: this.$store.state.submitTime,
        height: "",
        modifier: this.$store.state.user.modifier,
        name_en: "",
        name_kr: "",
        name_zh: "",
        note: "",
        registrant: this.$store.state.user.modifier,
        state: "",
        type: "",
        version: "",
        width: ""
      },

      //submitData
      updateIndex: "",
      updateData: {
        description: "",
        dtModified: this.$store.state.submitTime,
        dtRegistered: "",
        height: "",
        modifier: this.$store.state.user.modifier,
        name_en: "",
        name_kr: "",
        name_zh: "",
        note: "",
        registrant: "",
        state: "",
        type: "",
        version: "",
        width: ""
      },

      // For edit modal
      selected_index: ""
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
    checkRequired();
    getTotal(this);
  },
  mounted() {
    this.getDatas();
  },
  methods: {
    addDatas() {
      checkRequired();
      if (
        this.submitData.version &&
        this.submitData.type &&
        this.submitData.width &&
        this.submitData.height
      ) {
        this.$store
          .dispatch(Constant.ADD_TAG_TYPE, this.submitData)
          .then(() => {
            this.getDatas();
            this.closeModal();
            this.$store.commit(Constant.SHOW_MODAL, {
              isModal: true,
              modalText: "등록 되었습니다."
            });
          });
      }
    },
    getDatas() {
      this.$store.dispatch(Constant.FETCH_TAG_TYPE).then(resp => {
        this.tag_type = resp.data.tag_type.reverse();
        this.total = this.tag_type.length;
        this.dateFormat();
      });
    },
    dateFormat() {
      let tag_type = this.tag_type;
      for (let item in tag_type) {
        let date = new Date(tag_type[item].dtRegistered);
        let formatDate = date.toLocaleDateString();
        tag_type[item].dtRegistered = formatDate;
      }
    },
    updateDatas({ idx, app }) {
      idx = this.updateIndex;
      app = this.updateData;
      console.log("idx :", idx);
      console.log("app :", app);
      this.$store
        .dispatch(Constant.UPDATE_TAG_TYPE, {
          tid: idx,
          tagType: app
        })
        .then(() => {
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
          .dispatch(Constant.DELETE_TAG_TYPE, this.selected[item].idx)
          .then(() => {
            this.getDatas();
          });
      }
      this.$store.commit(Constant.SHOW_MODAL, {
        isModal: true,
        modalText: "삭제 되었습니다."
      });
    },
    showModal() {
      this.$modal.show("tagtype");
    },
    closeModal() {
      let vModal = this.$children[1];
      let vModalEdit = this.$children[2];

      if (vModal.visible) vModal.visible = false;
      else if (vModalEdit.visible) vModalEdit.visible = false;
    },
    showEditModal(e) {
      this.$modal.show("tagtype_edit");
      this.selected_index = e.target.parentNode.parentNode["sectionRowIndex"];

      this.updateData.version = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].version;
      this.updateData.width = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].width;
      this.updateData.height = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].height;
      this.updateData.type = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].type;
      this.updateData.note = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].note;
      this.updateData.name_en = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].name_en;
      this.updateData.name_kr = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].name_kr;
      this.updateData.name_zh = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].name_zh;
      this.updateData.description = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].description;
      this.updateData.state = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].state;
      this.updateData.dtModified = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].dtModified;
      this.updateData.dtRegistered = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].dtRegistered;
      this.updateData.modifier = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].modifier;
      this.updateData.registrant = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].registrant;

      // find index
      this.updateIndex = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].idx;
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.tag_type.slice();
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
