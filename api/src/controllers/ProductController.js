const Product = require("../models/Produtos");

module.exports = {

    async list(req, res) {
        const id = req.params.id;
        const product = await Product.findOne({
            where:{
                id:id
            }
        });  
        return res.status(200).json(product);
    },

    async inactivate(req, res){
        const id = req.params.id;

        await Product.update({ativo:false},{where:{id:id}});
        return res.status(200).json({msg:'Produto Inativado'});
    }

}
