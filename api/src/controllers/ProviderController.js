const Provider = require("../models/Fornecedores");

module.exports = {

    async list(req, res) {
        const id = req.params.id;
        const provider = await Provider.findOne({
            where:{
                id:id
            }
        });  
        return res.status(200).json(provider);
    },

    async inactivate(req, res){
        const id = req.params.id;

        await Provider.update({ativo:false},{where:{id:id}});
        return res.status(200).json({msg:'Fornecedor Inativado'});
    }

}
