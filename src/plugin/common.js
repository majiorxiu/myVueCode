const common = {
  //请求节流, 杜绝高频率无效请求
 eventThrottle (fun, wait, key) {
   if(key) {
     window.clearTimeout(key);
   }
   key = setTimeout(() => {
     fun();
     key = undefined
   }, wait)
   return key;
 }
}
export default common