const nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "davi.jonin@gmail.com",
        pass: "Shinobiwar"
    }
});

module.exports = function Email(destinatario, orcamento){
    this.destinatario = destinatario;
    this.orcamento = orcamento;

    transporter.sendMail({
        from: "davi.jonin@gmail.com",
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