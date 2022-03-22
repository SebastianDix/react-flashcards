import React from 'react'
import Flashcard from './Flashcard'

export default function FlashcardList({ flashcards }){
    console.log(flashcards)
    return (
        <div className="card-grid">
            {flashcards.map(flashcard => {
                return <Flashcard flashcard={flashcard} key={flashcard.id}/>/*
                    Why key?
                    Because when React re-renders it will re-render only stuff
                    which changed
                    Key = unique id which we can uniquely associate with eac elem
                */
            })}   
        </div>
    )
}