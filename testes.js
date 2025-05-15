class Teste{
    constructor(){
        this.add()
    }
    add(){
        array.push("ola")
    }
    delete(){
        delete array[0]
    }
}


let array=[]

let obj = new Teste()

console.log(array)
obj.delete()
console.log(array)