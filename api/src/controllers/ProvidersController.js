const Provider = require("../models/Fornecedores");

module.exports = {

    async create(req, res) {
        const body = req.body;
        const header = req.headers;

        await Provider.create({
            nome: body.nome,
            tipo_documento: body.tipo_documento,
            cpf: body.cpf,
            cnpj: body.cnpj,
            inscricao_municipal: body.inscricao_municipal,
            inscricao_estadual: body.inscricao_estadual,
            telefone1: body.telefone1,
            telefone2: body.telefone2,
            email: body.email,
            endereco: body.endereco,
            numero: body.numero,
            ativo: true,
            usuario: 'Teste de API'//req.session.usuario
        }).then(()=>{
            return res.status(200).json({msg:'Fornecedor criado com sucesso!'})
        }).catch((err)=>{
            return res.send(err.message);
        });
    },

    async list(req, res) {
        const providers = await Provider.findAll({where: {ativo: true}});
    
        return res.status(200).json(providers);
    },

    async delete(req, res) {
        const id = req.params.id;

        if(isNaN(id)){
            return res.status(400).json({msg:'Fornecedor não existe!!'});
        }else{
            await Provider.destroy({
                where:{
                    id:id
                }
            })
            return res.status(204).json({msg:'Fornecedor deletado com sucesso!'});
        }
    },

    async edit(req, res){
        const id = req.params.id;
        const body = req.body;
        const header = req.headers;

        if(isNaN(id)){
            return res.status(400).json({msg:'Fornecedor não existe!!'});
        }else{
            await Provider.update({
                nome: body.nome,
                tipo_documento: body.tipo_documento,
                cpf: body.cpf,
                cnpj: body.cnpj,
                inscricao_municipal: body.inscricao_municipal,
                inscricao_estadual: body.inscricao_estadual,
                telefone1: body.telefone1,
                telefone2: body.telefone2,
                email: body.email,
                endereco: body.endereco,
                numero: body.numero,
                ativo: true,
                usuario: 'Teste de API'
                },{where:{id:id}
            }).then(()=>{
                return res.status(200).json({msg:'Fornecedor alterado com sucesso!'});
            }).catch((err)=>{
                return res.send(err.message);
            });
        }
    }
}
