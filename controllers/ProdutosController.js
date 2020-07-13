const express = require("express");
const router = express.Router();
const Produtos = require("../models/Produtos");
const Categorias = require("../models/Categorias");
const Unidades = require("../models/Unidades");
const adminAuth = require("../middleware/adminAuth");


router.get("/produtos/new", adminAuth, (req, res)=>{
    Categorias.findAll().then(categorias=>{
        Unidades.findAll().then(unidades=>{
            res.render("admin/produtos/new",{unidades: unidades, categorias: categorias});
        })
    })   
});

router.post("/produtos/save", (req, res)=>{
    var produto = req.body.produto;
    var categoria = req.body.categoria;
    var valor = req.body.valor;
    var custo = req.body.custo;
    var unidade = req.body.unidade;
	
    if(produto != undefined){
        Produtos.create({
            produto: produto,
            categoria: categoria,
            valor: valor,
            custo: custo,
            unidade: unidade,
            usuario: req.session.usuario,
            ativo: true
        }).then(()=>{
            res.redirect("/produtos");
        })
        
    }else{
        res.redirect("admin/produtos/new");
    }
});

router.get("/produtos", adminAuth,(req, res)=>{
    Produtos.findAll({
        where: {ativo: true}
    }).then(produtos =>{
        res.render("admin/produtos/index", {produtos:produtos});
    });
});

router.post("/produtos/delete", (req, res)=>{
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Produtos.update({ativo:false,usuario: req.session.usuario},{
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
            Categorias.findAll().then(categorias=>{
                Unidades.findAll().then(unidades=>{
                    res.render("admin/produtos/edit",{produto:produto,unidades: unidades, categorias: categorias});
                })
            })   
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
    var categoria = req.body.categoria;
    var valor = req.body.valor;
    var custo = req.body.custo;
    var unidade = req.body.unidade;

    Produtos.update({produto:produto, categoria:categoria, valor:valor, custo:custo, unidade:unidade, usuario: req.session.usuario },{
        where:{
            id:id
        }
    }).then(()=>{
        res.redirect("/produtos");
    })
});

module.exports = router;
