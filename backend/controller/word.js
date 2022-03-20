import {Word} from '../model/word.js';

async function getAll(req,res) {
   try{
       let word = await Word.find();
       res.status(200).json({accion:'get all', datos: word}) 
   }catch(err){
       res.status(500).json({accion:'get all', mensaje:'error al obtener las palabras'}) 
   }
}

async function findByWord(word) {
    let reqWord = word;
    try {
        let findedWord = await Word.find({word: reqWord});
        res.status(200).json({accion:'get one', datos: findedWord}) 
    } catch(err) {
        res.status(500).json({accion:'get one', mensaje:'error al obtener lal palabra'}) 
    }
}

async function insert(req, res) {

    const word = new Word(req.body)

    const existingWord = await Word.findOne({ word: req.body.word});
  
    if (existingWord) {
        return res.status(400).json({ error: "Word alredy exists!" });
    } else {
        try{
            let wordSaved = await word.save();
            res.status(200).json({accion:'save', datos: wordSaved}) 
        }catch(err){
            console.log(err)
            res.status(500).json({accion:'save', mensaje:'error al guardar la palabra'}) 
        }
    }
}

async function remove(req,res){
    let wordId = req.params.id;
    console.log(wordId)
    try{
        let deletedWord = await Word.findByIdAndDelete(wordId);
        res.status(200).json({accion:'delete', datos: deletedWord}) 
    }catch(err){
        res.status(500).json({accion:'delete', mensaje:'error al borrar la palabra'}) 
    }
}


async function getById(req,res) {
    let productoId = req.params.id;
    try{
        let producto = await Word.findById(productoId);
        res.status(200).json({accion:'get one', datos: producto}) 
    }catch(err){
        res.status(500).json({accion:'get one', mensaje:'error al obtener el producto'}) 
    }
}



export { getAll, insert, remove, findByWord, getById}


