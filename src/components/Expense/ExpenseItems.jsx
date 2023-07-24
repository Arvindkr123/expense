import React, { useState, useContext, useEffect } from 'react'
import classes from './ExpenseItem.module.css'
import { StoreData } from '../../StoreOfData/store';

const ExpenseItems = () => {
    const [amount, setAmount] = useState();
    const [category, setCategory] = useState('Movie');
    const [description, setDescription] = useState();
    const [totalItem, setTotalItem] = useState();
    const [id, setId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showExp, setShowExp] = useState(false);
    const [rerender, setRerender] = useState(true);

    const showExpHandler = () => {
        setShowExp(prev => !prev);
    }

    const ctx = useContext(StoreData);

    const url = `https://expense-tracker-app-814b6-default-rtdb.firebaseio.com/`
    const email = localStorage.getItem('email')

    const getDataFrom = async () => {
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

    const editHandler = (id, amount1, catagory1, description1) => {
        setIsEditing(true);
        setId(id);
        setAmount(amount1)
        setCategory(catagory1)
        setDescription(description1);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(amount, category, description)
        ctx.addItem({ amount, category, description })
        console.log('Items from Context ', ctx.items)
        const email = localStorage.getItem('email');
        if (!isEditing) {
            const response = await fetch(`${url}${email}.json`, {
                method: "POST",
                body: JSON.stringify({
                    amount: amount,
                    category: category,
                    description: description
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data1 = await response.json();
            console.log('data', data1);
        } else {
            const res = await fetch(`${url}${email}/${id}.json`, {
                method: "PUT",
                body: JSON.stringify({
                    amount, category, description
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setIsEditing(false);
            setShowExp(true)
        }
        getDataFrom();
        setAmount('')
        setCategory('')
        setDescription('')
    }

    const toDeleteData = async (id) => {
        const resp = await fetch(`${url}${email}/${id}.json`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const response = await resp.json();
        setRerender(prev => !prev);
        console.log('response', response, id);
    }

    useEffect(() => {
        const fetchMyAPI = async () => {
            let res = await fetch(`${url}${email}.json`, {
                method: "GET"
            })
            const data = await res.json();
            const newItem = [];
            for (let key in data) {
                newItem.push({id:key, ...data[key]})
            }
            console.log('useEffectCalled', newItem);
            ctx.addItem(newItem);
        }

        fetchMyAPI();
    }, [rerender])

    return (
        <>
            <div className={classes.addExp}>
                <button type="button" onClick={showExpHandler} className="btn btn-secondary">{!showExp ? '+Add Expense' : 'Close'}</button>
            </div>
            {showExp && <div className={classes.form}>
                <div>
                    <div>
                        <label className="form-label">Choose Expense</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text">$</span>
                            <input type="number" className="form-control" placeholder='Enter Amount' onChange={(e) => setAmount(e.target.value)} value={amount} />
                        </div>
                    </div>
                    <div className='chooseExpense'>
                        <label className="form-label">Choose Catagory</label>
                        <select className="form-select col" onChange={e => setCategory(e.target.value)} value={category}>
                            <option >Movie</option>
                            <option >Shopping</option>
                            <option >Rent</option>
                            <option >Grocery</option>
                        </select>
                    </div>
                </div>
                <div className="secondDiv">
                    <div className="col">
                        <label className="form-label">Add Short Description</label>
                        <input type="text" className="form-control" placeholder="Description" aria-label="Last name" onChange={e => setDescription(e.target.value)} value={description} />
                    </div>
                    <button className="btn btn-primary mt-4 btn1" type="submit" onClick={submitHandler}>{!isEditing ? 'Submit' : 'Update'}</button>
                </div>
            </div>
            }
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Expense</th>
                        <th scope="col">Catagory</th>
                        <th scope="col">Description</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ctx.items.map(({id, category, amount, description}, indx) => (
                            <tr key={id}>
                                <th scope="row">{indx + 1}</th>
                                <td>{amount}</td>
                                <td>{category}</td>
                                <td>{description}</td>
                                <td><button type='button' className='btn btn-warning' onClick={editHandler.bind(null, id, amount, category, description)} >Edit</button></td>
                                <td><button type='button' className='btn btn-danger' onClick={toDeleteData.bind(null, id)}>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default ExpenseItems
