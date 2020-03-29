const express = require("express");
const router = express.Router();
const Fornecedor = require("../models/Fornecedores");
const Compras = require("../models/Compras");
const adminAuth = require("../middleware/adminAuth");


router.get("/compras", adminAuth, (req, res)=>{
    Compras.findAll({
        include: [{model: Fornecedor}]
    }).then(compras=>{
        res.render("admin/compras/index",{compras:compras});
    })
});

router.get("/compras/new", adminAuth, (req, res)=>{
    Fornecedor.findAll().then(fornecedores=>{
        res.render("admin/compras/new",{fornecedores:fornecedores});
    })
});

router.post("/compras/save", (req, res)=>{
    var fornecedorId = req.body.fornecedor;
    var nota = req.body.nota;
    var valor = req.body.valor;
    var descricao = req.body.descricao;

    Compras.create({
        fornecedoreId: fornecedorId,
        nota:nota,
        valor: valor,
        descricao:descricao,
        usuario: req.session.usuario
    }).then(()=>{
        res.redirect("/compras");
    })
});

router.get("/compras/edit/:id", adminAuth, (req, res)=>{
    var id = req.params.id;
    Compras.findByPk(id).then(compra=>{
        if(compra != undefined){
            Fornecedor.findAll().then(fornecedores=>{
                res.render("admin/compras/edit", {fornecedores:fornecedores, compra:compra})
            });
        }else{
            res.redirect("/");
        }
    }).catch(err=>{
        res.redirect("/compras");
    });
});

router.post("/compras/update", (req, res)=>{
    var id = req.body.idcompra;
    var fornecedorId = req.body.fornecedor;
    var nota = req.body.nota;
    var valor = req.body.valor;
    var descricao = req.body.descricao;

    Compras.update({
        fornecedoreId: fornecedorId,
        nota:nota,
        valor: valor,
        descricao:descricao,
        usuario: req.session.usuario},
        {
        where:{
            id: id
        }
    }).then(() => {
        res.redirect("/compras");
    }).catch(err => {
        res.redirect("/");
    });
});


module.exports = router;
