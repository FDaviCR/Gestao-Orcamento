const express = require("express");
const router = express.Router();
const categorias = require("../models/Categorias");
const adminAuth = require("../middleware/adminAuth");
const con = require("../database/database");


router.get("/categorias/new", adminAuth, (req, res)=>{
    res.render("admin/categorias/new");
});

router.post("/categorias/save", (req, res)=>{
    var nome = req.body.nome;
    var status = req.body.status;
	
    if(nome != undefined){
        con.query('INSERT INTO categorias (nome,status,usuario) VALUES (:nome,:status,:usuario)',{
            replacements: {
                nome:nome,detalhes:detalhes,status:status,usuario: req.session.usuario
            },
            type: con.QueryTypes.INSERT
         
        }).then(()=>{
            res.redirect("/categorias");
        })
    }else{
        res.redirect("admin/categorias/new");
    }
});

router.get("/categorias", adminAuth,(req, res)=>{
    categorias.findAll().then(categorias =>{
        res.render("admin/categorias/index", {categorias:categorias});
    });
});

router.get("/categorias/edit/:id", adminAuth,(req, res)=>{
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/categorias");
    }

    categorias.findByPk(id).then(estoque=>{
        if(estoque != undefined){
            res.render("admin/categorias/edit",{estoque:estoque});
        }else{
            res.redirect("/categorias");
        }
    }).catch(erro=>{
        res.redirect("/categorias");
    })
});

router.post("/categorias/update", (req, res)=>{
    var id = req.body.id;
    var nome = req.body.nome;
    var status = req.body.status;

    categorias.update({nome:nome, status:status, usuario: req.session.usuario},{
        where:{
            id:id
        }
    }).then(()=>{
        res.redirect("/categorias");
    })
});

module.exports = router;
