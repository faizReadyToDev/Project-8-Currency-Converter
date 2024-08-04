import { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const [amount,setAmount] = useState(0);
  const [convertedAmount,setConvertedAmount] = useState(0);
  const [fromCurr, setFromCurr] = useState('inr')
  const [toCurr, setToCurr] = useState('usd')

  let currencyInfo = useCurrencyInfo(fromCurr)
  let options = Object.keys(currencyInfo)

  const swap = ()=>{
    setFromCurr(toCurr)
    setToCurr(fromCurr)
    setAmount(convertedAmount)
    setConvertedAmount(amount)
  }

  const convert = ()=>{
    setConvertedAmount(amount*currencyInfo[toCurr])
  }

  return (
  
    <div
    className="w-full h-screen flex flex-wrap justify-center items-center bg-center"
    style={{
        backgroundImage: `url('https://i.pinimg.com/736x/28/bf/60/28bf60bdd5e2b22d1729ba3fa0d459b0.jpg')`,
    }}
>
    <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    convert()
                   
                }}
            >
                <div className="w-full mb-1">
                    <InputBox
                        label="From"
                        amount={amount}
                        currencyOptions={options}
                        onCurrencyChange={(currency) => setAmount(amount)}
                        selectCurrency={fromCurr}
                        onAmountChange={(amount) => setAmount(amount)}
                    />
                </div>
                <div className="relative w-full h-0.5">
                    <button
                        type="button"
                        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                        onClick={swap}
                    >
                        swap
                    </button>
                </div>
                <div className="w-full mt-1 mb-4">
                    <InputBox
                        label="To"
                        amount={convertedAmount}
                        currencyOptions={options}
                        onCurrencyChange={(currency) => setTo(currency)}
                        selectCurrency={toCurr}
                        amountDisable
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                    Convert {fromCurr.toUpperCase()} to {toCurr.toUpperCase()}
                </button>
            </form>
        </div>
    </div>
</div>
);
}

export default App