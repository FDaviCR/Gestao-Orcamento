const User = require("../models/Usuarios");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWTSecret = "YouShallNotPass";

module.exports = {
    async create(req, res) {
        const body = req.body;

        await User.findOne({where:{login:body.login, ativo: true}}).then( user => {
            if(user != undefined){
                var correct = bcrypt.compareSync(body.password, user.password);
    
                if(correct){
                    jwt.sign({id: user.id, login: user.login},JWTSecret,{expiresIn:'3m'},(err, token) =>{
                        if(err){
                            res.status(400);
                            res.json({err:"Falha interna!"});
                        }else{
                            res.status(200).json({msg: token})
                        }
                    })
                }else{
                    res.status(401).json({msg: "Senha incorreta!"})
                }
            }else{
                res.status(404).json({msg: "Usuário não encontrado!"});
            }
        });
    }
}