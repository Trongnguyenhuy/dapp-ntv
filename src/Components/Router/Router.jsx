import { Switch, Route } from 'react-router-dom';
import Home from "../../Pages/Home/HomePage"
import Farm from "../../Pages/Farming/FarmingPage"
import FarmDetail from "../../Pages/Farming/FarmingDetailPage"
import Pool from "../../Pages/Pool/PoolPage"
export const Router = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/farm" component={Farm} />
            <Route path="/pool" component={Pool} />
            <Route path="/farm-detail/:id" component={FarmDetail} />
        </Switch>
    );
}