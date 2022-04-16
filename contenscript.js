let lastUrl = location.href; 
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    onUrlChange();
  }
}).observe(document, {subtree: true, childList: true});
 
 
function onUrlChange() {
  checkURL();
}
function checkURL() {
    console.log(window.location.href);
    console.log(window.location.hostname);
    console.log(window.location.pathname);
    console.log(window.location.protocol);
}
  
