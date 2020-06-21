const nodemailer = require("nodemailer");

//Configurado para Gmail
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: "davi.jonin@gmail.com", //Adicionar endereço de  email
        pass: "$hinobiw@r1994"        //Adicionar senha do email
    }
});


module.exports = function Email(destinatario, orcamento){
    this.destinatario = destinatario;
    this.orcamento = orcamento;

    transporter.sendMail({
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
        console.log(message, new Date().getTime());
    }).catch(err =>{
        console.log(err);
    })
}