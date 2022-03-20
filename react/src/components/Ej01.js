import { useState, useEffect } from "react"

import '../App.css'
import boca from '../assets/boca.png'

function Ej01() {

    const [word, setWord] = useState()
    const [phonetics, setPhonetics] = useState([])

    let handleSubmit = async (e) => {

        e.preventDefault();

        if (word !== "") {

            fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word, {})
            //.then(function(res){ localStorage.setItem('tkn', res.json().token)  })
            .then((res) => res.json())
            .then((data) => setPhonetics(data[0].phonetics))
            .catch(function(res){ console.log(res) })

            fetch('http://localhost:5300/word/', {
                headers: {
                    // 'auth-token': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({word: word})
            })
            .then(function(res){ getAllWords() })
            .catch(function(res){ console.log(res) })
        }

        setWord("")
    }
    let handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "word") setWord(value);
    }

    const [words, setWords] = useState([]);

    useEffect(() => {
        getAllWords()
    }, [])

    async function getAllWords() {
        const req = await fetch('http://localhost:5300/word/')
        const data = await req.json()
        setWords(data.datos)
    }

    async function deleteWord(str) {

        fetch('http://localhost:5300/word/' + str, {
            headers: {
                // 'auth-token': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
        })
        .then(function(res){ getAllWords() })
        .catch(function(res){ console.log(res) })
    }

    return (
        <div className="mainDiv">
            <div className="border">
                <img src={boca} className="boca"/>
                <h1>Transcripcion Fonetica</h1>
                <form onSubmit={handleSubmit}>
                    <label>Insertar palabra a buscar:&nbsp;
                        <input name="word" value={word} onChange={handleChange}/>
                    </label>&nbsp;
                    <input type="submit" value="Enviar" />
                </form>
                <div>
                    {phonetics.map((phonema, index) => <div key={index} className="phon">{phonema.text}<br></br> <audio controls><source src={phonema.audio} type="audio/mpeg"/>Your browser does not support the audio element.</audio> </div>)}
                </div>
            </div>
            <div className="border">
                <h1>Words searched</h1>
                <div>
                    {words.map(word => <div key={word._id}>{word.word}&nbsp;<button onClick={() => deleteWord(word._id)}>Delete</button> </div> )}
                </div>
            </div>
        </div>
    );
}

export default Ej01;