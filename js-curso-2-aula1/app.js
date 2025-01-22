let listaDeNumSort = [];
let numLimite = 10;
let numeroSecreto = gerarNumAleatorio();
let tentativas = 1;

function exibirTxtNaTela(tag, texto){
        let campo = document.querySelector(tag);
        campo.innerHTML = texto;
        if ('speechSynthesis' in window) {
          let utterance = new SpeechSynthesisUtterance(texto);
          utterance.lang = 'pt-BR'; 
          utterance.rate = 1.2; 
          window.speechSynthesis.speak(utterance); 
      } else {
          console.log("Web Speech API não suportada neste navegador.");
      }
}

function exibirMsgInicial(){
    exibirTxtNaTela("h1", "Jogo do número secreto");
    exibirTxtNaTela("p", "Escolhe um número entre 1 e 10!");
}

exibirMsgInicial();

function verificarChute(){
    let chute = document.querySelector("input").value;
    if (chute == numeroSecreto){
        exibirTxtNaTela("h1", "Acertou!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTxtNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    }else {
        if (chute > numeroSecreto){
            exibirTxtNaTela("h1", "O número secreto é menor!");
        }else {
            exibirTxtNaTela("h1", "O número secreto é maior!")
        }
    }
    tentativas++;
    limparCampo();
}

function gerarNumAleatorio(){
  let numEscolhido = parseInt(Math.random() * numLimite + 1);
  let quantDeElementosNaLista = listaDeNumSort.length;

  if (quantDeElementosNaLista == numLimite){
    listaDeNumSort = [];
  }

  if (listaDeNumSort.includes(numEscolhido)){
    return gerarNumAleatorio();
  } else {
    listaDeNumSort.push(numEscolhido);
    console.log(listaDeNumSort);
    return numEscolhido;
  }
}

function limparCampo(){
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo(){
    numeroSecreto = gerarNumAleatorio();
    limparCampo();
    tentativas;
    exibirMsgInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}