const express = require("express");
const router = express.Router();
const Categorias = require("../models/Categorias");
const adminAuth = require("../middleware/adminAuth");


router.get("/categorias/new", adminAuth, (req, res)=>{
    res.render("admin/categorias/new");
});

router.post("/categorias/save", (req, res)=>{
    var nome = req.body.categoria;
    
    console.log( req.session.usuario)
    if(nome != undefined || nome != ' '){
        Categorias.create({
            nome: nome,
            usuario: req.session.usuario,
            ativo: true
        }).then(()=>{
            res.redirect("/categorias");
        })
        
    }else{
        res.redirect("admin/categorias/new");
    }
});

router.get("/categorias", adminAuth,(req, res)=>{
    Categorias.findAll({
        where: {ativo: true}
    }).then(categorias =>{
        res.render("admin/categorias/index", {categorias:categorias});
    });
});

router.post("/categorias/delete", (req, res)=>{
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Categorias.update({ativo:false,usuario: req.session.usuario},{
                where:{
                    id:id
                }
            }).then(()=>{
                res.redirect("/categorias");
                console.log("Apagou");
            })
        }else{
            res.redirect("/categorias");
            console.log("Não-número");
        }
    }else{
        res.redirect("/categorias/new");
        console.log("Vazio");
    }
});

router.get("/categorias/edit/:id", adminAuth,(req, res)=>{
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/categorias");
    }

    Categorias.findByPk(id).then(categoria=>{
        if(categoria != undefined){
            res.render("admin/categorias/edit",{categoria:categoria});
        }else{
            res.redirect("/categorias");
        }
    }).catch(erro=>{
        res.redirect("/categorias");
    })
});

router.post("/categorias/update", (req, res)=>{
    var id = req.body.id;
    var nome = req.body.categoria;

    Categorias.update({nome: nome, usuario: req.session.usuario },{
        where:{
            id:id
        }
    }).then(()=>{
        res.redirect("/categorias");
    })
});

module.exports = router;
