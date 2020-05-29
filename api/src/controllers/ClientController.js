const Client = require("../models/Clientes");

module.exports = {

    async list(req, res) {
        const id = req.params.id;
        const client = await Client.findOne({
            where:{
                id:id
            }
        });  
        return res.status(200).json(client);
    },

    async inactivate(req, res){
        const id = req.params.id;

        await Client.update({ativo:false},{where:{id:id}});
        return res.status(200).json({msg:'Cliente Inativado'});
    }

}
