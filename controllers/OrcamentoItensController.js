const express = require("express");
const router = express.Router();
const Cliente = require("../models/Clientes");
const Produto = require("../models/Produtos");
const Orcamento = require("../models/Orcamentos");
const OrcamentoItens = require("../models/OrcamentoItens");
const adminAuth = require("../middleware/adminAuth");
let ejs = require("ejs");
let app = express();
let pdf = require("html-pdf");
let path = require("path");

router.get("/orcamentoItens/:id", adminAuth,(req, res)=>{
    var idOrcamento = req.params.id;

    OrcamentoItens.findAll({
        where:{ orcamentoId: idOrcamento},
        include: [{model: Produto}]
    }).then(orcamentoItens=>{
        res.render("admin/orcamentoItens/index",{orcamentoItens:orcamentoItens,idOrcamento:idOrcamento});
    })
});

router.get("/orcamentoItens/new/:id", adminAuth, (req, res)=>{
    var idOrcamento = req.params.id;
    Produto.findAll().then(produtos=>{
        res.render("admin/orcamentoItens/new",{produtos: produtos, idOrcamento:idOrcamento});
    })
});

router.post("/orcamentoItens/save", (req, res)=>{
    var quantidade = req.body.quantidade;
    var valorUnitario = req.body.unitario;
    var valorTotal = req.body.total;
    var orcamentoId = req.body.orcamentoItens;
    var produtoId = req.body.produto;

    OrcamentoItens.create({
        quantidade: quantidade,
        valorUnitario:valorUnitario,
        valorTotal:valorTotal,
        orcamentoId:orcamentoId,
        produtoId:produtoId,
        usuario: req.session.usuario
    }).then(()=>{
        res.redirect("/orcamentoItens/"+orcamentoId);
    })
});

router.post("/orcamentoItens/delete", (req, res)=>{
    var id = req.body.id;
    
    if(id != undefined){
        if(!isNaN(id)){
            OrcamentoItens.destroy({
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
        res.redirect("/orcamentos");
        console.log("Vazio");
    }
});

router.get("/orcamentos/visualizar/:id",  adminAuth, (req, res)=>{
    var id = req.params.id;
    
    Orcamento.findByPk(id, {include:[{model:Cliente}]}).then(orcamento=>{
        if(orcamento != undefined){
            OrcamentoItens.findAll({
                where:{ orcamentoId: id},
                include: [{model: Produto}]
            }).then(orcamentoItens=>{
                res.render("admin/orcamentos/visualizar",{orcamentoItens:orcamentoItens,orcamento:orcamento});
            });
        }else{
            res.redirect("/orcamentos");
        }
    }).catch(err=>{
        console.log(err);
        res.redirect("/");
    });
});

router.post("/orcamentos/envioEmail",  adminAuth, (req, res)=>{
    var email = req.body.email;
    var orcamento = req.body.orcamentoCompleto;


    console.log(email);
    console.log(orcamento);

    if(email != undefined){
        var EmailEnvio = require('../function/Email'),
        envio = new EmailEnvio(email,orcamento);

        res.redirect("/orcamentos");
    }else{

        res.redirect("/orcamentos");
    }
});

router.get("/orcamentos/pdf/:id", (req, res)=>{
    var id = req.params.id;
    
    Orcamento.findByPk(id, {include:[{model:Cliente}]}).then(orcamento=>{
        if(orcamento != undefined){
            OrcamentoItens.findAll({
                where:{ orcamentoId: id},
                include: [{model: Produto}]
            }).then(orcamentoItens=>{
                ejs.renderFile(path.join(__dirname, './views/', "template.ejs"), {orcamentoItens:orcamentoItens,orcamento:orcamento}, (err, data) => {
                    if (err) {
                        res.send(err);
                    } else {
                        let options = {
                            "height": "11.25in",
                            "width": "8.5in",
                            "header": {
                                "height": "20mm"
                            },
                            "footer": {
                                "height": "20mm",
                            },
                        };
                        pdf.create(data, options).toFile("report.pdf", function (err, data) {
                            if (err) {
                                console.log(err);
                                res.redirect("/orcamentos/visualizar/"+id);
                            } else {
                                res.redirect("/orcamentos/visualizar/"+id);
                            }
                        });
                    }
                });
            });
        }else{
            res.redirect("/orcamentos");
        }
    }).catch(err=>{
        console.log(err);
        res.redirect("/");
    });
});

router.post("/orcamentos/pdfMail/:id", (req, res)=>{
    var id = req.params.id;
    var email = req.body.email;
    var orc = req.body.orcamentoCompleto;

    console.log(email);
    console.log(id);
    
    Orcamento.findByPk(id, {include:[{model:Cliente}]}).then(orcamento=>{
        if(orcamento != undefined){
            OrcamentoItens.findAll({
                where:{ orcamentoId: id},
                include: [{model: Produto}]
            }).then(orcamentoItens=>{
                ejs.renderFile(path.join(__dirname, './views/', "template.ejs"), {orcamentoItens:orcamentoItens,orcamento:orcamento}, (err, data) => {
                    if (err) {
                          res.send(err);
                    } else {
                        let options = {
                            "format": "A5",        
                            "type": "pdf", 
                            "base":"file://" + __dirname+"/views/images",
                            "orientation": "portrait",
                            "header": {
                                "height": "20mm"
                            },
                            "footer": {
                                "height": "20mm",
                            },
                        };
                        pdf.create(data, options).toFile("report.pdf", function (err, data) {
                            if (err) {
                                res.redirect("/orcamentos/visualizar/"+id);
                            } else {
                                if(email != undefined){
                                    var EmailEnvio = require('../function/Email'),
                                    envio = new EmailEnvio(email,orc);
                                }
                                console.log("Enviado!");
                                res.redirect("/orcamentos/visualizar/"+id);                         
                            }
                        });
                    }
                });
            });
        }else{
            res.redirect("/orcamentos");
        }
    }).catch(err=>{
        console.log(err);
        res.redirect("/");
    });
});


module.exports = router;


