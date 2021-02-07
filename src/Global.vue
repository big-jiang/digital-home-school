<script>
const api =
  "https://robot-1gk2vy2q8735f96a-1258099036.ap-shanghai.service.tcloudbase.com/robot";
var phone = "18258169721";

function isMobile() {
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  return flag;
}

//时间格式
function add0(m) {
  return m < 10 ? "0" + m : m;
}

function formatTime(timestamp) {
  var time = new Date(timestamp);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  // var h = time.getHours();
  // var mm = time.getMinutes();
  // var s = time.getSeconds();
  // return y+'年'+add0(m)+'月'+add0(d)+'日 '+add0(h)+':'+add0(mm)+':'+add0(s);
  // return add0(m)+'/'+add0(d)+' '+add0(h)+':'+add0(mm);
  return y + "/" + add0(m) + "/" + add0(d);
}

export default {
  api,
  phone,
  isMobile,
  formatTime,
};
</script>