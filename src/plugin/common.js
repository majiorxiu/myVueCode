const common = {
  //请求节流
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