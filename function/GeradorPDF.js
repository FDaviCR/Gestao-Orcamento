let express = require("express");
let app = express();
let pdf = require("html-pdf");
let ejs = require("ejs");
let path = require("path");


app.get("/generateReport", (req, res) => {
    ejs.renderFile(path.join(__dirname, './views/', "template.ejs"), {orcamentos: orcamentos, orcamentoItens:orcamentoItens}, (err, data) => {
    if (err) {
          res.send(err);
    } else {
        let options = {
            "path":"file://" + __dirname+"/views/images",
            "height": "11.25in",
            "width": "8.5in",
            "header": {
                "height": "20mm"
            },
            "footer": {
                "height": "20mm",
            },
        };
        pdf.create(data, options).toFile("report.pdf", function (err, data) {
            if (err) {
                res.send(err);
            } else {
                res.send("Relatório criado com sucesso!");
            }
        });
    }
});
})