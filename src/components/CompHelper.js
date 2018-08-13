// export function getSelectedFunc(e) {
//   console.log("e :", e);
//   console.log(e.path[8]);
// }

export function getTotal(_this) {
  let update_total = _this.$children[0].$children[1].searchLength;
  console.log("update_total :", update_total);
  _this.total = update_total;

  let pageNum = _this.$children[0].$children[4].value - 1;
  let pageActiveText = _this.$children[0].$children[1].$children[1].value;
  let calPage = pageNum * pageActiveText;
  _this.total_index = calPage;
}

export function checkRequired() {
  let requiredInput = document.getElementsByClassName("require-input");

  for (let i = 0; i < requiredInput.length; i++) {
    requiredInput[i].parentNode.removeClass;
    requiredInput[i].parentNode.classList.remove("required");

    let valueLength = requiredInput[i].value.length;
    // 항목이 비어있을때
    if (valueLength == 0) {
      requiredInput[i].parentNode.classList.add("required");
    } else if (valueLength !== 0) {
      requiredInput[i].parentNode.classList.remove("required");
    }
  }
}
