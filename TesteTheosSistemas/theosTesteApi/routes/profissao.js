var express = require('express');
var router = express.Router();
var profissoes = require('../json/profissoes.json');
var estados = require('../json/estados.json');
var cidades = require('../json/cidades.json');

const response = {
    'status': "SUCCESS",
    'message': "",
    'data': null
}

router.get('/', function (req, res, next) {
    res.send(profissoes);
});

router.get('/:id', function (req, res, next) {
    const profissao = profissoes.filter(el => el.id == req.params.id);
    if (profissao.length == 0) {
        response['status'] = 'FAIL'
        response['message'] = 'Registro não encontrado';
        response['data'] = null;
        res.status(404).json(response);
    } else {
        response['status'] = 'SUCCESS'
        response['data'] = profissao[0];
        response['message'] = 'Registro obtido com sucesso 😃';
        res.status(200).json(response);
    }
});

router.post('/', function (req, res, next) {
    req.body.id = profissoes.length > 0 ? profissoes.length + 1 : 0;
    let estado = estados.filter(el => el['ID'] == req.body.estado);
    console.log(estado)
    let cities = cidades.filter(el => el['Estado'] == estado[0]['ID']);
    let cidade = cities.filter(el => el['ID'] == req.body.cidade)
    console.log(cidade)
    req.body.estado = estado[0];
    req.body.cidade = cidade[0];
    profissoes.push(req.body);
    response['message'] = 'Registro salvo com sucesso 😃';
    response['data'] = req.body;
    res.status(201).json(response);
});

router.put('/:id', function (req, res, next) {
    const index = profissoes.map(el => el.id).indexOf(parseInt(req.params.id))
    

    let estado = estados.filter(el => el['ID'] == req.body.estado);
    let cities = cidades.filter(el => el['Estado'] == estado[0]['ID']);
    let cidade = cities.filter(el => el['ID'] == req.body.cidade)

    req.body.estado = estado[0];
    req.body.cidade = cidade[0];

    profissoes[index] = req.body;
    profissoes[index].id = parseInt(req.params.id);


    response['message'] = 'Registro atualizado com sucesso 😃';
    response['data'] = null;
    res.status(201).json(response);
});

router.delete('/:id', function (req, res, next) {
    const index = profissoes.map(el => el.id).indexOf(parseInt(req.params.id))
    if (index <= -1) {
        response['status'] = 'FAIL'
        response['message'] = 'Registro não encontrado';
        response['data'] = null;
        res.send(response);
    } else {
        console.log(index)
        profissoes.splice(index, 1)
        response['message'] = 'Registro removido com sucesso 😃';
        res.status(200).json(response);
    }

});

module.exports = router;
