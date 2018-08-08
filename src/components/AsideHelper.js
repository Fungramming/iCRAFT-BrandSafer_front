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
  let subTab = document.getElementsByClassName("sub-tab")[0];
  let subSubTab = document.getElementsByClassName("sub-sub-tab")[0];
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
    if (activedList(subTab).length > 0) {
      activedList(subTab).forEach(element => {
        element.classList.remove("active");
      });
    }
    e.path[2].classList.add("active");
  }

  return title;
}
