const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Conversa {
    constructor(telefone, mensagem) {
        this.telefone = telefone;
        this.mensagens = [mensagem];
    }

    contarTempo() {
        this.interval = setTimeout(() => {
            this.enviarParaServidor();
        }, 1000 * 60 * 2);
    }

    juntarMensagens(mensagem) {
        try {
            this.mensagens.push(mensagem);
        } catch (error) {
            console.error(error);
        }
        clearTimeout(this.interval);
    }

    enviarParaServidor() {
        console.log("Enviando para o servidor", this.mensagens);
    }

    salvarNoBD(mensagem) {
        // Método de simulação para salvar no banco
    }
}

let mensagens = [
    {"11949838238": {texto: "Oi", data: "_formato_time_stamp"}},
    {"119498385238": {texto: "Oi", data: "_formato_time_stam"}},
    {"11949838238": {texto: "tudo bem?", data: "_formato_time_stamp"}},
    {"11949838238": {texto: "Gostaria de trabalhar para você", data: "_formato_time_stamp"}}, // últimas mensagens
];

let emEspera = []; // se o telefone está aqui é porque o objeto desse telefone já foi criado.
let objetos = [];
let aResponder = [];

async function iniciarInteracao() {
    while (true) {
        // Espera a entrada do usuário
        const resposta = await new Promise((resolve) => {
            rl.question('Digite a mensagem: ', (resposta) => {
                resolve(resposta);
            });
        });

        // Converte a entrada em formato JSON
        try {
            let respostaJSON = JSON.parse(resposta);
            mensagens.push(respostaJSON);
        } catch (e) {
            console.log("Erro ao converter a mensagem em JSON:", e);
            continue;
        }

        // Processa as mensagens
        mensagens.forEach(mensagem => {
            const telefone = Object.keys(mensagem)[0]; // pega o numero de telefone da mensagem

            let existe = false;
            for (let i = 0; i < emEspera.length; i++) {
                if (emEspera[i] == telefone) { // verifica se o objeto já foi criado
                    existe = true;
                    // adicionar mais uma mensagem ao objeto
                    objetos.forEach(objeto => {
                        try {
                            if (objeto.telefone == telefone) {
                                objeto.juntarMensagens(mensagem[telefone].texto);
                            }
                        } catch (error) {
                            console.error("Essa mensagem não existe", error);
                        }
                    });
                    // apaga a mensagem do array para não ser lida mais de uma vez
                    mensagens = apagaMensagemDoArray(mensagens, telefone, mensagem[telefone].data);
                    break;
                }
            }

            // Caso o telefone não exista, cria um novo objeto
            if (!existe) {
                objetos.push(new Conversa(telefone, mensagem[telefone].texto));
                mensagens = apagaMensagemDoArray(mensagens, telefone); // apaga a mensagem do array para não ser lida mais de uma vez
                emEspera.push(telefone);
            }
        });

        // Exibe os dados após o processamento
        console.log("Objetos:", objetos);
        console.log("Em Espera:", emEspera);
        console.log("Mensagens restantes:", mensagens);
    }
}

// Função para apagar a mensagem do array
function apagaMensagemDoArray(mensagens, numero, data) {
    let nMensagens = mensagens.filter(obj => {
        const mensagem = obj[numero];
        return !(mensagem && mensagem.data !== data);
    });
    return nMensagens;
}

// Inicia a interação
iniciarInteracao();
