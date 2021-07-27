import React from 'react'
import { Link, Route } from 'react-router-dom'
import Devices from '../Devices/Devices'
export default function Users() {
    return (
        <div>
            <h1>User dashboard</h1>
            <ul>
                <li>List devices</li>
                <li> <Link to='/deviceshistory'>Devices history</Link></li>
            </ul>

        </div>
    )
}
