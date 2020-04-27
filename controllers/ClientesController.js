const express = require("express");
const router = express.Router();
const Clientes = require("../models/Clientes");
const adminAuth = require("../middleware/adminAuth");


router.get("/clientes/new", adminAuth, (req, res)=>{
    res.render("admin/clientes/new");
});

router.post("/clientes/save", (req, res)=>{
    var nome = req.body.nome;
    var cpf = req.body.cpf;
    var cnpj = req.body.cnpj;
    var telefone1 = req.body.telefone1;
    var telefone2 = req.body.telefone2;
    var email = req.body.email;
    var endereco = req.body.endereco;
    var numero = req.body.numero;
	
    if(nome != undefined){
        Clientes.create({
            nome: nome,
            cpf: cpf,
            cnpj: cnpj,
            telefone1: telefone1,
            telefone2: telefone2,
            email: email,
            endereco: endereco,
            numero: numero,
            ativo: true,
            usuario: req.session.usuario
        }).then(()=>{
            res.redirect("/clientes");
        })
        
    }else{
        res.redirect("admin/clientes/new");
    }
});

router.get("/clientes", adminAuth,(req, res)=>{
    //var GeradorPDF = require('../../function/GeradorPDF'),
    //envio = new GeradorPDF();
    Clientes.findAll({
        where: {ativo:true}
    }).then(clientes =>{
        res.render("admin/clientes/index", {clientes:clientes});
    });
});

router.post("/clientes/delete", (req, res)=>{
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Clientes.update({ativo: false,usuario: req.session.usuario},{
                where:{
                    id:id
                }
            }).then(()=>{
                res.redirect("/clientes");
                console.log("Apagou");
            })
        }else{
            res.redirect("/clientes");
            console.log("Não-número");
        }
    }else{
        res.redirect("/clientes/new");
        console.log("Vazio");
    }
});

router.get("/clientes/edit/:id", adminAuth,(req, res)=>{
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/clientes");
    }

    Clientes.findByPk(id).then(cliente=>{
        if(cliente != undefined){
            res.render("admin/clientes/edit",{cliente:cliente});
        }else{
            res.redirect("/clientes");
        }
    }).catch(erro=>{
        res.redirect("/clientes");
    })
});

router.post("/clientes/update", (req, res)=>{
    var id = req.body.id;
    var nome = req.body.nome;
    var cpf = req.body.cpf;
    var cnpj = req.body.cnpj;
    var telefone1 = req.body.telefone1;
    var telefone2 = req.body.telefone2;
    var email = req.body.email;
    var endereco = req.body.endereco;
    var numero = req.body.numero;

    Clientes.update({nome: nome,cpf: cpf,cnpj: cnpj,telefone1: telefone1,telefone2: telefone2,email: email,endereco: endereco,numero: numero,usuario: req.session.usuario},{
        where:{
            id:id
        }
    }).then(()=>{
        res.redirect("/clientes");
    })
});

module.exports = router;
