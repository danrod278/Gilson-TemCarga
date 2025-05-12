const express = require("express")
const router = express.Router()
const {manipularmensagem} = require("../controllers/manipulamensagensController")

router.post("/recebemensagem", manipularmensagem)

module.exports = router
