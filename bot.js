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
    {telefone:"11949838238",mensagem:"Oi"} // ultimas mensagens
]
let emEspera = [
    "1193233433","11932323434", "1192334323" // se o telefone esta aqui é porque o objeto desse telefone ja foi criado
]

while (true){
    mensagens.forEach(mensagem=>{
        const telefone = mensagem.telefone
        var existe=false
        for (i=0;i<emEspera.length;i++){
            if(emEspera[i]==telefone){ // verifica se o objeto ja foi criado
                existe=true
                break
            }
        }
        if(existe=false){
            //vai criar o objeto
        }
    })
}
 
