<template>
  <div class="tableBs">
    <!-- table top menu -->
    <!-- <div class="tableBs-top">
      <p>검색 조건</p>
      <v-layout row wrap>
        <v-flex mb0 d-flex xs12 sm12 md4>
          <div class="selectbox">
            <span>제품 타입</span>
            <select id="select1" name="searchType" class="form-control" size="1">
              <option selected value="전체">전체</option>
              <option value="홀로태그">홀로태그</option>
              <option value="홀로태그 + QR">홀로태그 + QR</option>
              <option value="하이브리드태그">하이브리드태그</option>
              <option value="난수태그">난수태그</option>
              <option value="SQR태그">SQR태그</option>
            </select>
          </div>
        </v-flex>
        <v-flex mb0 d-flex xs12 sm12 md4>
          <div class="selectbox">
            <span>상태</span>
            <select id="select2" name="searchType" class="form-control" size="1">
              <option selected value="전체">전체</option>
              <option value="서비스">서비스</option>
              <option value="삭제">삭제</option>
            </select>
          </div>
        </v-flex>
        <v-flex mb0 d-flex xs12 sm12 md4>
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
            <td class="text-xs-left">{{ props.item.idx }}</td>
            <td class="text-xs-left"><a @click.stop="showEditModal"> {{ props.item.version }} </a></td>
            <td class="text-xs-left">{{ props.item.type }}</td>
            <td class="text-xs-left">{{ props.item.width }} * {{ props.item.height }}</td>
            <td class="text-xs-left">{{ props.item.state }}</td>
            <td class="text-xs-left">{{ props.item.registrant }}</td>
            <td class="text-xs-left">{{ props.item.dtRegistered }}</td>
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

    <!-- <v-flex d-flex xs12 sm12 md12>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card tile>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>태그타입 관리</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="dialog = false">저장</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="card-left">
          <v-card-text>
            <v-list three-line subheader>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">버전
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text" type="text" required="required">
              </v-flex>    
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">태그타입
                  <span class="text-danger">*</span>
                </label>
                <span class="selectbox selectbox-100">
                  <select id="select1" name="searchType" class="form-control" size="1">
                    <option selected value="홀로태그">홀로태그</option>
                    <option value="홀로태그 + QR">홀로태그 + QR</option>
                    <option value="하이브리드태그">하이브리드태그</option>
                    <option value="난수태그">난수태그</option>
                    <option value="SQR태그">SQR태그</option>
                  </select>
                </span>
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">사이즈
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text input-size" type="text" placeholder="width">
                <input class="input-text input-size" type="text" placeholder="height">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">설명</label>
                <input class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">노트</label>
                <input class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md3>
                <label class="input-title">상태</label>
                <input checked="checked" class="input-radio" type="radio" name="staus" value="서비스">서비스
                <input class="input-radio" type="radio" name="staus" value="사용정지">사용정지
              </v-flex>
            </v-list>
          </v-card-text>
        </div>
      </v-card>
    </v-dialog>
    </v-flex> -->

    <!-- <v-flex d-flex xs12 sm12 md12>
    <v-dialog
      v-model="dialog_edit"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card tile>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click.native="dialog_edit = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>태그타입 관리</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="dialog_edit = false">수정</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="card-left">
          <v-card-text>
            <v-list three-line subheader>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">버전
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text" type="text" required="required">
              </v-flex>    
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">태그타입
                  <span class="text-danger">*</span>
                </label>
                <span class="selectbox selectbox-100">
                  <select id="select1" name="searchType" class="form-control" size="1">
                    <option selected value="홀로태그">홀로태그</option>
                    <option value="홀로태그 + QR">홀로태그 + QR</option>
                    <option value="하이브리드태그">하이브리드태그</option>
                    <option value="난수태그">난수태그</option>
                    <option value="SQR태그">SQR태그</option>
                  </select>
                </span>
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">사이즈
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text input-size" type="text" placeholder="width">
                <input class="input-text input-size" type="text" placeholder="height">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">설명</label>
                <input class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">노트</label>
                <input class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md3>
                <label class="input-title">상태</label>
                <input checked="checked" class="input-radio" type="radio" name="staus" value="서비스">서비스
                <input class="input-radio" type="radio" name="staus" value="사용정지">사용정지
              </v-flex>
            </v-list>
          </v-card-text>
        </div>
      </v-card>
    </v-dialog>
    </v-flex> -->


    <!-- modal -->
    <v-flex d-flex xs12 sm12 md12>
      <modal :width="modal_size" :height="modal_size" name="tagtype" transition="pop-out">
        <v-card tile>
          <v-toolbar card dark color="primary">
            <v-toolbar-title>태그타입 관리</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat>등록</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <div class="card-left">
            <v-card-text>
              <v-list three-line subheader>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">버전
                    <span class="text-danger">*</span>
                  </label>
                  <input class="input-text" type="text" required="required">
                </v-flex>    
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">태그타입
                    <span class="text-danger">*</span>
                  </label>
                  <span class="selectbox selectbox-100">
                    <select id="select1" name="searchType" class="form-control" size="1">
                      <option selected value="홀로태그">홀로태그</option>
                      <option value="홀로태그 + QR">홀로태그 + QR</option>
                      <option value="하이브리드태그">하이브리드태그</option>
                      <option value="난수태그">난수태그</option>
                      <option value="SQR태그">SQR태그</option>
                    </select>
                  </span>
                </v-flex>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">사이즈
                    <span class="text-danger">*</span>
                  </label>
                  <input class="input-text input-size" type="text" placeholder="width">
                  <input class="input-text input-size" type="text" placeholder="height">
                </v-flex>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">설명</label>
                  <input class="input-text" type="text">
                </v-flex>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">노트</label>
                  <input class="input-text" type="text">
                </v-flex>
                <v-flex d-flex xs12 sm12 md3>
                  <label class="input-title">상태</label>
                  <input checked="checked" class="input-radio" type="radio" name="staus" value="서비스">서비스
                  <input class="input-radio" type="radio" name="staus" value="사용정지">사용정지
                </v-flex>
              </v-list>
            </v-card-text>
          </div>
        </v-card>
      </modal>
    </v-flex>


    <!-- modal edit -->
    <v-flex d-flex xs12 sm12 md12>
      <modal :width="modal_size" :height="modal_size" name="tagtype_edit" transition="pop-out">
        <v-card tile>
          <v-toolbar card dark color="primary">
            <v-toolbar-title>태그타입 수정</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat>수정</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <div class="card-left">
            <v-card-text>
              <v-list three-line subheader>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">버전
                    <span class="text-danger">*</span>
                  </label>
                  <input class="input-text" type="text" required="required">
                </v-flex>    
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">태그타입
                    <span class="text-danger">*</span>
                  </label>
                  <span class="selectbox selectbox-100">
                    <select id="select1" name="searchType" class="form-control" size="1">
                      <option selected value="홀로태그">홀로태그</option>
                      <option value="홀로태그 + QR">홀로태그 + QR</option>
                      <option value="하이브리드태그">하이브리드태그</option>
                      <option value="난수태그">난수태그</option>
                      <option value="SQR태그">SQR태그</option>
                    </select>
                  </span>
                </v-flex>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">사이즈
                    <span class="text-danger">*</span>
                  </label>
                  <input class="input-text input-size" type="text" placeholder="width">
                  <input class="input-text input-size" type="text" placeholder="height">
                </v-flex>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">설명</label>
                  <input class="input-text" type="text">
                </v-flex>
                <v-flex d-flex xs12 sm12 md5>
                  <label class="input-title">노트</label>
                  <input class="input-text" type="text">
                </v-flex>
                <v-flex d-flex xs12 sm12 md3>
                  <label class="input-title">상태</label>
                  <input checked="checked" class="input-radio" type="radio" name="staus" value="서비스">서비스
                  <input class="input-radio" type="radio" name="staus" value="사용정지">사용정지
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
      selected: [],
      headers: [
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
      tag_type: []
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
    let update_total = this.$children[0].$children[1].searchLength;
    this.total = update_total;
  },
  mounted() {
    this.$store.dispatch(Constant.FETCH_TAG_TYPE).then(resp => {
      this.tag_type = resp.data.tag_type.reverse();
      // console.log("this.tag_type.length :", this.tag_type.length);
      this.total = this.tag_type.length;
    });
  },
  methods: {
    showModal() {
      this.$modal.show("tagtype");
    },
    showEditModal() {
      this.$modal.show("tagtype_edit");
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.tag_type.slice();
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
