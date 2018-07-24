<template>
  <div class="admin-customer">
    <div class="admin-customer-header">
      <h2>고객사 관리</h2>
    </div>
    <div class="admin-customer-top">
      <p>검색 조건</p>
      <span>검색어</span>
      <v-flex xs12 sm6 d-flex>
        <!-- <v-select class="input-select"
          :items="items"
          label="검색어"
          solo
        ></v-select> -->
        <v-select
          v-model="items"
          :items="items"
          :label="`${items[0]}`"
          persistent-hint
          return-object
          single-line
        ></v-select>
        <!-- <v-text-field
          single-line
          box
          clearable
        ></v-text-field> -->
        <input class="input-text" type="text">
      </v-flex>
    </div>
    <v-app id="inspire">
      <div>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
          :pagination.sync="pagination"
          v-model="selected"
          item-key="number"
          select-all
          hide-actions
          class="elevation-1"
        >
          <template slot="headerCell" slot-scope="props">
            <v-tooltip bottom>
              <span class="item-headers" slot="activator">
                {{ props.header.text }}
              </span>
              <span>
                {{ props.header.text }}
              </span>
            </v-tooltip>
          </template>
          <template slot="items" slot-scope="props">
            <td>
              <v-checkbox
                v-model="props.selected"
                primary
                hide-details
              ></v-checkbox>
            </td>
            <td class="text-xs-left">{{ props.item.number }}</td>
            <td class="text-xs-left">{{ props.item.customer }}</td>
            <td class="text-xs-right">{{ props.item.customer_code }}</td>
            <td class="text-xs-right">{{ props.item.address }}</td>
            <td class="text-xs-right">{{ props.item.exponent }}</td>
            <td class="text-xs-right">{{ props.item.call_number }}</td>
            <td class="text-xs-right">{{ props.item.date }}</td>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
        </div>
      </div>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // items: [
      //   { state: 'Florida', abbr: 'FL' },
      //   { state: 'Georgia', abbr: 'GA' },
      //   { state: 'Nebraska', abbr: 'NE' },
      //   { state: 'California', abbr: 'CA' },
      //   { state: 'New York', abbr: 'NY' }
      // ],
      items: ['고객사', '대표자'],
      search: '',
      pagination: {
        page: 1,
        rowsPerPage: 10,
      },
      selected: [],
      headers: [
        { text: '번호', align: 'left', value: '번호', sortable: false, },
        { text: '고객사', align: 'left', value: '고객사', sortable: false, },
        { text: '고객사코드', align: 'right', value: '고객사코드', sortable: false, },
        { text: '주소', align: 'right', value: '주소', sortable: false, },
        { text: '대표자', align: 'right', value: '대표자', sortable: false, },
        { text: '전화번호', align: 'right', value: '전화번호', sortable: false, },
        { text: '가입일자', align: 'right', value: '가입일자', sortable: false, }
      ],
      desserts: [
        {
          value: false,
          number: '1',
          customer: 159,
          customer_code: 6.0,
          address: 24,
          exponent: 4.0,
          call_number: '1%',
          date: '1%'
        },
        {
          value: false,
          number: '2',
          customer: 237,
          customer_code: 9.0,
          address: 37,
          exponent: 4.3,
          call_number: '1%',
          date: '1%'
        },
        {
          value: false,
          number: '3',
          customer: 262,
          customer_code: 16.0,
          address: 23,
          exponent: 6.0,
          call_number: '7%',
          date: '7%'
        },
        {
          value: false,
          number: '4',
          customer: 305,
          customer_code: 3.7,
          address: 67,
          exponent: 4.3,
          call_number: '8%',
          date: '8%'
        },
        {
          value: false,
          number: '5',
          customer: 356,
          customer_code: 16.0,
          address: 49,
          exponent: 3.9,
          call_number: '16%',
          date: '16%'
        },
        {
          value: false,
          number: '6',
          customer: 375,
          customer_code: 0.0,
          address: 94,
          exponent: 0.0,
          call_number: '0%',
          date: '0%'
        },
        {
          value: false,
          number: '7',
          customer: 392,
          customer_code: 0.2,
          address: 98,
          exponent: 0,
          call_number: '2%',
          date: '2%'
        },
        {
          value: false,
          number: '8',
          customer: 408,
          customer_code: 3.2,
          address: 87,
          exponent: 6.5,
          call_number: '45%',
          date: '45%'
        },
        {
          value: false,
          number: '9',
          customer: 452,
          customer_code: 25.0,
          address: 51,
          exponent: 4.9,
          call_number: '22%',
          date: '22%'
        },
        {
          value: false,
          number: '10',
          customer: 518,
          customer_code: 26.0,
          address: 65,
          exponent: 7,
          call_number: '6%',
          date: '6%'
        },
        {
          value: false,
          number: '11',
          customer: 159,
          customer_code: 6.0,
          address: 24,
          exponent: 4.0,
          call_number: '1%',
          date: '1%'
        },
        {
          value: false,
          number: '12',
          customer: 237,
          customer_code: 9.0,
          address: 37,
          exponent: 4.3,
          call_number: '1%',
          date: '1%'
        },
        {
          value: false,
          number: '13',
          customer: 262,
          customer_code: 16.0,
          address: 23,
          exponent: 6.0,
          call_number: '7%',
          date: '7%'
        },
        {
          value: false,
          number: '14',
          customer: 305,
          customer_code: 3.7,
          address: 67,
          exponent: 4.3,
          call_number: '8%',
          date: '8%'
        },
        {
          value: false,
          number: '15',
          customer: 356,
          customer_code: 16.0,
          address: 49,
          exponent: 3.9,
          call_number: '16%',
          date: '16%'
        },
        {
          value: false,
          number: '16',
          customer: 375,
          customer_code: 0.0,
          address: 94,
          exponent: 0.0,
          call_number: '0%',
          date: '0%'
        },
        {
          value: false,
          number: '17',
          customer: 392,
          customer_code: 0.2,
          address: 98,
          exponent: 0,
          call_number: '2%',
          date: '2%'
        },
        {
          value: false,
          number: '18',
          customer: 408,
          customer_code: 3.2,
          address: 87,
          exponent: 6.5,
          call_number: '45%',
          date: '45%'
        },
        {
          value: false,
          number: '19',
          customer: 452,
          customer_code: 25.0,
          address: 51,
          exponent: 4.9,
          call_number: '22%',
          date: '22%'
        },
        {
          value: false,
          number: '20',
          customer: 518,
          customer_code: 26.0,
          address: 65,
          exponent: 7,
          call_number: '6%',
          date: '6%'
        },
      ]
    }
  },
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  }
}
</script>

<style lang="scss" scoped>
  .admin-customer {
    &-header {
      text-align: left;
      h2 {
        font-weight: 500;
        color: #333;
      }
    }
    &-top {
      text-align: left;
      margin: 25px 0;
      padding: 25px;
      background-color: #fff;
      p, span {
        font-size: 16px;
        font-weight: 600;
      }
      .sm6 {
        max-width: 250px;
        .input-select {
          width: 50%;
        }
        .input-text {
          border: 1px solid #ccc;
          height: 50px;
          margin-left: 5px;
          // -webkit-box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
          // box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
        }
      }
    }
    #inspire {
      background: #fff;
      -webkit-box-shadow: 0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)!important;
      box-shadow: 0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)!important;
      height: 500px;
      .elevation-1 {
        -webkit-box-shadow: none !important;
        box-shadow: none !important;
        // .item-headers {
        //   font-weight: 700;
        //   font-size: 14px;
        //   color: #333;
        // }
      }
    }
  }
</style>


