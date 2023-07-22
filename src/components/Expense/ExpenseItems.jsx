import React, { useState, useContext } from 'react'
import { StoreData } from '../../StoreOfData/store';

const ExpenseItems = () => {
    const [amount, setAmount] = useState();
    const [category, setCategory] = useState('Movie');
    const [description, setDescription] = useState();
    const [totalItem, setTotalItem] = useState();

    const ctx = useContext(StoreData);

    const url = `https://expense-tracker-app-814b6-default-rtdb.firebaseio.com/`
    const getDataFrom = async () => {
        const email = localStorage.getItem('email')
        const response = await fetch(`${url}${email}.json`, {
            method: "GET"
        })
        const data = await response.json();
        console.log('data from Expense Item', data);
        const newItem = [];
        for (let key in data) {
            newItem.push({ id: key, ...data[key] })
        }
        ctx.addItem(newItem)
        console.log('newItem', newItem);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(amount, category, description)
        ctx.addItem({ amount, category, description })
        console.log(ctx.items)
        const email = localStorage.getItem('email');
        const response = await fetch(`${url}${email}.json`, {
            method: "POST",
            body: JSON.stringify({
                amount: amount,
                category: category,
                description:description
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data1 = await response.json();
        console.log('data', data1);
        getDataFrom();
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
