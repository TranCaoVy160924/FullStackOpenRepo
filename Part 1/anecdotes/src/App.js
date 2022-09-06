import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const [selected, setSelected] = useState(0)
  const [anecdotesIds, setAnecdotesIds] = useState([])

  const showNext = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const voteForAnecdotes = () => {
    let copy = [...anecdotesIds]
    if (copy[selected] == null) {
      copy[selected] = 1
    } else {
      copy[selected]++
    }
    setAnecdotesIds(copy)
  }

  const getMostVoteAnecdote = () => {
    let max = 0
    let mostVoted = []

    console.log(anecdotes)
    console.log(anecdotesIds)
    //get max vote number
    for (let i = 0; i < anecdotesIds.length; i++) {
      if (anecdotesIds[i] > max) {
        max = anecdotesIds[i]
      }
    }

    //get anecdotes with max number
    for (let i = 0; i < anecdotesIds.length; i++) {
      if (anecdotesIds[i] === max) {
        mostVoted.push(i)
      }
    }

    return {mostVotedList: mostVoted, max: max}
  }

  // console.log({selected})
  // console.log({anecdotesIds})
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <ShowVotes anecdotesIds={anecdotesIds} selected={selected} />
      <div>
        <Button text="next anecdotes" handleClick={showNext} />
        <Button text="vote" handleClick={voteForAnecdotes} />
      </div>

      <h1>Anecdote with most vote</h1>
      <ShowMostVotedAnecdotes mostVoted={getMostVoteAnecdote()} anecdotes={anecdotes} />
    </div>
  )
}

const ShowMostVotedAnecdotes = ({ mostVoted, anecdotes }) => {
  let result = []
  const mostVotedList = [...mostVoted.mostVotedList]

  console.log(mostVotedList)
  // console.log(result)

  for (let i = 0; i < mostVotedList.length; i++) {
    result.push({key: i, text: anecdotes[mostVotedList[i]]})
  }

  if (mostVoted.max > 0) {
    return (
      <>
        {
          result.map(anecdote => (
            <>
              <div key={anecdote.key}>{anecdote.text}</div><br key={anecdote.key}></br>
            </>
          ))
        }
        <div>Each has {mostVoted.max} votes</div>
      </>
    )
  }
}

const ShowVotes = ({ anecdotesIds, selected }) => {
  let numOfVotes = anecdotesIds[selected]
  if (numOfVotes == null) {
    numOfVotes = 0
  }

  return (<div>has {numOfVotes} votes</div>)
}

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

export default App