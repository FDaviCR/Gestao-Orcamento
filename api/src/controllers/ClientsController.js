const Client = require("../models/Clientes");

module.exports = {

    async create(req, res) {
        const body = req.body;
        const header = req.headers;

        await Client.create({
            nome : body.nome,
            cpf : body.cpf,
            cnpj : body.cnpj,
            telefone1 : body.telefone1,
            telefone2 : body.telefone2,
            email : body.email,
            endereco : body.endereco,
            numero : body.numero,
            ativo: true,
            usuario: header.usuario
        }).then(()=>{
            return res.status(200).json({msg:'Cliente criado com sucesso!'})
        }).catch((err)=>{
            return res.send(err.message);
        });
    },

    async list(req, res) {
        const clients = await Client.findAll({where: {ativo: true}});
    
        return res.status(200).json(clients);
    },

    async delete(req, res) {
        const id = req.params.id;

        if(isNaN(id)){
            return res.status(400).json({msg:'Cliente não existe!!'});
        }else{
            await Client.destroy({
                where:{
                    id:id
                }
            })
            return res.status(204).json({msg:'Cliente deletado com sucesso!'});
        }
    },

    async edit(req, res){
        const id = req.params.id;
        const body = req.body;
        const header = req.headers;

        if(isNaN(id)){
            return res.status(400).json({msg:'Cliente não existe!!'});
        }else{
            await Client.update({
                nome : body.nome,
                cpf : body.cpf,
                cnpj : body.cnpj,
                telefone1 : body.telefone1,
                telefone2 : body.telefone2,
                email : body.email,
                endereco : body.endereco,
                numero : body.numero,
                ativo: true,
                usuario: header.usuario
                },{where:{id:id}
            }).then(()=>{
                return res.status(200).json({msg:'Cliente alterado com sucesso!'});
            }).catch((err)=>{
                return res.send(err.message);
            });
        }
    }
}
