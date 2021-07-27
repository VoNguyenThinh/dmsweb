import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Users from '../components/Users/Users'
export default function UserRouter() {
    return (
        <div>
            <Route path='/userdashboard' component={Users} />
        </div>
    )
}
