const Product = require("../models/Produtos");

module.exports = {

    async create(req, res) {
        const body = req.body;
        const header = req.headers;

        await Product.create({
            produto: body.produto,
            categoria: body.categoria,
            valor: body.valor,
            custo: body.custo,
            unidade: body.unidade,
            usuario: 'teste de API',//header.usuario,
            ativo: true
        }).then(()=>{
            return res.status(200).json({msg:'Produto criado com sucesso!'})
        }).catch((err)=>{
            return res.send(err.message);
        });
    },

    async list(req, res) {
        const products = await Product.findAll({where: {ativo: true}});
    
        return res.status(200).json(products);
    },

    async delete(req, res) {
        const id = req.params.id;

        if(isNaN(id)){
            return res.status(400).json({msg:'Produto não existe!!'});
        }else{
            await Product.destroy({
                where:{
                    id:id
                }
            })
            return res.status(204).json({msg:'Produto deletado com sucesso!'});
        }
    },

    async edit(req, res){
        const id = req.params.id;
        const body = req.body;
        const header = req.headers;

        if(isNaN(id)){
            return res.status(400).json({msg:'Produto não existe!!'});
        }else{
            await Product.update({
                produto: body.produto,
                categoria: body.categoria,
                valor: body.valor,
                custo: body.custo,
                unidade: body.unidade,
                usuario: header.usuario,
                ativo: true
                },{where:{id:id}
            }).then(()=>{
                return res.status(200).json({msg:'Produto alterado com sucesso!'});
            }).catch((err)=>{
                return res.send(err.message);
            });
        }
    }
}
