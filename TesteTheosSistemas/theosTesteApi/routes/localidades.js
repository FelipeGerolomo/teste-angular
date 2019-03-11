var express = require('express');
var router = express.Router();
var estados = require('../json/estados.json');
var cidades = require('../json/cidades.json');

const response = {
    'status': "SUCCESS",
    'message': "",
    'data': null
}

router.get('/estados', function (req, res, next) {
    res.status(200).json(estados);
});

router.get('/cidades', function (req, res, next) {
    res.status(200).json(cidades);
});

router.get('/estados/:uf/cidade', function (req, res, next) {
    const cities = cidades.filter(el => el['Estado'] == req.params.uf);

    if (cities.length == 0) {
        response['status'] = 'FAIL'
        response['message'] = 'Cidade não encontrada';
        response['data'] = null;
        res.status(404).json(response);
    } else {
        response['status'] = 'SUCCESS'
        response['data'] = cities;
        response['message'] = 'Registro obtido com sucesso';
        res.status(200).json(response);
    }
    
});

module.exports = router;
