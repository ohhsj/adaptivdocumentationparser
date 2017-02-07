/**
 */

'use strict';

// [START server]
const PORT = process.env.PORT || 8080;
const restify = require('restify');

const server = restify.createServer({
  name: 'appengine-restify',
  version: '1.0.0'
});
// [END server]

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/echo/:name', (req, res, next) => {
	res.send(req.params);
	next();
	return;
});

// [START index]
server.get('/document/:name', (req, res) => {
	//PDF Parser Start
	let fs = require('fs'),
	    PDFParser = require("pdf2json");

	let pdfParser = new PDFParser(this,1);

	pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
	pdfParser.on("pdfParser_dataReady", pdfData => {
	    fs.writeFile("./output_"+req.params.name+"_.txt", pdfParser.getRawTextContent());
	});

	pdfParser.loadPDF("/home/jacksonoh/Documents/Adaptiv/"+req.params.name);
	//PDF Parser End

	res.send('Loaded PDF: '+req.params.name);

});
// [END index]

// [START server_start]
server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
// [END server_start]