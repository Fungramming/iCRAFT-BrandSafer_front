export function getSelectedFunc(e) {
  console.log("e :", e);
  console.log(e.path[8]);
}

// export function getTotalDate() {
//   let update_total = this.$children[0].$children[1].searchLength;
//   this.total = update_total;

//   let page = document.getElementsByClassName("v-select__selection");
//   let pageActive = document.getElementsByClassName(
//     "v-pagination__item--active"
//   );
//   let pageText = page[0].innerText;
//   let pageActiveText = pageActive[0].innerText;
//   let pageNum = pageActiveText - 1;
//   let calPage = pageNum * pageText;
//   this.total_index = calPage;
// }
