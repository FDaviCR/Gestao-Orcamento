const express = require("express");
const router = express.Router();
const Unidades = require("../models/Unidades");
const adminAuth = require("../middleware/adminAuth");


router.get("/unidades/new", adminAuth, (req, res)=>{
    res.render("admin/unidades/new");
});

router.post("/unidades/save", (req, res)=>{
    var nome = req.body.unidade;
    
    console.log( req.session.usuario)
    if(nome != undefined || nome != ' '){
        Unidades.create({
            nome: nome,
            usuario: req.session.usuario,
            ativo: true
        }).then(()=>{
            res.redirect("/unidades");
        })
        
    }else{
        res.redirect("admin/unidades/new");
    }
});

router.get("/unidades", adminAuth,(req, res)=>{
    Unidades.findAll({
        where: {ativo: true}
    }).then(unidades =>{
        res.render("admin/unidades/index", {unidades:unidades});
    });
});

router.post("/unidades/delete", (req, res)=>{
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Unidades.update({ativo:false,usuario: req.session.usuario},{
                where:{
                    id:id
                }
            }).then(()=>{
                res.redirect("/unidades");
                console.log("Apagou");
            })
        }else{
            res.redirect("/unidades");
            console.log("Não-número");
        }
    }else{
        res.redirect("/unidades/new");
        console.log("Vazio");
    }
});

router.get("/unidades/edit/:id", adminAuth,(req, res)=>{
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/unidades");
    }

    Unidades.findByPk(id).then(unidade=>{
        if(unidade != undefined){
            res.render("admin/unidades/edit",{unidade:unidade});
        }else{
            res.redirect("/unidades");
        }
    }).catch(erro=>{
        res.redirect("/unidades");
    })
});

router.post("/unidades/update", (req, res)=>{
    var id = req.body.id;
    var nome = req.body.unidade;

    Unidades.update({nome: nome, usuario: req.session.usuario },{
        where:{
            id:id
        }
    }).then(()=>{
        res.redirect("/unidades");
    })
});

module.exports = router;
