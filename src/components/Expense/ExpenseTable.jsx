import React, { useContext } from 'react'
import { StoreData } from '../../StoreOfData/store'

const ExpenseTable = () => {
    const ctx = useContext(StoreData);
    return (
        <>
            <div className="table">
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
                                <th scope="row" >{indx}</th>
                                <td>{item.amount}</td>
                                <td>{item.catagory}</td>
                                <td>{item.description}</td>
                                <td><button type='button' className='btn btn-warning' >Edit</button></td>
                                <td><button type='button' className='btn btn-danger' >Delete</button></td>
                            </tr>
                        })
                    }
                </tbody>
            </div>
        </>
    )
}

export default ExpenseTable
