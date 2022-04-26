import React,{useState} from 'react'

function TicTac() {
    const [turn, setTurn] = useState('x')
    const [cells, setCells] = useState(Array(9).fill(''))
    const [gameWinner, setGameWinner] = useState()
 
    const winner = (storage) => {
        let combos = {
            acroos: [
                [0,1,2],
                [3,4,5],
                [6,7,8] 
            ] ,
            down: [
                [0,3,6],
                [1,4,7],
                [2,5,8]
            ]  ,
            diango: [
                [0,4,8],
                [2,4,6]
            ]
        }
        for (let combo in combos ) {
            combos[combo].forEach((pattern) => {
                if(storage[pattern[0]] === '' ||
                storage[pattern[1]] === ''||
                storage[pattern[2]] === '' ) {
                    // do nothing
                } else if (
                    storage[pattern[0]] === storage[pattern[1]] &&
                    storage[pattern[1]] === storage[pattern[2]]
                ) {
                    setGameWinner(storage[pattern[0]] )
                }
                
            })
        }
    }

    const resetHandel = () => {
        setGameWinner(null);
        setCells(Array(9).fill(''))
    }



    const clickHandler = (id) => {
        if(cells[id] !== '') {
            return '';
        }

        let storage = [...cells]

        if(turn === 'x') {
            storage[id] = 'x'
            setTurn("o")
        } else {
            storage[id] = 'o'
            setTurn("x")
        }
        setCells(storage)
        winner(storage)
    }

    const Cell = ({id}) => {
        return <td onClick={() => clickHandler(id)}>{cells[id]}</td>
    }
  return (
    <div className='container'>
        <table>
            turn : {turn}
            <tbody>
                <tr>
                    <Cell id={0}/>
                    <Cell id={1}/>
                    <Cell id={2}/>
                </tr>
                <tr>
                    <Cell id={3}/>
                    <Cell id={4}/>
                    <Cell id={5}/>
                </tr>
                <tr>
                    <Cell id={6}/>
                    <Cell id={7}/>
                    <Cell id={8}/>
                </tr>
            </tbody>
        </table>
        {gameWinner && (
            <>
            <p>{gameWinner} is the winner</p>
            <button onClick={() => resetHandel()}>Play again</button>
            </>
        )}
    </div>
  )
}

export default TicTac