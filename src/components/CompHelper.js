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
}

export function dateFormat(items, target) {
  for (let item in items) {
    if (target == "dtRegistered") {
      let date = new Date(items[item].dtRegistered);
      let formatDate = date.toLocaleDateString();
      items[item].dtRegistered = formatDate;
    } else if (target == "dtModified") {
      let date = new Date(items[item].dtModified);
      let formatDate = date.toLocaleDateString();
      items[item].dtModified = formatDate;
    } else if (target == "dtCertificate") {
      let date = new Date(items[item].dtCertificate);
      let formatHour = date.getHours();
      let formaSeconds = date.getSeconds();
      let formatDate = date.toLocaleDateString();
      items[item].dtCertificate =
        formatDate + " " + formatHour + ":" + formaSeconds;
    }
  }
}
