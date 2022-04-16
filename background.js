
chrome.runtime.onInstalled.addListener(() => {
  
  let parametros = {
    usuario: "", 
    senha: "", 
    dev: "https://outsystems.vitreo.local/",
    isDev: true,
    hml: "https://h-outsystems.vitreo.local/",
    isHml: true,
    stg: "https://stag-nice-dtvm.vitreo.local/",
    isStg: true,
    prd: "https://nice-dtvm.vitreo.local/",
    isPrd: true
  };
  chrome.storage.sync.set({ parametros });
  chrome.storage.sync.set({ sucesso: false });
});
