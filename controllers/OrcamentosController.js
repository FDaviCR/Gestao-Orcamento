const express = require("express");
const router = express.Router();
const Cliente = require("../models/Clientes");
const Orcamento = require("../models/Orcamentos");
const Produto = require("../models/Produtos");
const OrcamentoItens = require("../models/OrcamentoItens");
const adminAuth = require("../middleware/adminAuth");


router.get("/orcamentos", adminAuth, (req, res)=>{
    Orcamento.findAll({
        include: [{model: Cliente}]
    }).then(orcamentos=>{
        res.render("admin/orcamentos/index",{orcamentos:orcamentos});
    })
});

router.get("/admin/orcamentos/new", adminAuth, (req, res)=>{
    Cliente.findAll().then(clientes=>{
        res.render("admin/orcamentos/new",{clientes: clientes});
    })
});

router.post("/orcamentos/save", (req, res)=>{
    var clienteId = req.body.cliente;
    var tipo = req.body.tipo;
    var formPagamento = req.body.formaPagamento;
    var valor = 0;
    var aprovado = 0;

    Orcamento.create({
        clienteId: clienteId,
        tipo:tipo,
        formPagamento:formPagamento,
        valor: valor,
        aprovado:aprovado
    }).then(()=>{
        res.redirect("/orcamentos");
    })
});

router.post("/orcamentos/delete", (req, res)=>{
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Orcamento.destroy({
                where:{
                    id:id
                }
            }).then(()=>{
                res.redirect("/orcamentos");
                console.log("Apagou");
            })
        }else{
            res.redirect("/orcamentos");
            console.log("Não-número");
        }
    }else{
        res.redirect("/orcamentos/new");
        console.log("Vazio");
    }
});

router.get("/orcamentos/edit/:id", adminAuth, (req, res)=>{
    var id = req.params.id;
    Orcamento.findByPk(id).then(orcamento=>{
        if(orcamento != undefined){
            Cliente.findAll().then(clientes=>{
                res.render("admin/orcamentos/edit", {clientes: clientes, orcamento:orcamento})
            });
        }else{
            res.redirect("/");
        }
    }).catch(err=>{
        res.redirect("/orcamentos");
    });
});

router.post("/orcamentos/update", (req, res)=>{
    var id = req.body.idOrcamento;
    var clienteId = req.body.cliente;
    var tipo = req.body.tipo;
    var formPagamento = req.body.formaPagamento;

    Orcamento.update({clienteId:clienteId, tipo:tipo, formPagamento: formPagamento},{
        where:{
            id: id
        }
    }).then(() => {
        res.redirect("/orcamentos");
    }).catch(err => {
        res.redirect("/");
    });
});


module.exports = router;
