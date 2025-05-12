class Conversa{
    constructor(telefone, mensagem){
        this.telefone = telefone
        this.mensagens = [mensagem]
    }

    contarTempo(){

    }

    juntarMensagens(mensagem){
        
        try{this.mensagens.push(mensagem)}
        catch(error){console.error(error)}
        
    }

    enviarParaServidor(){
        //envia para o servidor e sai de emEspera
    }

    salvarNoBD(mensagem){

    }
}

let mensagens = [
    {"11949838238": {texto:"Oi", data:"_formato_time_stamp"}},
    {"119498385238": {texto:"Oi", data:"_formato_time_stam"}},
    {"11949838238": {texto:"tudo bem?", data:"_formato_time_stamp"}},
    {"11949838238": {texto:"Gostaria de trabalhar para vocÊs", data:"_ormato_time_stamp"}}, // ultimas mensagens
]
let emEspera = [
     // se o telefone esta aqui é porque o objeto desse telefone ja foi criado. é necessário para que um contato não tenha multiplas respostas
]
let objetos = []

let aResponder =[]

//while (true){}
    mensagens.forEach(mensagem=>{
        const telefone = Object.keys(mensagem)[0] // pega o numero de telefone da mensagem
        
        var existe=false
        for (i=0;i<emEspera.length;i++){
            if(emEspera[i]==telefone){ // verifica se o objeto ja foi criado
                existe=true
                //adicionar mais uma mensagem ao objeto
                

                objetos.forEach(objeto=>{
                    
                    try {
                        if(objeto.telefone==telefone){
                            objeto.juntarMensagens(mensagem[telefone].texto)
                            
                            
                        }   
                    } catch (error) {
                        console.error("Essa mensagem não existe", error)
                    }
                })
                mensagens=apagaMensagemDoArray(mensagens, telefone, mensagem.data)//apaga a mensagem do array para não ser lida mais de uma vez
                
                
                break
            }
        }
        if(existe==false){
            objetos.push(new Conversa(telefone, mensagem[telefone].texto))
            mensagens=apagaMensagemDoArray(mensagens, telefone)//apaga a mensagem do array para não ser lida mais de uma vez
            emEspera.push(telefone)
        }
        
        
})
    
console.log(objetos)    
console.log(emEspera);
console.log(mensagens)    


function apagaMensagemDoArray(mensagens, numero, data){
    let nMensagens = mensagens.filter(obj=>{
        const mensagem = obj[numero]
        return !(mensagem && mensagem.data !== data) 
    })
    return nMensagens
}
