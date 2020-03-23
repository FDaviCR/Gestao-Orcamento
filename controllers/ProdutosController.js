const express = require("express");
const router = express.Router();
const Produtos = require("../models/Produtos");
const adminAuth = require("../middleware/adminAuth");


router.get("/produtos/new", adminAuth, (req, res)=>{
    res.render("admin/produtos/new");
});

router.post("/produtos/save", (req, res)=>{
    var produto = req.body.produto;
	var valor = req.body.valor;
	
    if(produto != undefined){
        Produtos.create({
            produto: produto,
            valor: valor,
            usuario: req.session.usuario
        }).then(()=>{
            res.redirect("/produtos");
        })
        
    }else{
        res.redirect("admin/produtos/new");
    }
});

router.get("/produtos", adminAuth,(req, res)=>{
    Produtos.findAll().then(produtos =>{
        res.render("admin/produtos/index", {produtos:produtos});
    });
});

router.post("/produtos/delete", (req, res)=>{
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Produtos.destroy({
                where:{
                    id:id
                }
            }).then(()=>{
                res.redirect("/produtos");
                console.log("Apagou");
            })
        }else{
            res.redirect("/produtos");
            console.log("Não-número");
        }
    }else{
        res.redirect("/produtos/new");
        console.log("Vazio");
    }
});

router.get("/produtos/edit/:id", adminAuth,(req, res)=>{
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/produtos");
    }

    Produtos.findByPk(id).then(produto=>{
        if(produto != undefined){
            res.render("admin/produtos/edit",{produto:produto});
        }else{
            res.redirect("/produtos");
        }
    }).catch(erro=>{
        res.redirect("/produtos");
    })
});

router.post("/produtos/update", (req, res)=>{
    var id = req.body.id;
    var produto = req.body.produto;
	var valor = req.body.valor;

    Produtos.update({produto:produto, valor: valor },{
        where:{
            id:id
        }
    }).then(()=>{
        res.redirect("/produtos");
    })
});

module.exports = router;
