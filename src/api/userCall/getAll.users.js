import React from 'react'
import usersApi from '../setup/usersApi'

export default function GetAll(props) {
    const abc = {
        "username": "hung",
        "password": "hung"
    }
    const click = () => {

        const login = async () => {
            try {
                const response = await usersApi.post(abc)
                console.log(response.data)
            } catch (error) {
                console.log('Failed to post: ', error);
            }
        }
        login();
    }

    return (
        <div>
            <button onClick={click}>Log in </button>
        </div>
    )
}
