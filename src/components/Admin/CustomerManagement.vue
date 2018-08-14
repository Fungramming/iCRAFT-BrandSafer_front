<template>
  <div class="tableBs">
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
            <!-- <td>
              <v-checkbox
                :input-value="props.selected"
                primary
                hide-details
              ></v-checkbox>
            </td> -->
            <td class="text-xs-left">{{ total - props.index - (pagination.page -1)* pagination.rowsPerPage }}</td>
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
            <!-- <option value="-1">All</option> -->
          </select>
        </div>
      </div>

      <span class="bottom-total">전체건수 : <span class="bottom-total-result">{{total}}</span> 건</span>
      <div class="bottom-contents-wrap">
        <v-layout row wrap btn-group>
          <!-- <v-flex d-flex xs12 sm12 md1 offset-md10>
            <v-btn color="error" dark @click.stop="deleteDatas">삭제</v-btn>
          </v-flex> -->
          <v-flex d-flex xs12 sm12 md1 offset-md11>
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
          <v-btn icon dark @click.native="closeModal">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>고객사 등록</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.stop="addDatas">저장</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="card-left">
          <v-card-text>
            <v-list three-line subheader>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">고객사코드
                  <span class="text-danger">*</span>
                </label>
                <input v-model="submitData.code" class="input-text require-input" type="text" required="required" placeholder="고객사코드" maxlength="6">
                <span class="required-notice">*필수 입력사항입니다.</span>
              </v-flex>    
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">고객사(한국어)
                  <span class="text-danger">*</span>
                </label>
                <input v-model="submitData.name_kr" class="input-text require-input" type="text" required="required" placeholder="고객사(한국어)">
                <span class="required-notice">*필수 입력사항입니다.</span>
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">고객사(영어)</label>
                <input v-model="submitData.name_en" class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">고객사(중국어)</label>
                <input v-model="submitData.name_zh" class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">주소(한국어)
                  <span class="text-danger">*</span>
                </label>
                <input v-model="submitData.addr_kr" class="input-text require-input" type="text" required="required" placeholder="주소(한국어)">
                <span class="required-notice">*필수 입력사항입니다.</span>
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">주소(영어)</label>
                <input v-model="submitData.addr_en" class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">주소(중국어)</label>
                <input v-model="submitData.addr_zh" class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">전화번호</label>
                <span class="selectbox">
                  <select id="telephone1" v-model="firstNum_tel" class="form-control" name="telephone1">
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
                <input v-model="midNum_tel" class="input-text input-tel" type="tel" maxlength="4">
                <input v-model="lastNum_tel" class="input-text input-tel" type="tel" maxlength="4">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">팩스번호</label>
                <span class="selectbox">
                  <select id="telephone1" v-model="firstNum_fax" class="form-control" name="telephone1">
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
                <input v-model="midNum_fax" class="input-text input-tel" type="tel" maxlength="4">
                <input v-model="lastNum_fax" class="input-text input-tel" type="tel" maxlength="4">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">대표자(한국어)
                  <span class="text-danger">*</span>
                </label>
                <input v-model="submitData.delegator_kr" class="input-text require-input" type="text" required="required" placeholder="대표자(한국어)">
                <span class="required-notice">*필수 입력사항입니다.</span>
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">대표자(영어)</label>
                <input v-model="submitData.delegator_en" class="input-text" type="text" required="required">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">대표자(중국어)</label>
                <input v-model="submitData.delegator_zh" class="input-text" type="text" required="required">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title input-mr">사업자등록번호
                  <span class="text-danger">*</span>
                </label>
                <input v-model="firstNum_ragi" class="input-text input-tri require-input" type="tel" maxlength="3">
                <input v-model="midNum_ragi" class="input-text input-tri require-input" type="tel" maxlength="2">
                <input v-model="lastNum_ragi" class="input-text input-tri require-input" type="tel" maxlength="5">
                <span class="required-notice">*필수 입력사항입니다.</span>
              </v-flex>
              <!-- <v-flex d-flex xs12 sm12 md5>
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
              </v-flex> -->
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">URL
                  <span class="text-danger">*</span>
                </label>
                <input v-model="submitData.url" class="input-text require-input" type="text" required="required">
                <span class="required-notice">*필수 입력사항입니다.</span>
              </v-flex>
              <!-- <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">TnT로고이미지
                  <span class="text-danger">*</span>
                </label>
                <input class="input-file" type="file" required="required">
                <span class="file-txt">(사용가능한 파일 형식 : jpg, gif, png)</span>
              </v-flex> -->
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">설명(한국어)
                  <span class="text-danger">*</span>
                </label>
                <input v-model="submitData.description_kr" class="input-text require-input" type="text" required="required" placeholder="설명(한국어)">
                <span class="required-notice">*필수 입력사항입니다.</span>
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">설명(영어)</label>
                <input v-model="submitData.description_en" class="input-text" type="text" required="required">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">설명(중국어)</label>
                <input v-model="submitData.description_zh" class="input-text" type="text" required="required">
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


    <!-- modal edit -->
    <v-flex d-flex xs12 sm12 md12>
      <modal :width="modal_size" :height="modal_size_height" name="customer_edit" transition="pop-out">
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
                <label class="input-title">고객사코드
                  <span class="text-danger">*</span>
                </label>
                <input v-model="updateData.code" class="input-text not-allowed" type="text" required="required" placeholder="고객사코드" disabled>
              </v-flex>    
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">고객사(한국어)
                  <span class="text-danger">*</span>
                </label>
                <input v-model="updateData.name_kr" class="input-text not-allowed" type="text" required="required" placeholder="고객사(한국어)" disabled>
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">고객사(영어)</label>
                <input v-model="updateData.name_en" class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">고객사(중국어)</label>
                <input v-model="updateData.name_zh" class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">주소(한국어)
                  <span class="text-danger">*</span>
                </label>
                <input v-model="updateData.addr_kr" class="input-text require-input" type="text" required="required" placeholder="주소(한국어)">
                <span class="required-notice">*필수 입력사항입니다.</span>
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">주소(영어)</label>
                <input v-model="updateData.addr_en" class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">주소(중국어)</label>
                <input v-model="updateData.addr_zh" class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">전화번호</label>
                <input v-model="updateData.telephone" class="input-text" type="tel" maxlength="13">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">팩스번호</label>
                <input v-model="updateData.fax" class="input-text" type="tel" maxlength="13">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">대표자(한국어)
                  <span class="text-danger">*</span>
                </label>
                <input v-model="updateData.delegator_kr" class="input-text require-input" type="text" required="required" placeholder="대표자(한국어)">
                <span class="required-notice">*필수 입력사항입니다.</span>
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">대표자(영어)</label>
                <input v-model="updateData.delegator_en" class="input-text" type="text" required="required">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">대표자(중국어)</label>
                <input v-model="updateData.delegator_zh" class="input-text" type="text" required="required">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">사업자등록번호
                  <span class="text-danger">*</span>
                </label>
                <input v-model="updateData.registrationNumber" class="input-text require-input" type="text">
                <span class="required-notice">*필수 입력사항입니다.</span>
              </v-flex>
              <!-- <v-flex d-flex xs12 sm12 md5>
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
              </v-flex> -->
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">URL
                  <span class="text-danger">*</span>
                </label>
                <input v-model="updateData.url" class="input-text require-input" type="text" required="required">
                <span class="required-notice">*필수 입력사항입니다.</span>
              </v-flex>
              <!-- <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">TnT로고이미지
                  <span class="text-danger">*</span>
                </label>
                <input class="input-file" type="file" required="required">
                <span class="file-txt">(사용가능한 파일 형식 : jpg, gif, png)</span>
              </v-flex> -->
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">설명(한국어)
                  <span class="text-danger">*</span>
                </label>
                <input v-model="updateData.description_kr" class="input-text require-input" type="text" required="required" placeholder="설명(한국어)">
                <span class="required-notice">*필수 입력사항입니다.</span>
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">설명(영어)</label>
                <input v-model="updateData.description_en" class="input-text" type="text" required="required">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">설명(중국어)</label>
                <input v-model="updateData.description_zh" class="input-text" type="text" required="required">
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
import { checkRequired } from "../CompHelper.js";

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

      // For submit
      firstNum_tel: "",
      midNum_tel: "",
      lastNum_tel: "",
      firstNum_fax: "",
      midNum_fax: "",
      lastNum_fax: "",
      firstNum_ragi: "",
      midNum_ragi: "",
      lastNum_ragi: "",

      // add
      submitData: {
        addr_en: "",
        addr_kr: "",
        addr_zh: "",
        businessRegistrationUrl: "",
        ci: "",
        code: "",
        delegator_en: "",
        delegator_kr: "",
        delegator_zh: "",
        description_en: "",
        description_kr: "",
        description_zh: "",
        dtModified: this.$store.state.submitTime,
        dtRegistered: this.$store.state.submitTime,
        fax: "",
        modifier: this.$store.state.user.modifier,
        name_en: "",
        name_kr: "",
        name_zh: "",
        note: "1",
        registrant: this.$store.state.user.modifier,
        registrationNumber: "",
        state: "Registered",
        telephone: "",
        tntLogoImgUrl: null,
        url: ""
      },
      // update
      updateIndex: "",
      updateData: {
        // addr_en: "Republic of korea",
        // addr_kr: "전현우123",
        // addr_zh: "Republic of korea",
        // businessRegistrationUrl: "",
        // ci: "",
        // delegator_en: "Kang",
        // delegator_kr: "wd",
        // delegator_zh: "Kang",
        // description_en: "",
        // description_kr: "",
        // description_zh: "",
        // dtModified: "2018-03-03 14:00:00",
        // dtRegistered: "2018-03-03 14:00:00",
        // fax: "02-0000-0000",
        // modifier: "ibjung",
        // name_en: "Blackyak",
        // name_kr: "abc123",
        // name_zh: "Blackyak",
        // note: "123",
        // registrant: "ibjung",
        // registrationNumber: "0000000000",
        // state: "Registered",
        // telephone: "8888888888",
        // tntLogoImgUrl: null,
        // url: "www.naver.com"
        addr_en: "",
        addr_kr: "",
        addr_zh: "",
        businessRegistrationUrl: "",
        ci: "",
        // code: "",
        delegator_en: "",
        delegator_kr: "",
        delegator_zh: "",
        description_en: "",
        description_kr: "",
        description_zh: "",
        dtModified: this.$store.state.submitTime,
        dtRegistered: "",
        fax: "",
        modifier: this.$store.state.user.modifier,
        name_en: "",
        name_kr: "",
        name_zh: "",
        note: "1",
        registrant: "",
        registrationNumber: "",
        state: "Registered",
        telephone: "",
        tntLogoImgUrl: null,
        url: ""
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

    if (this.firstNum_tel && this.midNum_tel && this.lastNum_tel) {
      this.submitData.telephone =
        this.firstNum_tel + "-" + this.midNum_tel + "-" + this.lastNum_tel;
    }
    if (this.firstNum_fax && this.midNum_fax && this.lastNum_fax) {
      this.submitData.fax =
        this.firstNum_fax + "-" + this.midNum_fax + "-" + this.lastNum_fax;
    }
    if (this.firstNum_ragi && this.midNum_ragi && this.lastNum_ragi) {
      this.submitData.registrationNumber =
        this.firstNum_ragi + this.midNum_ragi + this.lastNum_ragi;
    }
  },
  mounted() {
    this.getDatas();
  },
  methods: {
    addDatas() {
      checkRequired();
      if (
        this.submitData.code &&
        this.submitData.name_kr &&
        this.submitData.addr_kr &&
        this.submitData.delegator_kr &&
        this.submitData.url &&
        this.submitData.description_kr
      ) {
        this.$store
          .dispatch(Constant.ADD_COMPANY, this.submitData)
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
      }
    },
    getDatas() {
      this.$store.dispatch(Constant.FETCH_COMPANY).then(resp => {
        this.customers = resp.data.company.reverse();
        this.total = this.customers.length;
      });
    },
    updateDatas({ idx, app }) {
      idx = this.updateIndex;
      app = this.updateData;
      console.log("idx :", idx);
      console.log("app :", app);
      this.$store
        .dispatch(Constant.UPDATE_COMPANY, {
          cid: idx,
          customer: app
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
        console.log("item :", item);
        this.$store
          .dispatch(Constant.DELETE_COMPANY, this.selected[item].idx)
          .then(() => {
            this.getDatas();
          });
      }
      this.$store.commit(Constant.SHOW_MODAL, {
        isModal: true,
        modalText: "삭제 되었습니다."
      });
    },
    // getTotal() {
    //   let update_total = this.$children[0].$children[1].searchLength;
    //   console.log("update_total :", update_total);
    //   this.total = update_total;

    //   // 1
    //   let pageNum = this.$children[0].$children[3].value - 1;
    //   // let pageActiveText = this.$children[0].$children[4].value;
    //   // 10
    //   let pageActiveText = this.$children[0].$children[1].$children[0].value;
    //   let calPage = pageNum * pageActiveText;
    //   this.total_index = calPage;
    // },
    showModal() {
      this.$modal.show("customer");
    },
    closeModal() {
      let vModal = this.$children[1];
      let vModalEdit = this.$children[2];

      if (vModal.visible) vModal.visible = false;
      else if (vModalEdit.visible) vModalEdit.visible = false;
    },
    showEditModal(e) {
      this.$modal.show("customer_edit");
      this.selected_index = e.target.parentNode.parentNode["sectionRowIndex"];

      // this.updateData.code = e.path[2].children[3].innerText;
      // this.updateData.name_kr = e.path[2].children[2].innerText;
      // this.selected_name_kr = e.path[2].children[2].innerText;
      // this.updateData.code = this.$children[0].$children[1].filteredItems[
      //   this.selected_index
      // ].code;
      this.updateData.name_kr = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].name_kr;
      this.updateData.name_en = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].name_en;
      this.updateData.name_zh = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].name_zh;

      this.updateData.addr_kr = e.path[2].children[4].innerText;
      this.updateData.addr_en = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].addr_en;
      this.updateData.addr_zh = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].addr_zh;

      this.updateData.delegator_kr = e.path[2].children[5].innerText;

      this.updateData.telephone = e.path[2].children[6].innerText;
      // let telephone = this.selected_telephone.split("-");
      // this.selected_telephone_1 = telephone[1];
      // this.selected_telephone_2 = telephone[2];

      this.updateData.fax = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].fax;
      // this.updateData.dtModified = this.$children[0].$children[1].filteredItems[
      //   this.selected_index
      // ].dtModified;
      this.updateData.dtRegistered = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].dtRegistered;
      // this.updateData.modifier = this.$children[0].$children[1].filteredItems[
      //   this.selected_index
      // ].modifier;
      this.updateData.registrant = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].registrant;
      // let fax = this.selected_fax.split("-");
      // this.selected_fax_1 = fax[1];
      // this.selected_fax_2 = fax[2];

      this.updateData.description_kr = this.customers[
        this.selected_index
      ].description_kr;
      this.updateData.description_en = this.customers[
        this.selected_index
      ].description_en;
      this.updateData.description_zh = this.customers[
        this.selected_index
      ].description_zh;

      this.updateData.delegator_kr = this.customers[
        this.selected_index
      ].delegator_kr;
      this.updateData.delegator_en = this.customers[
        this.selected_index
      ].delegator_en;
      this.updateData.delegator_zh = this.customers[
        this.selected_index
      ].delegator_zh;

      this.updateData.url = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].url;
      this.updateData.registrationNumber = this.customers[
        this.selected_index
      ].registrationNumber;

      // find index
      this.updateIndex = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].idx;
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.customers.slice();
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
