const express = require("express");
const router = express.Router();
const Cliente = require("../models/Clientes");
const Produto = require("../models/Produtos");
const EstoqueItens = require("../models/EstoqueItens");
const adminAuth = require("../middleware/adminAuth");


router.get("/estoqueItens/:id", adminAuth,(req, res)=>{
    var idEstoque = req.params.id;
    EstoqueItens.findAll({
        where:{ estoqueId: idEstoque},
        include: [{model: Produto}]
    }).then(estoqueItens=>{
        res.render("admin/estoqueItens/index",{estoqueItens:estoqueItens,idEstoque:idEstoque});
    })
});

router.get("/estoqueItens/new/:id", adminAuth, (req, res)=>{
    var idEstoque = req.params.id;
    Produto.findAll().then(produtos=>{
        res.render("admin/estoqueItens/new",{produtos: produtos, idEstoque:idEstoque});
    })
});

router.post("/estoqueItens/save", (req, res)=>{
    var quantidade = req.body.quantidade;
    var apelido = req.body.apelido;
    var unidade = req.body.unidade;
    var estoqueId = req.body.estoqueIdent;
    var produtoId = req.body.produto;

    EstoqueItens.create({
        quantidade: quantidade,
        unidade:unidade,
        apelido:apelido,
        estoqueId:estoqueId,
        produtoId:produtoId
    }).then(()=>{
        res.redirect("/estoqueItens/"+estoqueId);
    })
});

router.post("/estoqueItens/delete", (req, res)=>{
    var id = req.body.id;
    
    if(id != undefined){
        if(!isNaN(id)){
            EstoqueItens.destroy({
                where:{
                    id:id
                }
            }).then(()=>{
                res.redirect("/estoques");
                console.log("Apagou");
            })
        }else{
            res.redirect("/estoques");
            console.log("Não-número");
        }
    }else{
        res.redirect("/estoques");
        console.log("Vazio");
    }
});

router.get("/estoques/visualizar/:id",  adminAuth, (req, res)=>{
    var id = req.params.id;
    
    Estoque.findByPk(id, {include:[{model:Cliente}]}).then(estoque=>{
        if(estoque != undefined){
            EstoqueItens.findAll({
                where:{ estoqueId: id},
                include: [{model: Produto}]
            }).then(estoqueItens=>{
                res.render("admin/estoques/visualizar",{estoqueItens:estoqueItens,estoque:estoque});
            });
        }else{
            res.redirect("/estoques");
        }
    }).catch(err=>{
        console.log(err);
        res.redirect("/");
    });
});



module.exports = router;
