const celulas = document.querySelectorAll(".celula");
const textoStatus = document.querySelector("#textoStatus");
const btnReiniciar = document.querySelector("#btnReiniciar");

const condicoesVitoria = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let opcoes = ["","","","","","","","",""];
let jogadorAtual = "X";
let rodando = false;

iniciarJogo();

function iniciarJogo(){
    celulas.forEach(celula => celula.addEventListener("click", celulaClicada));
    btnReiniciar.addEventListener("click", reiniciarJogo);
    textoStatus.textContent = `Vez do ${jogadorAtual}`
    rodando = true;
}
function celulaClicada(){
    const celulaIndex = this.getAttribute("indexCelula");

    if(opcoes[celulaIndex] != "" || !rodando){
        return;
    }
    atualizarCelula(this, celulaIndex);
    
    checarVencedor();
}
function atualizarCelula(celula, index){
    opcoes[index] = jogadorAtual;

    celula.textContent = jogadorAtual;  
}
function mudarJogador(){
    jogadorAtual = (jogadorAtual == "X") ? "O" : "X";
    textoStatus.textContent = `É a vez do ${jogadorAtual}`
}
function checarVencedor(){
    let vencedorRound = false;

    for( let i = 0; i <condicoesVitoria.length; ++i){
        const condicao = condicoesVitoria[i];
        const celulaA = opcoes[condicao[0]];
        const celulaB = opcoes[condicao[1]];
        const celulaC = opcoes[condicao[2]];

        if(celulaA == "" || celulaB == "" || celulaC == ""){
            continue;
        }
        if(celulaA == celulaB && celulaB == celulaC){
            vencedorRound = true;
            break;
        }
    }

    if(vencedorRound){
        textoStatus.textContent = `${jogadorAtual} ganhou`;
        rodando = false;
    }
    else if(!opcoes.includes("")){
        textoStatus.textContent = "Empate!"
        rodando = false;
    }
    else{
        mudarJogador();
    }
}
function reiniciarJogo(){
    jogadorAtual = "X";
    opcoes = ["","","","","","","","",""];
    textoStatus.textContent = `É a vez do ${jogadorAtual}`;
    celulas.forEach(celula => celula.textContent = "");
    rodando = true;
}