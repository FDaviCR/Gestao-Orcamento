const express = require("express");
const router = express.Router();
const Cliente = require("../models/Clientes");
const Orcamento = require("../models/Orcamentos");
const Produto = require("../models/Produtos");
const OrcamentoItens = require("../models/OrcamentoItens");
const adminAuth = require("../middleware/adminAuth");
let listaItens = [];


router.get("/orcamentos", adminAuth, (req, res)=>{
    Orcamento.findAll({
        where:{ativo: true},
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
        aprovado:aprovado,
        ativo:true,
        usuario: req.session.usuario
    }).then(function(x){
        res.redirect("/orcamentoItens/new/"+x.id);
    });
});

router.post("/orcamentos/delete", (req, res)=>{
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Orcamento.update({ativo:false,usuario: req.session.usuario},{
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

    Orcamento.update({clienteId:clienteId, tipo:tipo, formPagamento: formPagamento, usuario: req.session.usuario},{
        where:{
            id: id
        }
    }).then(() => {
        res.redirect("/orcamentos");
    }).catch(err => {
        res.redirect("/");
    });
});

router.post("/orcamentos/finalizar/:id", (req, res)=>{
    var id = req.params.id;
    var valor = req.body.totalOrcamento;

    console.log(id);
    console.log(valor);

    Orcamento.update({valor:valor},{
        where:{
            id: id
        }
    }).then(() => {
        res.redirect("/orcamentos/visualizar/"+id);
    }).catch(err => {
        res.redirect("/");
    });
});


/*
router.get("/admin/orcamentos/new", adminAuth, (req, res)=>{
    Cliente.findAll().then(clientes=>{
        Produto.findAll().then(produtos=>{
            res.render("admin/orcamentos/new_orc",{clientes: clientes, produtos: produtos});
        })
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
        OrcamentoItens.bulkCreate(listaItens)
        res.redirect("/orcamentos");
    })
});
*/

module.exports = router;
