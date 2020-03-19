const express = require("express");
const router = express.Router();
const Estoques = require("../models/Estoques");
const adminAuth = require("../middleware/adminAuth");


router.get("/estoques/new", adminAuth, (req, res)=>{
    res.render("admin/estoques/new");
});

router.post("/estoques/save", (req, res)=>{
    var descricao = req.body.descricao;
    var detalhes = req.body.detalhes;
    var status = req.body.status;
	
    if(descricao != undefined){
        Estoques.create({
            descricao: descricao,
            detalhes: detalhes,
            status: status
        }).then(()=>{
            res.redirect("/estoques");
        })
        
    }else{
        res.redirect("admin/estoques/new");
    }
});

router.get("/estoques", adminAuth,(req, res)=>{
    Estoques.findAll().then(estoques =>{
        res.render("admin/estoques/index", {estoques:estoques});
    });
});

router.get("/estoques/edit/:id", adminAuth,(req, res)=>{
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/estoques");
    }

    Estoques.findByPk(id).then(estoque=>{
        if(estoque != undefined){
            res.render("admin/estoques/edit",{estoque:estoque});
        }else{
            res.redirect("/estoques");
        }
    }).catch(erro=>{
        res.redirect("/estoques");
    })
});

router.post("/estoques/update", (req, res)=>{
    var id = req.body.id;
    var descricao = req.body.descricao;
    var detalhes = req.body.detalhes;
    var status = req.body.status;

    Estoques.update({descricao:descricao, detalhes:detalhes, status:status},{
        where:{
            id:id
        }
    }).then(()=>{
        res.redirect("/estoques");
    })
});

module.exports = router;
