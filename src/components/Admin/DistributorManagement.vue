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
            <!-- <th>
              <v-checkbox
                :input-value="props.all"
                :indeterminate="props.indeterminate"
                primary
                hide-details
                @click.native="toggleAll"
              ></v-checkbox>
            </th> -->
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
            <!-- <td class="text-xs-left">{{ props.item.idx}}</td> -->
            <td class="text-xs-left">{{ props.item.companyCode }}</td>
            <td class="text-xs-left"><a @click.stop="showEditModal"> {{ props.item.name_kr }} </a></td>
            <td class="text-xs-left">{{ props.item.dtRegistered }}</td>
            <td class="text-xs-left">{{ props.item.state }}</td>
            <td class="text-xs-left">{{ props.item.registrant }}</td>
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
      <div class="bottom-contents-wrap">
        <v-layout row wrap btn-group>
          <v-flex d-flex align-center xs12 md2 >
            <span d-flex class="bottom-total">전체건수 : <span class="bottom-total-result">{{total}}</span> 건</span>
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
    <v-flex d-flex xs12 sm12 md12>
      <modal :width="modal_size" :height="modal_size" name="distributors" transition="pop-out">
        <v-card tile>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click.native="closeModal">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>유통업체 관리</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="addDatas">등록</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="card-left">
          <v-card-text>
            <v-list three-line subheader>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">고객사
                  <span class="text-danger">*</span>
                </label>
                <span class="selectbox_arrow"></span>
                <select id="select1" v-model="submitData.companyCode" name="searchType" class="form-control selectbox selectbox-100 require-input" size="1">
                  <option v-for="item in companyList" :value="item.code" :key="item.code">{{item.name_kr}}</option>
                </select>
                <span class="required-notice">*필수 입력사항입니다.</span>
              </v-flex>    
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">유통업체명(한국어)
                  <span class="text-danger">*</span>
                </label>
                <input v-model="submitData.name_kr" class="input-text require-input" type="text" required="required">
                <span class="required-notice">*필수 입력사항입니다.</span>
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">유통업체명(영어)</label>
                <input v-model="submitData.name_en" class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">유통업체명(중국어)</label>
                <input v-model="submitData.name_zh" class="input-text" type="text" placeholder="( * 5~15자 이내의 영/숫자 조합 )">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">노트</label>
                <input v-model="submitData.note" class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md2>
                <label class="input-title">상태</label>
                <input v-model="submitData.state" checked="checked" class="input-radio" type="radio" name="staus" value="Registered">사용
                <input v-model="submitData.state" class="input-radio" type="radio" name="staus" value="Deleted">정지
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
          <v-btn icon dark @click.native="closeModal">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>유통업체 수정</v-toolbar-title>
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
                  <span class="text-danger">*</span>
                </label>
                <span class="selectbox selectbox-100">
                  <select id="select1" v-model="updateData.companyCode" name="searchType" class="form-control not-allowed" size="1" disabled>
                    <option v-for="item in companyList" :value="item.code" :key="item.code">{{item.name_kr}}</option>
                  </select>
                </span>
              </v-flex>    
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">유통업체명(한국어)
                  <span class="text-danger">*</span>
                </label>
                <input v-model="updateData.name_kr" class="input-text selectbox selectbox-100 require-input" type="text" required="required">
                <span class="required-notice">*필수 입력사항입니다.</span>
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">유통업체명(영어)</label>
                <input  v-model="updateData.name_en" class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">유통업체명(중국어)</label>
                <input v-model="updateData.name_zh" class="input-text" type="text" placeholder="( * 5~15자 이내의 영/숫자 조합 )">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">노트</label>
                <input v-model="updateData.note" class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md2>
                <label class="input-title">상태</label>
                <input v-model="updateData.state" checked="checked" class="input-radio" type="radio" name="staus" value="Registered">사용
                <input v-model="updateData.state" class="input-radio" type="radio" name="staus" value="Deleted">정지
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
      companyList: [],
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
        { text: "선택", align: "left", value: "select", sortable: false },
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
      distributors: [],

      // For edit modal
      selected_index: "",
      // selected_name_kr: "",
      // selected_name_en: "",
      // selected_name_zh: "",
      // selected_note: ""

      // add
      submitData: {
        companyCode: "",
        dtModified: "",
        dtRegistered: this.$store.state.submitTime,
        headerquarterYN: "Y",
        modifier: "",
        name_en: "",
        name_kr: "",
        name_zh: "",
        note: "",
        registrant: this.$store.state.user.modifier,
        rtid: "",
        state: ""
      },

      // update
      updateIndex: "",
      updateData: {
        companyCode: "",
        dtModified: this.$store.state.submitTime,
        dtRegistered: "",
        headerquarterYN: "Y",
        modifier: this.$store.state.user.modifier,
        name_en: "",
        name_kr: "",
        name_zh: "",
        note: "",
        registrant: "",
        rtid: "",
        state: ""
      }
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
    this.getCompanyList();
  },
  methods: {
    getDatas() {
      this.$store.dispatch(Constant.FETCH_DISTRIBUTOR).then(resp => {
        this.distributors = resp.data.distributors.reverse();
        this.total = this.distributors.length;
        this.dateFormat();
      });
    },
    dateFormat() {
      let distributors = this.distributors;
      for (let item in distributors) {
        let date = new Date(distributors[item].dtRegistered);
        let formatDate = date.toLocaleDateString();
        distributors[item].dtRegistered = formatDate;
      }
    },
    addDatas() {
      checkRequired();
      if (this.submitData.companyCode && this.submitData.name_kr) {
        this.$store
          .dispatch(Constant.ADD_DISTRIBUTOR, this.submitData)
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
    updateDatas({ idx, app }) {
      idx = this.updateIndex;
      app = this.updateData;
      console.log("idx :", idx);
      console.log("app :", app);
      this.$store
        .dispatch(Constant.UPDATE_DISTRIBUTOR, {
          did: idx,
          distributor: app
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
    getCompanyList() {
      this.$store.dispatch(Constant.FETCH_COMPANY).then(resp => {
        let box = resp.data.company;
        console.log("box :", box);
        for (let item in box) {
          this.companyList.push(box[item]);
        }
      });
    },
    deleteDatas() {
      for (let item in this.selected) {
        this.$store
          .dispatch(Constant.DELETE_DISTRIBUTOR, this.selected[item].idx)
          .then(() => {
            this.getDatas();
            this.$store.commit(Constant.SHOW_MODAL, {
              isModal: true,
              modalText: "삭제 되었습니다."
            });
          });
      }
    },
    showModal() {
      this.$modal.show("distributors");
    },
    closeModal() {
      let vModal = this.$children[1];
      let vModalEdit = this.$children[2];

      if (vModal.visible) vModal.visible = false;
      else if (vModalEdit.visible) vModalEdit.visible = false;
    },
    showEditModal(e) {
      this.$modal.show("distributors_edit");

      this.selected_index = e.target.parentNode.parentNode["sectionRowIndex"];

      this.updateData.name_kr = e.path[2].children[3].innerText;
      this.updateData.name_en = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].name_en;
      this.updateData.name_zh = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].name_zh;
      this.updateData.note = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].note;
      this.updateData.companyCode = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].companyCode;
      this.updateData.dtModified = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].dtModified;
      this.updateData.dtRegistered = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].dtRegistered;
      this.updateData.registrant = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].registrant;
      this.updateData.modifier = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].modifier;
      this.updateData.rtid = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].rtid;
      this.updateData.state = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].state;

      // find index
      this.updateIndex = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].idx;
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.distributors.slice();
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
