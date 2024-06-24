const express = require('express');
const { message } = require('statuses');
const app = express();
const port = 3000;

app.use(express.json());

let destinos = [];

    // Rota para obter todos os destinos
    app.get('/destinos', (req, res) => {
        res.json(destinos);
    });
    
    // Rota para adicionar 
    app.post('/destinos', (req, res) => {
        const destino = req.body;
        destinos.push(destino);
        res.json(destino);
    });
    
    // Rota para atualizar 
    app.put('/destinos/:id', (req, res) => {
        const id = req.params.id;
        const updatedDestino = req.body;
        destinos = destinos.map(destino => {
            if (destino.id == id) {
                return { ...destino, name: updatedDestino.name };
            }
            return destino;
        });
        res.json(updatedDestino);
    });
    
    // Rota para deletar 
    app.delete('/destinos/:id', (req, res) => {
        const id = req.params.id;
        destinos = destinos.filter(destino => destino.id != id);
        res.json({ message: 'Destino deletedo' });
    });


   
    //Rota Avaliação de Destinos
    app.post('/destinos/:id/avaliacao', (req, res) => {
        const {id} = req.params;
        const {nota} = req.body;
        res.json({message: 'Avaliação registrada com sucesso"'});
    });


    //Rota Pesquisa de Destinos e Localização

    app.get('/destinos/pesquisa', (req, res) => {
        const { destino, localizacao } = req.query;
        const resultados = destinos.filter(d => {
            return (destino ? d.destino.toLowerCase().includes(destino.toLowerCase()) : true) &&
                   (localizacao ? d.localizacao.toLowerCase().includes(localizacao.toLowerCase()) : true);
        });
        res.json(resultados);
    });

    // Rota para pesquisar destinos com o parâmetro 'detalhes'
    app.get('/destinos/detalhes', (req, res) => {
        const { detalhes } = req.query;
        const resultados = destinos.filter(d => d.detalhes && d.detalhes.toLowerCase().includes(detalhes.toLowerCase()));
        res.json(resultados);
    });
    
    // Inicia o servidor
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
    