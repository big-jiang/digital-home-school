<script>
const api = 'https://robot-1gk2vy2q8735f96a-1258099036.ap-shanghai.service.tcloudbase.com/robot';
const shortApi = 'https://school-10be94-1258099036.ap-shanghai.service.tcloudbase.com/shortMsg';
var phone = '18258169721';
var grade = 4;
let permissions = [0,0,0,0];
//const cms = 'https://robot-1gk2vy2q8735f96a-1258099036.tcloudbaseapp.com/tcb-cms/';
const cms = 'https://www.baidu.com';

const robotHelp = 'https://www.yuque.com/docs/share/11030140-d92d-4a4b-affb-f62b78902e2b';

const docHelp = 'https://www.yuque.com/docs/share/f755c652-7ea8-4574-a974-2f54dba537e6';

function isMobile() {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    return flag;
}

//时间格式
function add0(m){return m<10?'0'+m:m }

function formatTime(timestamp)
{
    var time = new Date(timestamp);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y+'年'+add0(m)+'月'+add0(d)+'日 '+add0(h)+':'+add0(mm)+':'+add0(s);
}

export default {
    api,
    shortApi,
    phone,
    grade,
    permissions,
    cms,
    robotHelp,
    docHelp,
    isMobile,
    formatTime
};
</script>
