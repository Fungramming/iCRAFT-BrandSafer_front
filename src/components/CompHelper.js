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

export function getTotal(_this) {
  _this.total = _this.$children[0].$children[1].searchLength;
  console.log('_this.$children[0].$children[1] :', _this.$children[0].$children[1]);
  console.log('_this.total :', _this.total);
}
