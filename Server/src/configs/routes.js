const { verificarCookie } = require("../middlewares/verificarcookie")
const recebermensagem = require("../routes/recebemensagem")

module.exports = (app)=>{
    app.use('/api', recebermensagem)
}
