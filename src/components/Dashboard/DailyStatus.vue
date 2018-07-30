<template>
  <v-flex xs12 >
    <v-card>
      <v-card-text class="card-title">일간 현황 ({{this.$store.state.date.today}})</v-card-text>
    <div class="card-cont">
      <table>
        <thead>
          <th>인증수</th>
          <th>정품 | 공유하기</th>
          <th>가품 | 제보하기</th>
          <th>ETC</th>
        </thead>
        <tbody>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
        </tbody>
      </table>
    </div>
    </v-card>
    
  </v-flex>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.card-title {
  background-color: #f9f9f9;
  color: #646464;
  text-align: left;
  font-size: 1.2em;
  font-weight: 600;
}
.card-cont {
  padding: 10px;
  table {
    width: 100%;
    th {
      font-weight: 400;
    }
    tbody {
      font-weight: 600;
    }
  }
}
</style>
