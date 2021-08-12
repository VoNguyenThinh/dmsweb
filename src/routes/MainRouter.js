import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import * as CFG from '../constants/config'
// ---------------------------------------------------------------------------
import Singin from '../components/SignIn/Signin'
import MainLayout from '../container/MainLayout'
import { ProtectedRoute } from '../routes/ProtectedRoute'
import { ProtectedLogin } from './ProtecdLogin'
import Devices from '../components/Devices/Device'
import AcceptedDevice from '../components/Devices/AcceptedDevice'
import MaUsers from '../components/User/MaUsers'
import DeviHistory from '../components/Devices/DeviHistory'
import Error from '../components/Error/Error'
import Profile from '../components/User/Profile'
import ChangePwd from '../components/User/ChangePwd'
import AddUser from '../components/User/AddUser'
import EditUser from '../components/User/EditUser'
import AddDevices from '../components/Devices/AddDevices'
import EditDevices from '../components/Devices/EditDevices'
import DetailDevice from '../components/Devices/Detail_Device'
import Request from '../components/Requests/RequestList'
// -----------------------[ COMPONENTS ]--------------------------------------------
export default function MainRouter() {

    return (
        <Router >
            <Switch>
                <ProtectedLogin exact path='/' component={Singin} />
                <ProtectedLogin exact path={CFG.PATH.LOGIN} component={Singin} />
                <MainLayout>
                    <Switch>
                        <ProtectedRoute ROLE={CFG.ROLE.ALL} path={CFG.PATH.DEVICES} component={Devices} />
                        <ProtectedRoute ROLE={CFG.ROLE.ALL} path={CFG.PATH.PROFILE} component={Profile} />
                        <ProtectedRoute ROLE={CFG.ROLE.ALL} path={CFG.PATH.CHANGEPWD} component={ChangePwd} />
                        <ProtectedRoute ROLE={CFG.ROLE.ALL} path={CFG.PATH.DETAIL_DEVICES + `/:id`} component={DetailDevice} />

                        {/* <ProtectedRoute ROLE={CFG.ROLE.AD} path={CFG.PATH.MaDEVICES} component={MaDevices} /> */}
                        <ProtectedRoute ROLE={CFG.ROLE.AD} path={CFG.PATH.ADDDEVICES} component={AddDevices} />
                        <ProtectedRoute ROLE={CFG.ROLE.AD} path={CFG.PATH.EDITDEVICES + `/:id`} component={EditDevices} />
                        <ProtectedRoute ROLE={CFG.ROLE.AD} path={CFG.PATH.MaUSERS} component={MaUsers} />
                        <ProtectedRoute ROLE={CFG.ROLE.AD} path={CFG.PATH.ADDUSER} component={AddUser} />
                        <ProtectedRoute ROLE={CFG.ROLE.AD} path={CFG.PATH.EDITUSER + `/:id`} component={EditUser} />
                        <ProtectedRoute ROLE={CFG.ROLE.AD} path={CFG.PATH.REQUEST} component={Request} />
                        <ProtectedRoute ROLE={CFG.ROLE.AD} path={CFG.PATH.ACCEPTED} component={AcceptedDevice} />

                        <ProtectedRoute ROLE={CFG.ROLE.US} path={CFG.PATH.DVHISTORY} component={DeviHistory} />
                        <ProtectedRoute ROLE={CFG.ROLE.ALL} path={CFG.PATH.ERROR} component={Error} />
                    </Switch>
                </MainLayout>
            </Switch>
        </Router>
    )
}
