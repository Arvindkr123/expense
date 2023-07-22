import React, { useState, useContext } from 'react'
import { StoreData } from '../../StoreOfData/store';

const ExpenseItems = () => {
    const [amount, setAmount] = useState();
    const [category, setCategory] = useState();
    const [description, setDescription] = useState();
    const ctx = useContext(StoreData);

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(amount, category, description)
        ctx.addItem({ amount, category, description })
        console.log(ctx.items)
        setAmount('')
        setCategory('')
        setDescription('')
    }

    return (
        <>
            <div className="form-label">Choose Expense</div>
            <div className="input-group">
                <span className='input-group-text'>$</span>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className='form-control' placeholder='enter amount' />
            </div>
            <div className="chooseExpense mt-3">
                <label className='form-label'>Choose Category</label>
                <select className='form-select col' value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option >Movie</option>
                    <option >Shopping</option>
                    <option >Rent</option>
                    <option >Grocery</option>
                </select>
            </div>
            <div className="secondDiv mt-3">
                <div className="col">
                    <label className="form-label">Add Short Description</label>
                    <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder='Description' className='form-control' area-label='Last Name' />
                </div>
                <button className='btn btn-primary mt-4 btn1' type='submit' onClick={submitHandler}>Submit</button>
            </div>
        </>
    )
}

export default ExpenseItems
