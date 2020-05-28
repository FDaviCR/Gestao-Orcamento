const connection = require("../../database/database");
const User = require("../models/Usuarios");
const bcrypt = require('bcryptjs');

module.exports = {
    async create(req, res) {
        const body = req.body;
        const header = req.headers;
    
        await User.findOne({where:{login: body.login}}).then(async user =>{
            if(user == undefined){
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(body.password, salt)
    
                await User.create({
                    login: body.login,
                    password: hash,
                    usuario: 'Teste de API'//req.session.usuario
                });
                const response = {
                    status: 200,
                    mensagem: 'Produto inserido com sucesso!'};
                return res.send(response);
                
            }else{
                const response = {
                    status: 409,
                    mensagem: 'Usuário já cadastrado!'};
                return res.send(response);
            }
        })   
    },
    
    async list(req, res) {
        const users = await User.findAll();
    
        return res.json(users);
    },

    async delete(req, res) {
        const id = req.params.id;

        if(isNaN(id)){
            return res.status(400).json({msg:'Usuário não existe!!'});
        }else{
            await User.destroy({
                where:{
                    id:id
                }
            })
            return res.status(204).json({msg:'Usuário deletado com sucesso!'});
        }
    }
}