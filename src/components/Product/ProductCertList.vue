<template>
  <section class="search">
    <h3>검색조건</h3>
    <v-layout row wrap align-center>
      <v-flex sm12 lg4 xl2>
        <select name="기간선택" id="">
          <option disabled="disabled" selected>기간선택</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </v-flex>
      <v-flex sm12 lg4 xl2>
        <v-select solo items="[1, 2, 3]" label="고객사"></v-select>
      </v-flex>
      <v-flex sm12 lg4 xl2>
        <v-select solo items="[1, 2, 3]" label="태그타입"></v-select>
      </v-flex>
      <v-flex sm12 lg4 xl2>
        <v-select solo items="[1, 2, 3]" label="OS"></v-select>
      </v-flex>
      <v-flex sm12 lg4 xl2>
        <v-select solo items="[1, 2, 3]" label="인증결과"></v-select>
      </v-flex>
      <v-flex sm12 lg4 xl2>
        <v-select solo items="[1, 2, 3]" label="검색어"></v-select>
      </v-flex>
    </v-layout>
    <v-btn>검색</v-btn>
  </section>
</template>

<script>
export default {
  data() {
    key: ""
  }
}
</script>

<style>
.search {
  text-align: left;
  background-color: white;
  padding: 25px;
}
</style>
