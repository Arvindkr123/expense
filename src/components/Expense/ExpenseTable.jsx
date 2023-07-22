import React, { useContext, useEffect } from 'react'
import { StoreData } from '../../StoreOfData/store'

const ExpenseTable = () => {
    const ctx = useContext(StoreData);
    const url = 'https://expense-tracker-app-814b6-default-rtdb.firebaseio.com/'
    const email = localStorage.getItem('email');

    useEffect(() => {
        const fetchMyApi = async () => {
            let response = await fetch(`${url}${email}.json`, {
                method: 'GET'
            })
            const data = await response.json();
            const newItem = [];
            for (let key in data) {
                newItem.push({ id: key, ...data[key] })
            }
            console.log('useEffect Called ', newItem);
            ctx.addItem(newItem)
        }
        fetchMyApi();
    }, [])
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Expense</th>
                        <th scope='col'>Category</th>
                        <th scope='col'>Description</th>
                        <th scope='col'>Edit</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ctx.items.map((item, indx) => {
                            return <tr key={indx} >
                                <th scope="row" >{indx+1}</th>
                                <td>{item.amount}</td>
                                <td>{item.category}</td>
                                <td>{item.description}</td>
                                <td><button type='button' className='btn btn-warning' >Edit</button></td>
                                <td><button type='button' className='btn btn-danger' >Delete</button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default ExpenseTable
