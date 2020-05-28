const connection = require("../../database/database");
const User = require("../models/Usuarios");

module.exports = {

    async list(req, res) {
        const id = req.params.id;
        const user = await User.findOne({
            where:{
                id:id
            }
        });  
        return res.status(200).json(user);
    },

    async inactivate(req, res){
        const id = req.params.id;

        await User.update({ativo:false},{where:{id:id}});
        return res.status(200).json({msg:'Usuário Inativado'});
    }

}