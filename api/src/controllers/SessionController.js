const User = require("../models/Usuarios");
const bcrypt = require('bcryptjs');

module.exports = {
    async create(req, res) {
        const body = req.body;

        await User.findOne({where:{login:body.login, ativo: true}}).then( user => {
            if(user != undefined){
                var correct = bcrypt.compareSync(body.password, user.password);
    
                if(correct){
                    res.status(200).json({msg: "Acesso permitido!"})
                }else{
                    res.status(401).json({msg: "Senha incorreta!"})
                }
            }else{
                res.status(404).json({msg: "Usuário não encontrado!"});
            }
        });
    }
}