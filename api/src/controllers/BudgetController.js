const Budget = require("../models/Orcamentos");

module.exports = {

    async list(req, res) {
        const id = req.params.id;
        const budget = await Budget.findOne({
            where:{
                id:id
            }
        });  
        return res.status(200).json(budget);
    },

    async inactivate(req, res){
        const id = req.params.id;

        await Budget.update({ativo:false},{where:{id:id}});
        return res.status(200).json({msg:'Orçamento Inativado'});
    }

}
