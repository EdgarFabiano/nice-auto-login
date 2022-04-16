chrome.runtime.onMessage.addListener(
  function(request) {
    if (request.message === "check-url") {
      checkURL();
    }
  }
);

function getDomain(url) {
  return url.replaceAll(/https?:\/\//gi, '').split('/')[0];
}

function setParametersAndLogUserIn(usuario, senha) {
  let usuarioInput = document.getElementById("Input_Username");
  let senhaInput = document.getElementById("Input_Password");
  let loginBtn = document.getElementsByClassName("btn btn-primary")[0];

  usuarioInput.value = usuario;
  senhaInput.value = senha;
  console.log("Attempting to login user: " + usuario);
  loginBtn.click();
}

function checkURL() {

    if (window.location.pathname.endsWith("/Login")) {

      chrome.storage.sync.get("parametros", (data) => {
        if (data !== null && data !== undefined) {
          if (data.parametros !== null && data.parametros !== undefined) {
            
            if ((data.parametros.isDev && window.location.href.includes(getDomain(data.parametros.dev))) ||
                (data.parametros.isHml && window.location.href.includes(getDomain(data.parametros.hml))) ||
                (data.parametros.isStg && window.location.href.includes(getDomain(data.parametros.stg))) ||
                (data.parametros.isPrd && window.location.href.includes(getDomain(data.parametros.prd)))) {
                setParametersAndLogUserIn(data.parametros.usuario, data.parametros.senha);
            }
          }

        }
      });

    }
    
}
  
checkURL();
