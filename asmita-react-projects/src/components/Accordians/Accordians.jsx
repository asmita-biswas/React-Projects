import { useEffect, useState } from 'react';
import axios from 'axios';
import './Accordians.css';

const Accordians = () => {
    const [quotes, setQuotes] = useState([]);
    const [selectedQuote, setSelectedQuote] = useState([]);
    const [multiSelect, setMultiSelect] = useState(false);

    const handleClickQuotes = (id) => {
        let index = selectedQuote.indexOf(id)
        if (multiSelect) {
            let temp = [...selectedQuote];
            if (index >= 0) {
                temp.splice(index, 1);
                setSelectedQuote([...temp])
            }
            else {
                setSelectedQuote([...selectedQuote, id]);
            }
        }
        else {
            if (index == 0) {
                setSelectedQuote([])
            }
            else {
                setSelectedQuote([id]);
            }
        }
    }

    const toggleMultiSelect = (value) => {
        setMultiSelect(value);
        setSelectedQuote([]);
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('https://dummyjson.com/quotes');
            setQuotes(res.data.quotes);
        }
        fetchData();
    }, [])

    return (
        <div className="accordiansPageDiv">
            <h1>Accordians</h1>
            <div className='accordianDivs'>
                {multiSelect ? <button onClick={() => toggleMultiSelect(false)}>Disable MultiSelection</button> : <button onClick={() => toggleMultiSelect(true)}>Enable MultiSelection</button>}
                {quotes && quotes.length ? (
                    quotes.map((data) => {
                        return (
                            <div className='quotesAccordian' key={data.id} onClick={() => handleClickQuotes(data.id)}>
                                <div className='overviewDiv'>
                                    <p className='text.single-line'> {data.quote} </p>
                                    <h5>+</h5>
                                </div>
                                {selectedQuote.indexOf(data.id) >= 0 ? <h5> ---{data.author} </h5> : ''}
                            </div>)

                    })
                ) : ('No data found')}
            </div>
        </div>
    )
};

export default Accordians;