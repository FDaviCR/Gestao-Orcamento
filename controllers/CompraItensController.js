const express = require("express");
const router = express.Router();
const Cliente = require("../models/Clientes");
const Produto = require("../models/Produtos");
const EstoqueItens = require("../models/EstoqueItens");
const CompraItens = require("../models/CompraItens");
const adminAuth = require("../middleware/adminAuth");
const EstoqueMovimentacoes = require("../models/EstoqueMovimentacoes");


router.get("/compraItens/:id", adminAuth,(req, res)=>{
    var idCompra = req.params.id;
    CompraItens.findAll({
        where:{ compraId: idCompra},
        include: [{model: Produto},{model: EstoqueItens}]
    }).then(compraItens=>{
        res.render("admin/compraItens/index",{compraItens:compraItens,idCompra:idCompra});
    })
});

router.get("/compraItens/new/:id", adminAuth, (req, res)=>{
    var idCompra = req.params.id;
    EstoqueItens.findAll({
        include: [{model: Produto}]
    }).then(estoqueItens=>{
        res.render("admin/compraItens/new",{estoqueItens: estoqueItens, idCompra:idCompra});
    })
});

router.post("/compraItens/save", (req, res)=>{
    var quantidade = req.body.quantidade;
    var valor = req.body.valor;
    var unidade = req.body.unidade;
    var compraId = req.body.compraIdent;
    var produtoId = req.body.produto;
    var estoqueItemId = req.body.estoqueItemId;
    var tipo = 'Entrada';
    var atualizado = req.body.atualizado;
    var estoqueId = req.body.estoqueIdent;
    
    CompraItens.create({
        quantidade: quantidade,
        valor:valor,
        unidade:unidade,
        compraId:compraId,
        produtoId:produtoId,
        usuario: req.session.usuario
    }).then(()=>{
        EstoqueMovimentacoes.create({
            quantidade: quantidade,
            tipo: tipo,
            estoqueId:estoqueId,
            produtoId:produtoId,
            estoqueItenId:estoqueItemId,
            usuario: req.session.usuario
        }).then(()=>{
            EstoqueItens.update(
                {quantidade: atualizado, usuario: req.session.usuario},
                {where:{id:estoqueItemId}
            }).then(()=>{
                res.redirect("/compraItens/"+compraId);
            })
        })
    })
});

router.post("/compraItens/delete", (req, res)=>{
    var id = req.body.id;
    
    if(id != undefined){
        if(!isNaN(id)){
            CompraItens.destroy({
                where:{
                    id:id
                }
            }).then(()=>{
                res.redirect("/compras");
                console.log("Apagou");
            })
        }else{
            res.redirect("/compras");
            console.log("Não-número");
        }
    }else{
        res.redirect("/compras");
        console.log("Vazio");
    }
});

router.get("/compras/visualizar/:id",  adminAuth, (req, res)=>{
    var id = req.params.id;
    
    Compra.findByPk(id, {include:[{model:Cliente}]}).then(compra=>{
        if(compra != undefined){
            CompraItens.findAll({
                where:{ compraId: id},
                include: [{model: Produto}]
            }).then(compraItens=>{
                res.render("admin/compras/visualizar",{compraItens:compraItens,compra:compra});
            });
        }else{
            res.redirect("/compras");
        }
    }).catch(err=>{
        console.log(err);
        res.redirect("/");
    });
});



module.exports = router;
