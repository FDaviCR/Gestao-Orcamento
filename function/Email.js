const nodemailer = require("nodemailer");

//Configurado para Gmail
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "davi.jonin@gmail.com", //Adicionar endereço de  email
        pass: "Shinobiwar1994"              //Adicionar senha do email
    }
});

module.exports = async function Email(destinatario, orcamento){
    this.destinatario = destinatario;
    this.orcamento = orcamento;

    await transporter.sendMail({
        from: "davi.jonin@gmail.com", //Adicionar endereço de  email
        to: destinatario,
        subject: "Orçamento Teste Aptum",
        text: "Olá! Seu orçamento segue em anexo!",
        attachments:[
            {
                filename: 'report.pdf',       
                path: './report.pdf',                                  
                contentType: 'application/pdf'
            }
        ]
    }).then(message => {
        console.log(message);
    }).catch(err =>{
        console.log(err);
    })
}