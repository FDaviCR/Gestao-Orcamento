const BudgetItems = require("../models/OrcamentoItens");

module.exports = {

    async create(req, res) {
        const body = req.body;
        const header = req.headers;

        await BudgetItems.create({
            quantidade: body.quantidade,
            valorUnitario:body.valorUnitario,
            valorTotal:body.valorTotal,
            orcamentoId:body.orcamentoId,
            produtoId:body.produtoId,
            usuario: 'Teste de API'//req.session.usuario
        }).then(()=>{
            return res.status(200).json({msg:'Orçamento criado com sucesso!'})
        }).catch((err)=>{
            return res.send(err.message);
        });
    },

    async list(req, res) {
        const budgetItems = await BudgetItems.findAll();
    
        return res.status(200).json(budgetItems);
    },

    async delete(req, res) {
        const id = req.params.id;

        if(isNaN(id)){
            return res.status(400).json({msg:'Item não existe!!'});
        }else{
            await BudgetItems.destroy({
                where:{
                    id:id
                }
            })
            return res.status(204).json({msg:'Item deletado com sucesso!'});
        }
    },

    async edit(req, res){
        const id = req.params.id;
        const body = req.body;
        const header = req.headers;

        if(isNaN(id)){
            return res.status(400).json({msg:'Item não existe!!'});
        }else{
            await BudgetItems.update({
                quantidade: body.quantidade,
                valorUnitario:body.valorUnitario,
                valorTotal:body.valorTotal,
                orcamentoId:body.orcamentoId,
                produtoId:body.produtoId,
                usuario: 'Teste de API'//req.session.usuario
                },{where:{id:id}
            }).then(()=>{
                return res.status(200).json({msg:'Item alterado com sucesso!'});
            }).catch((err)=>{
                return res.send(err.message);
            });
        }
    }
}
