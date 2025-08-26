import {Outlet} from 'react-router-dom';
import HeaderPage from '../layout/HeaderPage';
import NavTab from '../layout/NavTab';


export default function WellnessLayout() {
    return (
        <HeaderPage
            heading="Wellness"
            nav={<>
                <NavTab to="." name="Links" />
                <NavTab to="phone-numbers" name="Phone Numbers" />
            </>}
        >
            <Outlet />
        </HeaderPage>
    );
}
