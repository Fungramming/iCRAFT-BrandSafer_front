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
        :items="blacklists"
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
            <td class="text-xs-left">{{ props.item.app }}</td>
            <td class="text-xs-left">{{ props.item.blType }}</td>
            <td class="text-xs-left" @click="linkPushToken"><a>{{ props.item.pushToken }}</a></td>
            <td class="text-xs-left">{{ props.item.delYN }}</td>
            <td class="text-xs-left">{{ props.item.dtRegistered }}</td>
            <td class="text-xs-left">{{ props.item.dtModified}}</td>
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
    <v-flex d-flex xs12 sm12 md12>
      <modal :width="modal_size" :height="modal_size" name="blacklist" transition="pop-out">
        <v-card tile>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click.native="closeModal">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>블랙리스트 App</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.stop="addDatas">등록</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="card-left">
          <v-card-text>
            <v-list three-line subheader>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">푸시토큰</label>
                <input v-model="submitData.pushToken" class="input-text" type="text" required="required">
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
        { text: "App명", align: "left", value: "app", sortable: false },
        {
          text: "제품 타입",
          align: "left",
          value: "blType",
          sortable: false
        },
        {
          text: "푸시토큰",
          align: "left",
          value: "pushToken",
          sortable: false
        },
        { text: "유형", align: "left", value: "delYN", sortable: false },
        {
          text: "등록일",
          align: "left",
          value: "dtRegistered",
          sortable: false
        },
        { text: "변경일", align: "left", value: "dtModified", sortable: false },
        { text: "변경자", align: "left", value: "modifier", sortable: false }
      ],
      blacklists: [],
      submitData: {
        blType: "C",
        delYN: "Y",
        dtModified: this.$store.state.submitTime,
        dtRegistered: this.$store.state.submitTime,
        modifier: this.$store.state.user.modifier,
        pushToken: "",
        registrant: this.$store.state.user.modifier
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
    getTotal(this);
  },
  mounted() {
    this.getDatas();
  },
  methods: {
    getDatas() {
      this.$store.dispatch(Constant.FETCH_BLACKLIST).then(resp => {
        this.blacklists = resp.data.blacklists.reverse();
        this.total = this.blacklists.length;
        this.dateFormat();
      });
    },
    dateFormat() {
      let blacklists = this.blacklists;
      for (let item in blacklists) {
        let date = new Date(blacklists[item].dtRegistered);
        let date_2 = new Date(blacklists[item].dtModified);
        let formatDate = date.toLocaleDateString();
        let formatDate_2 = date_2.toLocaleDateString();
        blacklists[item].dtRegistered = formatDate;
        blacklists[item].dtModified = formatDate_2;
      }
    },
    addDatas() {
      this.$store
        .dispatch(Constant.ADD_BLACKLIST, this.submitData)
        .then(resp => {
          console.log("resp :", resp);
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
    },
    deleteDatas() {
      for (let item in this.selected) {
        console.log("this.selected[item].idx :", this.selected[item].idx);
        this.$store
          .dispatch(Constant.DELETE_BLACKLIST, this.selected[item].idx)
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
      this.$modal.show("blacklist");
    },
    closeModal() {
      let vModal = this.$children[1];
      vModal.visible = false;
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.blacklists.slice();
    },
    linkPushToken() {
      let _this = this;
      function test() {
        _this.$router.push({ name: "lookup" });
        return _this.$store.commit(Constant.PUSH_APP, _this.selected[0]);
      }
      setTimeout(test, 10);
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
