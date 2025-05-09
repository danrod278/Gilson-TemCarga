class Conversa{
    constructor(telefone, primeiramensagem){
        this.telefone = telefone
        this.primeiramensagem = primeiramensagem
    }

    contarTempo(){

    }

    juntarMensagens(mensagem){
        
    }

    enviarParaServidor(){

    }

    salvarNoBD(mensagem){

    }
}

let mensagens = [
    {"11949838238": {texto:"Oi", data:"_formato_time_stamp"}} // ultimas mensagens
]
let emEspera = [
    "1193233433","11932323434", "1192334323" // se o telefone esta aqui é porque o objeto desse telefone ja foi criado
]
let objetos = []

while (true){
    mensagens.forEach(mensagem=>{
        const telefone = Object.keys(mensagem[0][0]) // pega o numero de telefone da mensagem
        var existe=false
        for (i=0;i<emEspera.length;i++){
            if(emEspera[i]==telefone){ // verifica se o objeto ja foi criado
                existe=true
                //adicionar mais uma mensagem ao objeto
                
                mensagens=apagaMensagemDoArray(mensagens, numero, data)//apaga a mensagem do array para não ser lida mais de uma vez
                break
            }
        }
        if(existe=false){
            objetos.push(new Conversa(mensagem[telefone], mensagem[telefone].texto))
            mensagens=apagaMensagemDoArray(mensagens, numero, data)//apaga a mensagem do array para não ser lida mais de uma vez
            console.log(objetos);
        }
        
    })
}


function apagaMensagemDoArray(mensagens, numero, data){
    let nMensagens = mensagens.filter(obj=>{
        const mensagem = obj[numero]
        return mensagem !== data 
    })
    return nMensagens
}
