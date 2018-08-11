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
                <span class="selectbox selectbox-100">
                  <select id="select1" v-model="submitData.companyCode" name="searchType" class="form-control" size="1">
                    <option v-for="item in companyList" :value="item.code" :key="item.code">{{item.name_kr}}</option>                    
                  </select>
                </span>
              </v-flex>    
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">유통업체명(한국어)
                  <span class="text-danger">*</span>
                </label>
                <input v-model="submitData.name_kr" class="input-text" type="text" required="required">
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
          <v-btn icon dark @click.native="closeModal">
            <v-icon>close</v-icon>
          </v-btn>
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
                  <select id="select1" v-model="submitData.companyCode" name="searchType" class="form-control" size="1" disabled>
                    <option value="" selected>{{selected_name_kr}}</option>                  
                  </select>
                </span>
              </v-flex>    
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">유통업체명(한국어)
                  <span class="text-danger">*</span>
                </label>
                <input :value="selected_name_kr" class="input-text" type="text" required="required">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">유통업체명(영어)</label>
                <input  :value="selected_name_en" class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">유통업체명(중국어)</label>
                <input :value="selected_name_zh" class="input-text" type="text" placeholder="( * 5~15자 이내의 영/숫자 조합 )">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">노트</label>
                <input :value="selected_note" class="input-text" type="text">
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
import { getSelectedFunc, getTotal } from "../CompHelper.js";

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
      submitData: {
        companyCode: "",
        dtModified: this.$store.state.submitTime,
        dtRegistered: this.$store.state.submitTime,
        headerquarterYN: "Y",
        modifier: this.$store.state.user.modifier,
        name_en: "",
        name_kr: "",
        name_zh: "",
        note: "",
        registrant: this.$store.state.user.modifier,
        rtid: "",
        state: "Registered"
      },
      // For edit modal
      selected_name_kr: "",
      selected_name_en: "",
      selected_name_zh: "",
      selected_note: ""
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
    getTotal(this);
  },
  mounted() {
    this.getDatas();
    this.getCompanyList();
  },
  methods: {
    addDatas() {
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
    },
    getCompanyList() {
      this.$store.dispatch(Constant.FETCH_COMPANY).then(resp => {
        let box = resp.data.company;
        for (let item in box) {
          this.companyList.push(box[item]);
        }
      });
    },
    getDatas() {
      this.$store.dispatch(Constant.FETCH_DISTRIBUTOR).then(resp => {
        this.distributors = resp.data.distributors.reverse();
        this.total = this.distributors.length;
      });
    },
    getTotal() {
      // let update_total = this.$children[0].$children[1].searchLength;
      // this.total = update_total;

      // let page = document.getElementsByClassName("v-select__selection");
      // let pageActive = document.getElementsByClassName(
      //   "v-pagination__item--active"
      // );
      // let pageText = page[0].innerText;
      // let pageActiveText = pageActive[0].innerText;
      // let pageNum = pageActiveText - 1;
      // let calPage = pageNum * pageText;
      // this.total_index = calPage;
      let update_total = this.$children[0].$children[1].searchLength;
      console.log("update_total :", update_total);
      this.total = update_total;

      let pageNum = this.$children[0].$children[4].value - 1;
      let pageActiveText = this.$children[0].$children[1].$children[1].value;
      let calPage = pageNum * pageActiveText;
      this.total_index = calPage;
    },
    showModal() {
      this.$modal.show("distributors");
    },
    closeModal() {
      let vModal = this.$children[1];
      vModal.visible = false;
    },
    showEditModal(e) {
      this.$modal.show("distributors_edit");

      this.selected_name_kr = e.path[2].children[3].innerText;

      this.selected_index = e.target.parentNode.parentNode["sectionRowIndex"];
      this.selected_name_en = this.distributors[this.selected_index].name_en;
      this.selected_name_zh = this.distributors[this.selected_index].name_zh;
      this.selected_note = this.distributors[this.selected_index].note;
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
