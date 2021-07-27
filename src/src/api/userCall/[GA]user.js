import React, { useEffect, useState } from 'react'
import usersApi from '../setup/usersApi'

export default function GetAll(props) {
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const response = await usersApi.getAll();
                setProductList(response.data);
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
        }
        fetchProductList();
    }, []);

    const List = productList.map(item => {
        return (
            <li key={item.id}>{item.username} - {item.password}</li>
        )
    })
    return (
        <div>
            {List}
        </div>
    )
}
