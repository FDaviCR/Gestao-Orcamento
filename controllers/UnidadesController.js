const express = require("express");
const router = express.Router();
const unidades = require("../models/Unidades");
const adminAuth = require("../middleware/adminAuth");
const con = require("../database/database");


router.get("/unidades/new", adminAuth, (req, res)=>{
    res.render("admin/unidades/new");
});

router.post("/unidades/save", (req, res)=>{
    var nome = req.body.nome;
    var status = req.body.status;
	
    if(nome != undefined){
        con.query('INSERT INTO unidades (nome,status,usuario) VALUES (:nome,:status,:usuario)',{
            replacements: {
                nome:nome,detalhes:detalhes,status:status,usuario: req.session.usuario
            },
            type: con.QueryTypes.INSERT
         
        }).then(()=>{
            res.redirect("/unidades");
        })
    }else{
        res.redirect("admin/unidades/new");
    }
});

router.get("/unidades", adminAuth,(req, res)=>{
    unidades.findAll().then(unidades =>{
        res.render("admin/unidades/index", {unidades:unidades});
    });
});

router.get("/unidades/edit/:id", adminAuth,(req, res)=>{
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/unidades");
    }

    unidades.findByPk(id).then(estoque=>{
        if(estoque != undefined){
            res.render("admin/unidades/edit",{estoque:estoque});
        }else{
            res.redirect("/unidades");
        }
    }).catch(erro=>{
        res.redirect("/unidades");
    })
});

router.post("/unidades/update", (req, res)=>{
    var id = req.body.id;
    var nome = req.body.nome;
    var status = req.body.status;

    unidades.update({nome:nome, status:status, usuario: req.session.usuario},{
        where:{
            id:id
        }
    }).then(()=>{
        res.redirect("/unidades");
    })
});

module.exports = router;
