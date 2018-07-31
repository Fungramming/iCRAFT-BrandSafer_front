export function formatDate() {
  var d = new Date(),
    hour = "" + d.getHours(),
    minute = "" + d.getMinutes(),
    second = "" + d.getSeconds(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (second.length == 1) second = "0" + second;
  if (minute.length == 1) minute = "0" + minute;
  if (hour.length == 1) hour = "0" + hour;
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join(".") + " " + [hour, minute, second].join(":");
}
