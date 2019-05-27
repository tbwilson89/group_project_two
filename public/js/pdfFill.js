var pdfFillForm = require('pdf-fill-form');
 
pdfFillForm.read('./pdf/w4cfill.pdf')
.then(function(result) {
    console.log(result);
}, function(err) {
    console.log(err);
});