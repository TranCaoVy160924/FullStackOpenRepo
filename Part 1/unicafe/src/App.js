import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good + 1);
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad = () => setBad(bad + 1)

  return (
    <div>
      <Title text="give feedback" />
      <FeedbackButton handleClick={addGood} text="good" />
      <FeedbackButton handleClick={addNeutral} text="neutral" />
      <FeedbackButton handleClick={addBad} text="bad" />

      <Title text="statistic" />
      <Statistics statistic={[good, neutral, bad]} />
    </div>
  )
}

const Statistics = (props) => {
  const good = props.statistic[0]
  const neutral = props.statistic[1]
  const bad = props.statistic[2]
  const all = good + neutral + bad
  let feedback

  const getAverage = () => (good * 1 + bad * -1) / all
  const getGoodPercentage = () => good * 100 / all + " %"

  if (all > 0) {
    feedback = (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={getAverage()} />
          <StatisticLine text="percentage" value={getGoodPercentage()} />
        </tbody>

      </table>
    )
  } else {
    feedback = (<>No feedback given</>)
  }

  return feedback
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Title = ({ text }) => (
  <h1>{text}</h1>
)

const FeedbackButton = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

export default App