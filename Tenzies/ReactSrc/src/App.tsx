import { useState, useEffect } from 'react';
import Die from './components/Die';
import { DiceInterface } from './interfaces';
import Confetti from 'react-confetti';

//constant to set the number of Dice - Should be 10
const NUMBER_OF_DICE = 10;

//start of App Component
const App = () => {
  const [dice, setDice] = useState(newSetOfDice());
  const [tenzies, setTenzies] = useState(false);
  const [rolls, setrolls] = useState(1);

  useEffect(() => {
    const firstValue = dice[0].value;
    const hasHeldAll = dice.every((d) => d.held);
    const hasAllValue = dice.every((d) => d.value === firstValue);

    if (hasHeldAll && hasAllValue) {
      setTenzies(true);
    }
  }, [dice]);

  //generate a random number for the dice value
  function generateRandomNumber() {
    return Math.floor(Math.random() * 6) + 1;
  }

  //grab a new set of dice
  function newSetOfDice() {
    const arr: DiceInterface[] = [];
    for (let i = 0; i < NUMBER_OF_DICE; i++) {
      const newDice: DiceInterface = {
        id: i + 1,
        value: generateRandomNumber(),
        held: false,
      };
      arr.push(newDice);
    }
    return arr;
  }

  //function to roll the dice -> will check to make sure the dice is not held before changing it's value
  function rollDice() {
    if (!tenzies) {
      setDice((prevDice) =>
        prevDice.map((d) =>
          d.held ? d : { ...d, value: generateRandomNumber() }
        )
      );
      setrolls((prev) => prev + 1);
    } else {
      setTenzies(false);
      setDice(newSetOfDice());
      setrolls(0);
    }
  }

  //Start of JSX
  return (
    <main>
      {tenzies && <Confetti />}
      <div className='container'>
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className='dice-grid'>
          {dice.map((d) => (
            <Die key={d.id} diceObj={d} setDice={setDice} />
          ))}
        </div>
        <button onClick={rollDice}>
          {tenzies ? 'Start New Game' : 'Roll'}
        </button>
        <p style={{ fontSize: '1.5rem' }}>Number of rolls: {rolls}</p>
      </div>
    </main>
  );
};

export default App;
