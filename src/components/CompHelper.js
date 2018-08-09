export function getSelectedFunc(e) {
  console.log("e :", e);
  console.log(e.path[8]);
}

export function getTotal(_this) {
  let update_total = _this.$children[0].$children[1].searchLength;
  _this.total = update_total;

  let pageNum = _this.$children[0].$children[4].value - 1;
  console.log("pageNum :", pageNum);
  let pageActiveText = _this.$children[0].$children[1].$children[1].value;
  console.log("pageActiveText :", pageActiveText);
  let calPage = pageNum * pageActiveText;
  _this.total_index = calPage;
}
