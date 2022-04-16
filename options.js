document.getElementById("salvarBtn").addEventListener("click", salvar);

let usuarioInput = document.getElementById("usuario");
let senhaInput = document.getElementById("senha");

let devInput = document.getElementById("dev");
let devCheck = document.getElementById("devCheck");
devCheck.addEventListener("click", (evt) => onCheckboxChange(evt, devInput));
let hmlInput = document.getElementById("hml");
let hmlCheck = document.getElementById("hmlCheck");
hmlCheck.addEventListener("click", (evt) => onCheckboxChange(evt, hmlInput));
let stgInput = document.getElementById("stg");
let stgCheck = document.getElementById("stgCheck");
stgCheck.addEventListener("click", (evt) => onCheckboxChange(evt, stgInput));
let prdInput = document.getElementById("prd");
let prdCheck = document.getElementById("prdCheck");
prdCheck.addEventListener("click", (evt) => onCheckboxChange(evt, prdInput));

let sucessContainer = document.getElementById("sucesso");

function onCheckboxChange(evt, input) {
  atualizaStatusInput(evt.currentTarget.checked, input);
}

function atualizaStatusInput(isEnabled, input) {
  if(isEnabled) { 
    input.disabled = false; 
    input.focus();
  }
  else {
    input.disabled=true;
  }
}

function salvar() {
  let parametros = {
    usuario: usuarioInput.value, 
    senha: senhaInput.value, 
    dev: devInput.value,
    isDev: devCheck.checked,
    hml: hmlInput.value,
    isHml: hmlCheck.checked,
    stg: stgInput.value,
    isStg: stgCheck.checked,
    prd: prdInput.value,
    isPrd: prdCheck.checked
  };
  chrome.storage.sync.set({ parametros });
  chrome.storage.sync.set({ sucesso: true });
}

function buildOptions() {
  chrome.storage.sync.get("parametros", (data) => {
    if (data !== null && data !== undefined) {
      if (data.parametros !== null && data.parametros !== undefined) {
        usuarioInput.value = data.parametros.usuario;
        senhaInput.value = data.parametros.senha;
        devInput.value = data.parametros.dev;
        devCheck.checked = data.parametros.isDev;
        hmlInput.value = data.parametros.hml;
        hmlCheck.checked = data.parametros.isHml;
        stgInput.value = data.parametros.stg;
        stgCheck.checked = data.parametros.isStg;
        prdInput.value = data.parametros.prd;
        prdCheck.checked = data.parametros.isPrd;

        atualizaStatusInput(data.parametros.isDev, devInput);
        atualizaStatusInput(data.parametros.isHml, hmlInput);
        atualizaStatusInput(data.parametros.isStg, stgInput);
        atualizaStatusInput(data.parametros.isPrd, prdInput);
      }
    }
  });

  chrome.storage.sync.get("sucesso", (data) => {
    if (data !== null && data !== undefined) {
      if (data.sucesso) {
        chrome.storage.sync.set({ sucesso: false });
        sucessContainer.style.display = "block";
      }
    }
  });

}

// Initialize the page by building options
buildOptions();
