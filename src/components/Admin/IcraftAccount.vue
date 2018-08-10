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
        :items="account"
        :search="search"
        :pagination.sync="pagination"
        v-model="selected"
        item-key="name"
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
            <td class="text-xs-left">{{ props.item.role }}</td>
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left"><a @click.stop="showEditModal">{{ props.item.id }}</a></td>
            <td class="text-xs-left">{{ props.item.department }}</td>
            <td class="text-xs-left">{{ props.item.dtLastConnected }}</td>
            <td class="text-xs-left">{{ props.item.state }}</td>
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
      <modal :width="modal_size" :height="modal_size" name="account" transition="pop-out">
        <v-card tile>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>iCraft 계정관리</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="addDatas">저장</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="card-left">
          <v-card-text>
            <v-list three-line subheader>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">권한
                  <span class="text-danger">*</span>
                </label>
                <span class="selectbox selectbox-100">
                  <select v-model="submitData.role" id="telephone1" class="form-control" name="telephone1">
                    <option selected value="10">iCraft 관리자</option>
                    <option value="11">iCraft 사용자</option>
                  </select>
                </span>
              </v-flex>    
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">이름
                  <span class="text-danger">*</span>
                </label>
                <input v-model="submitData.name" class="input-text" type="text" required="required">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">아이디
                  <span class="text-danger">*</span>
                </label>
                <input v-model="submitData.id" class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">비밀번호
                  <span class="text-danger">*</span>
                </label>
                <input v-model="submitData.pwd" class="input-text" type="password" placeholder="( * 5~15자 이내의 영/숫자 조합 )">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">비밀번호 확인
                  <span class="text-danger">*</span>
                </label>
                <input v-model="checkPwd" class="input-text" type="password">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">이메일</label>
                <input v-model="first_mail" class="input-text input-mail" type="mail">
                <span class="selectbox selectbox-mail">
                  <select v-model="last_mail" id="mail1" class="form-control" name="mail1">
                    <option value="">직접입력</option>
                    <option value="naver.com">naver.com</option>
                    <option value="daum.net">daum.net</option>
                    <option value="gmail.com">gmail.com</option>
                    <option value="nate.com">nate.com</option>
                  </select>
                </span>
                <input v-model="last_mail" class="input-text input-mail" type="mail">
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
                <label class="input-title">핸드폰번호</label>
                <span class="selectbox">
                  <select id="telephone1" v-model="firstNum_phone" class="form-control" name="telephone1">
                    <option value="010">010</option>
                    <option value="011">011</option>
                    <option value="016">016</option>
                    <option value="017">017</option>
                    <option value="018">018</option>
                    <option value="019">019</option>
                  </select>
                </span>
                <input v-model="midNum_phone" class="input-text input-tel" type="tel" maxlength="4">
                <input v-model="lastNum_phone" class="input-text input-tel" type="tel" maxlength="4">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">직위</label>
                <input v-model="submitData.position" class="input-text" type="text" required="required">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">부서</label>
                <input v-model="submitData.department" class="input-text" type="text" required="required">
              </v-flex>
            </v-list>
          </v-card-text>
        </div>
      </v-card>
      </modal>
    </v-flex>

    <!-- modal edit -->
    <v-flex d-flex xs12 sm12 md12>
      <modal :width="modal_size" :height="modal_size_height" name="account_edit" transition="pop-out">
        <v-card tile>
        <v-toolbar card dark color="primary">
          <v-toolbar-title>iCraft 수정</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat>수정</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="card-left">
          <v-card-text>
            <v-list three-line subheader>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">권한
                  <span class="text-danger">*</span>
                </label>
                <span class="selectbox selectbox-100">
                  <select id="telephone1" class="form-control" name="telephone1">
                    <option value="10">iCraft 관리자</option>
                    <option value="11">iCraft 사용자</option>
                  </select>
                </span>
              </v-flex>    
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">이름
                  <span class="text-danger">*</span>
                </label>
                <input :value="selected_name" class="input-text" type="text" required="required">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">아이디
                  <span class="text-danger">*</span>
                </label>
                <input :value="selected_id" class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">비밀번호
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text" type="password" placeholder="( * 5~15자 이내의 영/숫자 조합 )" maxlength="15">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">비밀번호 확인
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text" type="password" placeholder="* 비밀번호 확인" maxlength="15">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">이메일</label>
                <input :value="selected_email_1" class="input-text input-mail" type="mail">
                <span class="selectbox selectbox-mail">
                  <select id="mail1" class="form-control" name="mail1">
                    <option value="">직접입력</option>
                    <option value="naver.com">naver.com</option>
                    <option value="daum.net">daum.net</option>
                    <option value="gmail.com">gmail.com</option>
                    <option value="nate.com">nate.com</option>
                  </select>
                </span>
                <input :value="selected_email_2" class="input-text input-mail" type="mail">
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
                <label class="input-title">핸드폰번호</label>
                <span class="selectbox">
                  <select id="telephone1" class="form-control" name="telephone1">
                    <option value="010">010</option>
                    <option value="011">011</option>
                    <option value="016">016</option>
                    <option value="017">017</option>
                    <option value="018">018</option>
                    <option value="019">019</option>
                  </select>
                </span>
                <input :value="selected_phone_1" class="input-text input-tel" type="tel" maxlength="4">
                <input :value="selected_phone_2" class="input-text input-tel" type="tel" maxlength="4">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">직위</label>
                <input :value="selected_position" class="input-text" type="text" required="required">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">부서</label>
                <input :value="selected_department" class="input-text" type="text" required="required">
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
      search: "",
      modal_size: Constant.MODAL_SIZE,
      modal_size_height: Constant.MODAL_SIZE_HEIGHT,
      pagination: {
        // page: 1
        rowsPerPage: 10
      },
      total: "",
      total_index: "",
      selected: [],
      headers: [
        { text: "번호", align: "left", value: "idx", sortable: false },
        { text: "구분", align: "left", value: "role", sortable: false },
        { text: "이름", align: "left", value: "name", sortable: false },
        { text: "아이디", align: "left", value: "id", sortable: false },
        { text: "부서", align: "left", value: "department", sortable: false },
        {
          text: "최종 로그인",
          align: "left",
          value: "dtLastConnected",
          sortable: false
        },
        { text: "상태", align: "left", value: "state", sortable: false }
      ],
      account: [],
      // account: {}

      // For edit modal
      selected_index: "",
      selected_email: "",
      selected_email_1: "",
      selected_email_2: "",
      selected_phone: "",
      selected_phone_1: "",
      selected_phone_2: "",
      selected_telephone: "",
      selected_telephone_1: "",
      selected_telephone_2: "",
      selected_position: "",
      selected_role: "",
      selected_name: "",
      selected_id: "",
      selected_department: "",
      selected_state: "",

      // For submit
      firstNum_tel: "",
      midNum_tel: "",
      lastNum_tel: "",
      firstNum_phone: "",
      midNum_phone: "",
      lastNum_phone: "",
      first_mail: "",
      last_mail: "",
      checkPwd: "",

      submitData: {
          department: "",
          // ?
          dtLastConnected: "",
          dtModified: this.$store.state.submitTime,
          dtRegistered: this.$store.state.submitTime,
          email: "",
          failCount: 0,
          id: "",
          modifier: "",
          name: "",
          note: "",
          phone: "",
          position: "",
          // ?
          pwd: "",
          registrant: this.$store.state.user.modifier,
          role: "",
          state: "Registered",
          telephone: ""
      }
    };
  },
  watch: {
    checkPwd () {
      if ( this.checkPwd !== this.submitData.pwd ) {
        alert('비밀번호를 다시 확인해 주세요')
      }
    }
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
    if (this.firstNum_tel && this.midNum_tel && this.lastNum_tel) {
      this.submitData.telephone =
        this.firstNum_tel + "-" + this.midNum_tel + "-" + this.lastNum_tel;
    }
    if (this.firstNum_phone && this.midNum_phone && this.lastNum_phone) {
      this.submitData.phone =
        this.firstNum_phone + "-" + this.midNum_phone + "-" + this.lastNum_phone;
    }
    if (this.first_mail && this.last_mail) {
      this.submitData.email =
        this.first_mail + "@" +this.last_mail;
    }
  },
  mounted() {
    this.getDatas();
    console.log('this.$store.state.user.modifier :', this.$store.state.user.modifier);
  },
  methods: {
    addDatas(){
      this.$store
        .dispatch(Constant.ADD_ICRAFT_USER, this.submitData)
        .then(resp => {
          console.log("resp :", resp);
        })
        .catch(err => {
          console.log("err :", err);
        });
    },
    getDatas() {
      this.$store.dispatch(Constant.FETCH_ICRAFT_USER).then(resp => {
        this.account = resp.data["icrf-users"].reverse();
        this.total = this.account.length;
      });
    },
    showModal() {
      this.$modal.show("account");
    },
    showEditModal(e) {
      this.$modal.show("account_edit");

      this.selected_index = e.target.parentNode.parentNode["sectionRowIndex"];

      this.selected_state = e.path[2].children[7].innerText;
      this.selected_department = e.path[2].children[5].innerText;
      this.selected_id = e.path[2].children[4].innerText;
      this.selected_name = e.path[2].children[3].innerText;
      this.selected_role = e.path[2].children[2].innerText;

      this.selected_email = this.account[this.selected_index].email;
      let email = this.selected_email.split("@");
      this.selected_email_1 = email[0];
      this.selected_email_2 = email[1];

      this.selected_phone = this.account[this.selected_index].phone;
      let phone = this.selected_phone.split("-");
      this.selected_phone_1 = phone[1];
      this.selected_phone_2 = phone[2];

      this.selected_telephone = this.account[this.selected_index].telephone;
      let telephone = this.selected_telephone.split("-");
      this.selected_telephone_1 = telephone[1];
      this.selected_telephone_2 = telephone[2];

      this.selected_position = this.account[this.selected_index].position;
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.account.slice();
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
