import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import * as CFG from '../constants/config'
// ---------------------------------------------------------------------------
import Singin from '../components/SignIn/Signin'
import MainLayout from '../container/MainLayout'
import { ProtectedRoute } from '../routes/ProtectedRoute'
import { ProtectedLogin } from './ProtecdLogin'
import Devices from '../components/Devices/Device'
import MaDevices from '../components/Devices/MaDevices'
import Tracking from '../components/Devices/Tracking'
import MaUsers from '../components/User/MaUsers'
import DeviHistory from '../components/Devices/DeviHistory'
import Error from '../components/Error/Error'
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
                        <ProtectedRoute ROLE={CFG.ROLE.AD} path={CFG.PATH.MaDEVICES} component={MaDevices} />
                        <ProtectedRoute ROLE={CFG.ROLE.AD} path={CFG.PATH.MaUSERS} component={MaUsers} />
                        <ProtectedRoute ROLE={CFG.ROLE.AD} path={CFG.PATH.MaTRACKING} component={Tracking} />

                        <ProtectedRoute ROLE={CFG.ROLE.US} path={CFG.PATH.DVHISTORY} component={DeviHistory} />
                        <ProtectedRoute ROLE={CFG.ROLE.ALL} path={CFG.PATH.ERROR} component={Error} />
                    </Switch>
                </MainLayout>
            </Switch>
        </Router>
    )
}
