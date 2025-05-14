const readline = require('readline');
const axios = require("axios");
const {v4: uuidv4} = require("uuid")
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Conversa {
    constructor(telefone, mensagem, idPacote) {
        this.telefone = telefone;
        this.mensagens = [mensagem];
        this.idPacote = idPacote
        this.contarTempo()
    }

    contarTempo() {
        if(this.interval){
            clearTimeout(this.interval)
        }

        this.interval = setTimeout(() => {
            //this.enviarParaServidor();
            
        }, 1000 * 5);
    }

    juntarMensagens(mensagem) {
        try {
            this.mensagens.push(mensagem);
            this.contarTempo()
        } catch (error) {
            console.error(error);
        }
    }

    async enviarParaServidor() {
        
        const resposta = await axios.post("http://localhost:3000/api/recebemensagem", {mensagem:this.mensagens}, {
            headers: {
                'Content-Type': 'application/json'
            }})
        emEspera = emEspera.filter(numero=>{
            return numero !== this.telefone
        })
        console.log(emEspera)
    }

    salvarNoBD(mensagem) {
        // Método de simulação para salvar no banco
    }
}

let mensagens = [
    {"119498385238": {texto: "Oi", data: "_formato_time_stam"}},
    {"11949838238": {texto: "Oi", data: "_formato_time_stamp"}},
    {"11949838238": {texto: "tudo bem?", data: "_formao_time_stamp"}},
    {"11949838238": {texto: "Gostaria de trabalhar para você", data: "_formato_time_stamp"}}, // últimas mensagens
];
        
let emEspera = []; // se o telefone está aqui é porque o objeto desse telefone já foi criado.
let objetos = [];
let aResponder = [];
let pacotes=[]
let loop=true   
async function iniciarInteracao() {
    while (loop) {
        //Espera a entrada do usuário
        const resposta = await new Promise((resolve) => {
            rl.question('Digite a mensagem: ', (resposta) => {
                resolve(resposta);
            });
        });

        // // // Converte a entrada em formato JSON
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
                if (Object.keys(emEspera[i])[0] == telefone) { // verifica se o objeto já foi criado
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
                const newPacote = empacotador(mensagem)
                emEspera.push(newPacote)
                objetos.push(new Conversa(telefone, mensagem[telefone].texto), Object.keys(newPacote)[0]/*não chega nada*/);
                mensagens = apagaMensagemDoArray(mensagens, telefone); // apaga a mensagem do array para não ser lida mais de uma vez
            }
        });

        // Exibe os dados após o processamento
        console.log("Objetos:", objetos);
        console.log("Em Espera:", emEspera);
        console.log("Mensagens restantes:", mensagens);
        loop=false
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

function empacotador(mensagem){
    let nMsg ={}
    const telefone = Object.keys(mensagem)[0];
    nMsg[telefone]=uuidv4()
    return nMsg
}
