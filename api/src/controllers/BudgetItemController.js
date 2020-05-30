const BudgetItem = require("../models/OrcamentoItens");

module.exports = {

    async list(req, res) {
        const id = req.params.id;
        const budgetItem = await BudgetItem.findOne({
            where:{
                id:id
            }
        });  
        return res.status(200).json(budgetItem);
    }
}

