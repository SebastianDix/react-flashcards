import logo from './logo.svg';
import FlashcardList from './FlashcardList'
import './App.css';
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const SAMPLE_FLASHCARDS = [
  { id: 1, 
    question: 'What is 2 + 2?',
    answer:"4",
    options:[
      "2","3","4","5"
    ]
  },
  { id: 2, 
    question: 'What is 3 + 2?',
    answer:"5",
    options:[
      "2","3","4","5"
    ]
  }
]

// // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//   }
// }

function App() {
  const [flashcards,setFlashcards] = useState(SAMPLE_FLASHCARDS) // react hook defining setter

  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=10')
    .then(res => {
      setFlashcards(res.data.results.map((questionItem,index) => {
        const answer = decodeString(questionItem.correct_answer)
        const options = [...questionItem.incorrect_answers.map(a => decodeString(a)), answer]
        return {
          id: `${index}-${Date.now()}`,
          question: decodeString(questionItem.question),
          answer: questionItem.correct_answer,
          options:options.sort(() => Math.random() - .5)
        }
      }))
    }
    )
  },[])

  function decodeString(str){
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

  return (
    <div className='container'>
      <FlashcardList flashcards={flashcards} />
    </div>
  );
}


export default App;
