import React, { useContext, useEffect, useState } from 'react'
import { StoreData } from '../../StoreOfData/store'

const ExpenseTable = () => {
    const ctx = useContext(StoreData);
    const url = 'https://expense-tracker-app-814b6-default-rtdb.firebaseio.com/'
    const email = localStorage.getItem('email');
    const [rerender, setRerender] = useState(true);

    // delete the data from the backend
    const toDeleteData = async (id) => {
        const resp = await fetch(`${url}${email}/${id}.json`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const respo = await resp.json();
        setRerender((prev) => !prev)
        console.log('respo', respo, id);
    }


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
    }, [rerender])
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
                        ctx.items.map(({ id, amount, category, description }, indx) => {
                            console.log(id)
                            return <tr key={id} >
                                <th scope="row" >{indx + 1}</th>
                                <td>{amount}</td>
                                <td>{category}</td>
                                <td>{description}</td>
                                <td><button type='button' className='btn btn-warning' >Edit</button></td>
                                <td><button type='button' className='btn btn-danger' onClick={() => toDeleteData(id)} >Delete</button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default ExpenseTable
