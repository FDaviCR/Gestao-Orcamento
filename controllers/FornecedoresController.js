const express = require("express");
const router = express.Router();
const Fornecedores = require("../models/Fornecedores");
const adminAuth = require("../middleware/adminAuth");


router.get("/fornecedores/new", adminAuth, (req, res)=>{
    res.render("admin/fornecedores/new");
});

router.post("/fornecedores/save", (req, res)=>{
    var nome = req.body.nome;
    var tipo_documento = req.body.tipo_documento;
    var cpf = req.body.cpf;
    var cnpj = req.body.cnpj;
    var inscricao_municipal = req.body.inscricao_municipal;
    var inscricao_estadual = req.body.inscricao_estadual;
    var telefone1 = req.body.telefone1;
    var telefone2 = req.body.telefone2;
    var email = req.body.email;
    var endereco = req.body.endereco;
    var numero = req.body.numero;
	
    if(nome != undefined){
        Fornecedores.create({
            nome: nome,
            tipo_documento: tipo_documento,
            cpf: cpf,
            cnpj: cnpj,
            inscricao_municipal: inscricao_municipal,
            inscricao_estadual: inscricao_estadual,
            telefone1: telefone1,
            telefone2: telefone2,
            email: email,
            endereco: endereco,
            numero: numero,
            ativo: true,
            usuario: req.session.usuario
        }).then(()=>{
            res.redirect("/fornecedores");
        })
        
    }else{
        res.redirect("admin/fornecedores/new");
    }
});

router.get("/fornecedores", adminAuth,(req, res)=>{
    Fornecedores.findAll({
        where: {ativo: true}
    }).then(fornecedores =>{
        res.render("admin/fornecedores/index", {fornecedores:fornecedores});
    });
});

router.post("/fornecedores/delete", (req, res)=>{
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Fornecedores.update({ativo: false,usuario: req.session.usuario} ,{
                where:{
                    id:id
                }
            }).then(()=>{
                res.redirect("/fornecedores");
                console.log("Apagou");
            })
        }else{
            res.redirect("/fornecedores");
            console.log("Não-número");
        }
    }else{
        res.redirect("/fornecedores/new");
        console.log("Vazio");
    }
});

router.get("/fornecedores/edit/:id", adminAuth,(req, res)=>{
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/fornecedores");
    }

    Fornecedores.findByPk(id).then(fornecedor=>{
        if(fornecedor != undefined){
            res.render("admin/fornecedores/edit",{fornecedor:fornecedor});
        }else{
            res.redirect("/fornecedores");
        }
    }).catch(erro=>{
        res.redirect("/fornecedores");
    })
});

router.post("/fornecedores/update", (req, res)=>{
    var id = req.body.id;
    var nome = req.body.nome;
    var tipo_documento = req.body.tipo_documento;
    var cpf = req.body.cpf;
    var cnpj = req.body.cnpj;
    var inscricao_municipal = req.body.inscricao_municipal;
    var inscricao_estadual = req.body.inscricao_estadual;
    var telefone1 = req.body.telefone1;
    var telefone2 = req.body.telefone2;
    var email = req.body.email;
    var endereco = req.body.endereco;
    var numero = req.body.numero;

    Fornecedores.update({nome: nome, tipo_documento: tipo_documento,cpf: cpf,cnpj: cnpj,inscricao_municipal: inscricao_municipal,inscricao_estadual: inscricao_estadual,telefone1: telefone1,telefone2: telefone2,email: email,endereco: endereco,numero: numero,usuario: req.session.usuario},{
        where:{
            id:id
        }
    }).then(()=>{
        res.redirect("/fornecedores");
    })
});

module.exports = router;
