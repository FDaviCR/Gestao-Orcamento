const express = require("express");
const router = express.Router();
const Cliente = require("../models/Clientes");
const Produto = require("../models/Produtos");
const EstoqueItens = require("../models/EstoqueItens");
const Estoques = require("../models/Estoques");
const EstoqueMovimentacoes = require("../models/EstoqueMovimentacoes");
const adminAuth = require("../middleware/adminAuth");


router.get("/estoqueMovimentacoes", adminAuth,(req, res)=>{
    EstoqueMovimentacoes.findAll({
        include: [{model: Produto},{model: Estoques}]
    }).then(estoqueMovimentacoes=>{
        res.render("admin/estoqueMovimentacoes/index",{estoqueMovimentacoes:estoqueMovimentacoes});
    })
});

router.get("/estoqueMovimentacoes/new", adminAuth, (req, res)=>{
    EstoqueItens.findAll({
        include: [{model: Produto},{model: Estoques}]
    }).then(estoqueItens=>{
        res.render("admin/estoqueMovimentacoes/new",{estoqueItens: estoqueItens});
    })
});

router.post("/estoqueMovimentacoes/save", (req, res)=>{
    var quantidade = req.body.quantidade;
    var tipo = req.body.tipo;
    var atualizado = req.body.atualizado;
    var estoqueId = req.body.estoqueIdent;
    var produtoId = req.body.produto;
    var estoqueItemId = req.body.estoqueItemId;

    EstoqueMovimentacoes.create({
        quantidade: quantidade,
        tipo: tipo,
        estoqueId:estoqueId,
        produtoId:produtoId,
        estoqueItenId:estoqueItemId,
        usuario: req.session.usuario
    }).then(()=>{
        EstoqueItens.update({quantidade: atualizado},{
            where:{
                id:estoqueItemId
            }
        }).then(()=>{
            res.redirect("/estoqueMovimentacoes");
        })
    })
});


module.exports = router;
