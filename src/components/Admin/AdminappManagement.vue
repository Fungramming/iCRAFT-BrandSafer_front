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
            <td class="text-xs-left">{{ total - props.index - total_index }}</td>
            <!-- <td class="text-xs-left">{{ props.item.idx }}</td> -->
            <td class="text-xs-left">{{ props.item.companyName }}</td>
            <td class="text-xs-left"><a @click.stop="showEditModal">{{ props.item.name }}</a></td>
            <td class="text-xs-left">{{ props.item.contact }}</td>
            <td class="text-xs-left">{{ props.item.pushToken }}</td>
            <td class="text-xs-left">{{ props.item.dtRegistered }}</td>
            <td class="text-xs-left">{{ props.item.state }}</td>
            <td class="text-xs-left">{{ props.item.dtModified }}</td>
            <td class="text-xs-left">{{ props.item.modifier }}</td>
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
          <v-flex d-flex xs12 sm12 md1 offset-md11>
            <v-btn color="error" dark @click.stop="deleteDatas">삭제</v-btn>
          </v-flex>
        </v-layout>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages" :total-visible="7"></v-pagination>
        </div>
      </div>
    </v-app>

    <!-- modal edit -->
    <v-flex d-flex xs12 sm12 md12>
      <modal :width="modal_size" :height="modal_size" name="adminapp_edit" transition="pop-out">
        <v-card tile>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click.native="closeModal">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>관리자App 수정</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat>수정</v-btn>
            <!-- <v-btn dark flat @click.native="tagtype_dialog_edit = false">수정</v-btn> -->
          </v-toolbar-items>
        </v-toolbar>
        <div class="card-left">
          <v-card-text>
            <v-list three-line subheader>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">회사명</label>
                <input v-model="updateData.companyName" class="input-text" type="text" required="required" placeholder="회사명">
              </v-flex>    
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">이름</label>
                <input v-model="updateData.name" class="input-text" type="text" required="required" placeholder="이름">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">연락처</label>
                <input v-model="updateData.contact" class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md3>
                <label class="input-title">상태</label>
                <input checked="checked" class="input-radio" type="radio" name="staus" value="등록">등록
                <input class="input-radio" type="radio" name="staus" value="승인">승인
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
        {
          text: "companyName",
          align: "left",
          value: "companyName",
          sortable: false
        },
        { text: "name", align: "left", value: "name", sortable: false },
        { text: "contact", align: "left", value: "contact", sortable: false },
        {
          text: "pushToken",
          align: "left",
          value: "pushToken",
          sortable: false
        },
        {
          text: "dtRegistered",
          align: "left",
          value: "dtRegistered",
          sortable: false
        },
        {
          text: "state",
          align: "left",
          value: "state",
          sortable: false
        },
        {
          text: "dtModified",
          align: "left",
          value: "dtModified",
          sortable: false
        },
        { text: "modifier", align: "left", value: "modifier", sortable: false }
      ],
      apps: [],

      // For edit modal
      selected_index: "",
      // selected_company: "",
      // selected_name: "",
      // selected_tel: "",

      // update
      updateData: {
        companyName: "",
        contact: "",
        dtModified: this.$store.state.submitTime,
        dtRegistered: "",
        modifier: "",
        name: "",
        pushToken: "",
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
  // watch: {
  //   app: function(e) {
  //     console.log("this.app :", this.app);
  //   }
  // },
  updated() {
    // let update_total = this.$children[0].$children[1].searchLength;
    // this.total = update_total;
    this.getTotal();
  },
  mounted() {
    this.getDatas();
    // console.log(
    //   "this.$children[0].$children[4] :",
    //   this.$children[0].$children[4].value
    // );
  },
  methods: {
    getDatas() {
      this.$store.dispatch(Constant.FETCH_ADMIN_APP).then(resp => {
        this.apps = resp.data.apps;
        this.total = this.apps.length;
      });
    },
    getTotal() {
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
      this.total = update_total;

      let pageNum = this.$children[0].$children[3].value - 1;
      console.log("pageNum :", pageNum);
      let pageActiveText = this.$children[0].$children[1].$children[1].value;
      console.log("pageActiveText :", pageActiveText);
      let calPage = pageNum * pageActiveText;
      this.total_index = calPage;
    },
    deleteDatas() {
      for (let item in this.selected) {
        this.$store
          .dispatch(Constant.DELETE_ADMIN_APP, this.selected[item].idx)
          .then(() => {
            this.getDatas();
          });
      }
      this.$store.commit(Constant.SHOW_MODAL, {
        isModal: true,
        modalText: "삭제 되었습니다."
      });
    },
    showEditModal(e) {
      this.$modal.show("adminapp_edit");

      this.selected_index = e.target.parentNode.parentNode["sectionRowIndex"];

      // let company = e.path[2].children[2].innerText;
      // let name = e.path[2].children[3].innerText;
      // let tel = e.path[2].children[4].innerText;

      // this.selected_company = company;
      // this.selected_name = name;
      // this.selected_tel = tel;

      this.updateData.companyName = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].companyName;
      this.updateData.name = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].name;
      this.updateData.contact = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].contact;
    },
    closeModal() {
      let vModal = this.$children[1];
      let vModalEdit = this.$children[2];

      if (vModal.visible) vModal.visible = false;
      else if (vModalEdit.visible) vModalEdit.visible = false;
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.apps.slice();
    },
    getSelected(e) {
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
