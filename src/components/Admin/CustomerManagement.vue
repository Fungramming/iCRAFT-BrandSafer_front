<template>
  <div class="tableBs">
    <!-- table top menu -->
    <!-- <div class="tableBs-top">
      <p>검색 조건</p>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm12 md1>
          <div class="selectbox select-search">
            <span>검색어</span>
            <select id="select1" name="searchType" class="form-control" size="1">
              <option selected value="고객사">고객사</option>
              <option value="대표자">대표자</option>
            </select>
          </div>
        </v-flex>
        <v-flex d-flex xs12 sm12 md3>
          <input class="input-text" type="text" maxlength="40">
        </v-flex>
      </v-layout>
    </div> -->
    <!-- table wrap -->
    <v-app class="inspire">
      <v-card-title>
        검색조건
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
        :items="customers"
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
            <td class="text-xs-left"><a @click.stop="showEditModal"> {{ props.item.name_kr }} </a></td>
            <td class="text-xs-left">{{ props.item.code }}</td>
            <td class="text-xs-left">{{ props.item.addr_kr }}</td>
            <td class="text-xs-left">{{ props.item.delegator_kr }}</td>
            <td class="text-xs-left">{{ props.item.telephone }}</td>
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
          <option value="-1">All</option>
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
      <modal :width="modal_size" :height="modal_size_height" name="customer" transition="pop-out">
        <v-card tile>
        <v-toolbar card dark color="primary">
          <v-toolbar-title>고객사 등록</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat>저장</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="card-left">
          <v-card-text>
            <v-list three-line subheader>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">고객사코드
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text" type="text" required="required" placeholder="고객사코드">
              </v-flex>    
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">고객사(한국어)
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text" type="text" required="required" placeholder="고객사(한국어)">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">고객사(영어)</label>
                <input class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">고객사(중국어)</label>
                <input class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">주소(한국어)
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text" type="text" required="required" placeholder="주소(한국어)">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">주소(영어)</label>
                <input class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">주소(중국어)</label>
                <input class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">전화번호</label>
                <span class="selectbox">
                  <select id="telephone1" class="form-control" name="telephone1">
                    <option value="02">02</option>
                    <option value="031">031</option>
                    <option value="032">032</option>
                    <option value="033">033</option>
                    <option value="041">041</option>
                    <option value="042">042</option>
                    <option value="043">043</option>
                    <option value="044">044</option>
                    <option value="051">051</option>
                    <option value="052">052</option>
                    <option value="053">053</option>
                    <option value="054">054</option>
                    <option value="055">055</option>
                    <option value="061">061</option>
                    <option value="062">062</option>
                    <option value="063">063</option>
                    <option value="064">064</option>
                    <option value="070">070</option>
                    <option value="080">080</option>
                  </select>
                </span>
                <input class="input-text input-tel" type="tel" maxlength="4">
                <input class="input-text input-tel" type="tel" maxlength="4">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">팩스번호</label>
                <span class="selectbox">
                  <select id="telephone1" class="form-control" name="telephone1">
                    <option value="02">02</option>
                    <option value="031">031</option>
                    <option value="032">032</option>
                    <option value="033">033</option>
                    <option value="041">041</option>
                    <option value="042">042</option>
                    <option value="043">043</option>
                    <option value="044">044</option>
                    <option value="051">051</option>
                    <option value="052">052</option>
                    <option value="053">053</option>
                    <option value="054">054</option>
                    <option value="055">055</option>
                    <option value="061">061</option>
                    <option value="062">062</option>
                    <option value="063">063</option>
                    <option value="064">064</option>
                    <option value="070">070</option>
                    <option value="080">080</option>
                  </select>
                </span>
                <input class="input-text input-tel" type="tel" maxlength="4">
                <input class="input-text input-tel" type="tel" maxlength="4">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">대표자(한국어)
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text" type="text" required="required" placeholder="대표자(한국어)">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">대표자(영어)</label>
                <input class="input-text" type="text" required="required">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">대표자(중국어)</label>
                <input class="input-text" type="text" required="required">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title input-mr">사업자등록번호
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text input-tri" type="tel">
                <input class="input-text input-tri" type="tel">
                <input class="input-text input-tri" type="tel">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">사업자등록증
                  <span class="text-danger">*</span>
                </label>
                <input class="input-file" type="file" required="required">
                <span class="file-txt">(사용가능한 파일 형식 : jpg, gif, png)</span>
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">CI
                  <span class="text-danger">*</span>
                </label>
                <input class="input-file" type="file" required="required">
                <span class="file-txt">(사용가능한 파일 형식 : jpg, gif, png)</span>
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">URL
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text" type="text" required="required">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">TnT로고이미지
                  <span class="text-danger">*</span>
                </label>
                <input class="input-file" type="file" required="required">
                <span class="file-txt">(사용가능한 파일 형식 : jpg, gif, png)</span>
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">설명(한국어)
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text" type="text" required="required" placeholder="설명(한국어)">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">설명(영어)</label>
                <input class="input-text" type="text" required="required">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">설명(중국어)</label>
                <input class="input-text" type="text" required="required">
              </v-flex>
              <v-divider></v-divider>
              <v-subheader>계약 정보</v-subheader>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">계약서명
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text" type="text" required="required">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">계약기간
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text" type="text" required="required">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">사업자등록증
                  <span class="text-danger">*</span>
                </label>
                <input class="input-file" type="file" required="required">
                <span class="file-txt">(사용가능한 파일 형식 : pdf)</span>
              </v-flex>
            </v-list>
          </v-card-text>
        </div>
      </v-card>
      </modal>
    </v-flex>


    <!-- modal edit -->
    <v-flex d-flex xs12 sm12 md12>
      <modal :width="modal_size" :height="modal_size_height" name="customer_edit" transition="pop-out">
        <v-card tile>
        <v-toolbar card dark color="primary">
          <v-toolbar-title>고객사 수정</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat>수정</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="card-left">
          <v-card-text>
            <v-list three-line subheader>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">고객사코드
                  <span class="text-danger">*</span>
                </label>
                <input :value="selected_code" class="input-text" type="text" required="required" placeholder="고객사코드">
              </v-flex>    
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">고객사(한국어)
                  <span class="text-danger">*</span>
                </label>
                <input :value="selected_name_kr" class="input-text" type="text" required="required" placeholder="고객사(한국어)">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">고객사(영어)</label>
                <input :value="selected_name_en" class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">고객사(중국어)</label>
                <input :value="selected_name_zh" class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">주소(한국어)
                  <span class="text-danger">*</span>
                </label>
                <input :value="selected_addr_kr" class="input-text" type="text" required="required" placeholder="주소(한국어)">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">주소(영어)</label>
                <input :value="selected_addr_en" class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">주소(중국어)</label>
                <input :value="selected_addr_zh" class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">전화번호</label>
                <span class="selectbox">
                  <select id="telephone1" class="form-control" name="telephone1">
                    <option value="02">02</option>
                    <option value="031">031</option>
                    <option value="032">032</option>
                    <option value="033">033</option>
                    <option value="041">041</option>
                    <option value="042">042</option>
                    <option value="043">043</option>
                    <option value="044">044</option>
                    <option value="051">051</option>
                    <option value="052">052</option>
                    <option value="053">053</option>
                    <option value="054">054</option>
                    <option value="055">055</option>
                    <option value="061">061</option>
                    <option value="062">062</option>
                    <option value="063">063</option>
                    <option value="064">064</option>
                    <option value="070">070</option>
                    <option value="080">080</option>
                  </select>
                </span>
                <input :value="selected_telephone_1" class="input-text input-tel" type="tel" maxlength="4">
                <input :value="selected_telephone_2" class="input-text input-tel" type="tel" maxlength="4">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">팩스번호</label>
                <span class="selectbox">
                  <select id="telephone1" class="form-control" name="telephone1">
                    <option value="02">02</option>
                    <option value="031">031</option>
                    <option value="032">032</option>
                    <option value="033">033</option>
                    <option value="041">041</option>
                    <option value="042">042</option>
                    <option value="043">043</option>
                    <option value="044">044</option>
                    <option value="051">051</option>
                    <option value="052">052</option>
                    <option value="053">053</option>
                    <option value="054">054</option>
                    <option value="055">055</option>
                    <option value="061">061</option>
                    <option value="062">062</option>
                    <option value="063">063</option>
                    <option value="064">064</option>
                    <option value="070">070</option>
                    <option value="080">080</option>
                  </select>
                </span>
                <input :value="selected_fax_1" class="input-text input-tel" type="tel" maxlength="4">
                <input :value="selected_fax_2" class="input-text input-tel" type="tel" maxlength="4">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">대표자(한국어)
                  <span class="text-danger">*</span>
                </label>
                <input :value="selected_delegator_kr" class="input-text" type="text" required="required" placeholder="대표자(한국어)">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">대표자(영어)</label>
                <input :value="selected_delegator_en" class="input-text" type="text" required="required">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">대표자(중국어)</label>
                <input :value="selected_delegator_zh" class="input-text" type="text" required="required">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title input-mr">사업자등록번호
                  <span class="text-danger">*</span>
                </label>
                <input :value="selected_registrationNumber" class="input-text" type="text">
                <!-- <input class="input-text input-tri" type="tel">
                <input class="input-text input-tri" type="tel">
                <input class="input-text input-tri" type="tel"> -->
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">사업자등록증
                  <span class="text-danger">*</span>
                </label>
                <input class="input-file" type="file" required="required">
                <span class="file-txt">(사용가능한 파일 형식 : jpg, gif, png)</span>
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">CI
                  <span class="text-danger">*</span>
                </label>
                <input class="input-file" type="file" required="required">
                <span class="file-txt">(사용가능한 파일 형식 : jpg, gif, png)</span>
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">URL
                  <span class="text-danger">*</span>
                </label>
                <input :value="selected_url" class="input-text" type="text" required="required">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">TnT로고이미지
                  <span class="text-danger">*</span>
                </label>
                <input class="input-file" type="file" required="required">
                <span class="file-txt">(사용가능한 파일 형식 : jpg, gif, png)</span>
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">설명(한국어)
                  <span class="text-danger">*</span>
                </label>
                <input :value="selected_description_kr" class="input-text" type="text" required="required" placeholder="설명(한국어)">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">설명(영어)</label>
                <input :value="selected_description_en" class="input-text" type="text" required="required">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">설명(중국어)</label>
                <input :value="selected_description_zh" class="input-text" type="text" required="required">
              </v-flex>
              <!-- <v-divider></v-divider>
              <v-subheader>계약 정보</v-subheader>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">계약서명
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text" type="text" required="required">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">계약기간
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text" type="text" required="required">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">사업자등록증
                  <span class="text-danger">*</span>
                </label>
                <input class="input-file" type="file" required="required">
                <span class="file-txt">(사용가능한 파일 형식 : pdf)</span>
              </v-flex> -->
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
      search: "",
      modal_size: Constant.MODAL_SIZE,
      modal_size_height: Constant.MODAL_SIZE_HEIGHT,
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
          text: "고객사코드",
          align: "left",
          value: "code",
          sortable: false
        },
        { text: "주소", align: "left", value: "addr_kr", sortable: false },
        {
          text: "대표자",
          align: "left",
          value: "delegator_kr",
          sortable: false
        },
        {
          text: "전화번호",
          align: "left",
          value: "telephone",
          sortable: false
        },
        {
          text: "가입일자",
          align: "left",
          value: "dtRegistered",
          sortable: false
        }
      ],
      customers: [],

      // For edit modal
      selected_index: "",
      selected_code: "",
      selected_name_kr: "",
      selected_name_en: "",
      selected_name_zh: "",
      selected_addr_kr: "",
      selected_addr_en: "",
      selected_addr_zh: "",
      selected_fax: "",
      selected_fax_1: "",
      selected_fax_2: "",
      selected_telephone: "",
      selected_telephone_1: "",
      selected_telephone_2: "",
      selected_delegator_kr: "",
      selected_delegator_en: "",
      selected_delegator_zh: "",
      selected_description_kr: "",
      selected_description_en: "",
      selected_description_zh: "",
      selected_url: "",
      selected_registrationNumber: ""
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
      this.$store.dispatch(Constant.FETCH_COMPANY).then(resp => {
        this.customers = resp.data.company.reverse();
        console.log("this.customers :", this.customers);
        // console.log("this.customers.length :", this.customers.length);
        this.total = this.customers.length;
      });
    },
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
      this.$modal.show("customer");
      let modalWrap = document.getElementsByClassName("v--modal-box v--modal");
      // console.log("modalWrap :", typeof modalWrap);
      // for (let item in modalWrap) {
      //   console.log("item :", modalWrap[item]);
      // }
      // // modalWrap.childNodes.className = "overflow";
      // // modalWrap.childNodes.style.overflow = "scroll";
      // modalWrap.classList.add("overflow");
      console.log("modalWrap.style.overflow :", modalWrap.style);
      modalWrap.style.overflow = "scroll";
    },
    showEditModal(e) {
      this.$modal.show("customer_edit");

      this.selected_index = e.target.parentNode.parentNode["sectionRowIndex"];

      this.selected_code = e.path[2].children[3].innerText;
      this.selected_name_kr = e.path[2].children[2].innerText;
      this.selected_name_en = this.customers[this.selected_index].name_en;
      this.selected_name_zh = this.customers[this.selected_index].name_zh;

      this.selected_addr_kr = e.path[2].children[4].innerText;
      this.selected_addr_en = this.customers[this.selected_index].addr_en;
      this.selected_addr_zh = this.customers[this.selected_index].addr_zh;

      this.selected_delegator_kr = e.path[2].children[5].innerText;

      this.selected_telephone = e.path[2].children[6].innerText;
      let telephone = this.selected_telephone.split("-");
      this.selected_telephone_1 = telephone[1];
      this.selected_telephone_2 = telephone[2];

      this.selected_fax = this.customers[this.selected_index].fax;
      let fax = this.selected_fax.split("-");
      this.selected_fax_1 = fax[1];
      this.selected_fax_2 = fax[2];

      this.selected_description_kr = this.customers[
        this.selected_index
      ].description_kr;
      this.selected_description_en = this.customers[
        this.selected_index
      ].description_en;
      this.selected_description_zh = this.customers[
        this.selected_index
      ].description_zh;

      this.selected_delegator_kr = this.customers[
        this.selected_index
      ].delegator_kr;
      this.selected_delegator_en = this.customers[
        this.selected_index
      ].delegator_en;
      this.selected_delegator_zh = this.customers[
        this.selected_index
      ].delegator_zh;

      this.selected_url = this.customers[this.selected_index].url;
      this.selected_registrationNumber = this.customers[
        this.selected_index
      ].registrationNumber;
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.customers.slice();
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
