import React,{useState} from 'react'

function Toe() {
    const [turn, setTurn] = useState('x')
    const [cells, setCells] = useState(Array(9).fill(''))
    const [winner, setWinner] = useState()

    const gameWinner = (box) => {
        let combos = {
            across: [
                [0,1,2],
                [3,4,5],
                [6,7,8]
            ],
            dwon: [
                [0,3,6],
                [1,4,7],
                [2,5,8]
            ],
            diango: [
                [0,4,8],
                [2,4,6]
            ]
        }
        for (let combo in combos) {
            combos[combo].forEach((pattern) =>{
                if (
                box[pattern[0]] === '' ||
                box[pattern[1]] === '' ||
                box[pattern[2]] === '') {
                    // do nothing
                } else if (
                    box[pattern[0]] === box[pattern[1]] &&
                    box[pattern[1]] === box[pattern[2]]
                ) {
                    setWinner(box[pattern[0]])
                }
            })
        }
        
    }

    const resetHandler = () => {
        setWinner(null)
        setCells(Array(9).fill(''))
    }

    const clickHandler = (id) => {

        if(cells[id] !== '') {
            return '';
        }

        let box = [...cells]

        if(turn === 'x') {
            box[id] = 'x'
            setTurn('o')
        } else {
            box[id] = 'o'
            setTurn("x")
        }
        setCells(box)
        gameWinner(box)
    }
    const Cell = ({id}) => {
        return <td onClick={() => clickHandler(id)}>{cells[id]}</td>
    }
  return (
    <div className='container'>
        <h1>turn : {turn}</h1>
        <table>
            
            <tbody>
                <tr>
                    <Cell id={0} />
                    <Cell id={1} />
                    <Cell id={2} />
                </tr>
                <tr>
                    <Cell id={3} />
                    <Cell id={4} />
                    <Cell id={5} />
                </tr>
                <tr>
                    <Cell id={6} />
                    <Cell id={7} />
                    <Cell id={8} />
                </tr>
            </tbody>
        </table>
        {winner && (
            <>
            <p>({winner}) is the winner</p>
            <button onClick={resetHandler} >Play Again</button>
            </>
        )}
    </div>
  )
}

export default Toe