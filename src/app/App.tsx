import { BrowserRouter, Route, Switch } from "react-router-dom"
import Layout from "../common/components/Layout"
import ActivifyDetail from "../feature/public/activity/ActivityDetail"
import ActivityList from "../feature/public/activity/ActivityList"

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Layout>
          <Route exact path={'/'} >
            <ActivityList />
          </Route>
          <Route path={'/detail/:activity_id'}>
            <ActivifyDetail />
          </Route>
        </Layout>
      </Switch>
    </BrowserRouter>
  )
}