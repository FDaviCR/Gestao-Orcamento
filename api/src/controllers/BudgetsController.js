const Budget = require("../models/Orcamentos");

module.exports = {

    async create(req, res) {
        const body = req.body;
        const header = req.headers;

        await Budget.create({
            clienteId: body.clienteId,
            tipo: body.tipo,
            formPagamento: body.formPagamento,
            valor: body.valor,
            aprovado: body.aprovado,
            ativo:true,
            usuario: 'Teste de API'//req.session.usuario
        }).then(()=>{
            return res.status(200).json({msg:'Orçamento criado com sucesso!'})
        }).catch((err)=>{
            return res.send(err.message);
        });
    },

    async list(req, res) {
        const budgets = await Budget.findAll({where: {ativo: true}});
    
        return res.status(200).json(budgets);
    },

    async delete(req, res) {
        const id = req.params.id;

        if(isNaN(id)){
            return res.status(400).json({msg:'Orçamento não existe!!'});
        }else{
            await Budget.destroy({
                where:{
                    id:id
                }
            })
            return res.status(204).json({msg:'Orçamento deletado com sucesso!'});
        }
    },

    async edit(req, res){
        const id = req.params.id;
        const body = req.body;
        const header = req.headers;

        if(isNaN(id)){
            return res.status(400).json({msg:'Orçamento não existe!!'});
        }else{
            await Budget.update({
                clienteId: body.clienteId,
                tipo: body.tipo,
                formPagamento: body.formPagamento,
                valor: body.valor,
                aprovado: body.aprovado,
                ativo:true,
                usuario: 'Teste de API'//req.session.usuario
                },{where:{id:id}
            }).then(()=>{
                return res.status(200).json({msg:'Orçamento alterado com sucesso!'});
            }).catch((err)=>{
                return res.send(err.message);
            });
        }
    }
}
