export function hoverFunc(e) {
  if (window.innerWidth > 500) {
    let sideBarWidth = e.path[0].offsetWidth;
    if (sideBarWidth < 62) {
      clickFunc();
    }
  }
}

export function clickFunc() {
  let sideBar = document.getElementsByClassName("side-bar")[0];
  let topBar = document.getElementsByClassName("top-bar")[0];
  let con = document.getElementsByClassName("contents")[0];
  if (sideBar.className == "side-bar") {
    sideBar.classList.add("active");
    topBar.classList.add("active");
    con.classList.add("active");

    return false;
  } else {
    sideBar.classList.remove("active");
    topBar.classList.remove("active");
    con.classList.remove("active");

    return true;
  }
}

export function activingFunc(e) {
  let title = e.toElement.innerText;
  let subTabTitle =
    e.toElement.parentNode.parentNode.parentNode.parentNode.className;
  let tab = document.getElementsByClassName("tab")[0];
  let subSubTab = document.getElementsByClassName("sub-sub-tab")[0];
  let activedTab = document.querySelector(".expandable.active");
  let activedList = function(target) {
    return target.querySelectorAll(".active");
  };
  if (subTabTitle == "side-bar" || subTabTitle == "side-bar active") {
    if (activedList(tab).length > 0) {
      activedList(tab).forEach(element => {
        element.classList.remove("active");
      });
    }
    e.path[2].classList.add("active");
  } else if (subTabTitle == "expandable sub-sub-tab-title active") {
    if (activedList(subSubTab).length > 0) {
      activedList(subSubTab).forEach(element => {
        element.classList.remove("active");
      });
    }
    e.path[2].classList.add("active");
  } else if (subTabTitle == "expandable active") {
    if (activedList(activedTab).length > 0) {
      activedList(activedTab).forEach(element => {
        element.classList.remove("active");
      });
    }
    e.path[2].classList.add("active");
  }

  return title;
}

export function redirectTabFunc(_this) {
  let routeUrl = _this.$route.name;
  let tabList = document.getElementsByClassName("tab-btn");
  let actived = document.getElementsByClassName("active");

  for (let item in tabList) {
    let tabUrl = tabList[item].name;
    if (routeUrl == tabUrl) {
      let switchTab = tabList[item].getElementsByClassName("switch")[0];
      switchTab.click();
      if (switchTab.classList.contains("step1")) {
        switchTab.parentNode.parentNode.className = "active";
      } else if (switchTab.classList.contains("step2")) {
        switchTab.parentNode.parentNode.className = "active";
        switchTab.parentNode.parentNode.parentNode.parentNode.classList.add(
          "active"
        );
      } else if (switchTab.classList.contains("step3")) {
        switchTab.parentNode.parentNode.className = "active";
        switchTab.parentNode.parentNode.parentNode.parentNode.classList.add(
          "active"
        );
        switchTab.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.classList.add(
          "active"
        );
      }
    }
  }
}
