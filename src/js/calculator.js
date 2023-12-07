let mainInfo = document.getElementById('main-info');
let sound = document.getElementById("sound-icon")
const operadoresNumericos = ['+', '-', '*', '/', '÷', "×", "."];

// Variável para verificar se ao digitar um número após o resultado
// Irá limpar o visor e deixar apenas o número digitado
var substituir = false;
var audioMutado = false;

function manoelGomesAudio() {
    const audio = new Audio(`../../assets/audio/Bomdemaizi.wav`);
    tocarAudio(audio);
}

function tocarAudio (audio) {
    if (!audioMutado) {
        audio.play();
    }
}

function muteDesmute() {
    if (audioMutado) {
        sound.src = "../../assets/icon/sound_icon.svg";
        audioMutado = false;
    } else {
        sound.src = "../../assets/icon/sound_muted_icon.svg";
        audioMutado = true;
    }
}

function limparVisor() {
    mainInfo.innerText = "";
}

addEventListener('click', function (e) {

    let botao = e.target

    // Verificando se o evento click pegou um botão
    if (botao.className == "key") {

        // Criar um novo elemento de áudio
        const audio = new Audio(`../../assets/audio/${botao.value}.wav`);
        tocarAudio(audio);

        //Verificar se o botão pressionado é o de Igual
        if (botao.id == "equal") {

            mainInfo.innerText = resultado(mainInfo.innerText);
            substituir = true;

        } else {
            //Verifica se ultrapassou de 12 dígitos
            if (mainInfo.innerText.length == 12) {
                this.alert("Número máximo é de 12 digitos");
            } else {
                // Não permite digitar simbolos antes de ter no mínimo 1 número
                // Ou simbolos ao lado do outro
                if (botao.dataset.typeKey == "symbol") {
                    if (mainInfo.innerText != "" && !operadoresNumericos.includes(mainInfo.innerText.slice(-1))) {
                        mainInfo.innerText += botao.value;
                        substituir = false;
                    }
                } else if (substituir == true) {
                    mainInfo.innerText = botao.value;
                    substituir = false;

                } else {
                    // Seta o valor do botão no visor
                    mainInfo.innerText += botao.value;

                }
            }
        }
    }

});

// Função que recebe a expressão do visor, calcula e retorna o resultado
function resultado(expressao) {

    expressao = expressao.replace("×", "*");
    expressao = expressao.replace("÷", "/");

    if (expressao == "" || expressao == "Erro") {
        return "";

        // Remove se tiver um operador matemático no final da expressão
    } else if (operadoresNumericos.includes(expressao.slice(-1))) {
        expressao = expressao.slice(0, -1);
    }
    try {
        //Realizando o calculo da expressão e retornando
        return eval(expressao);
    } catch (error) {
        return "Erro";
    }
}