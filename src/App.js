import React, {useEffect} from 'react';
import Layout from "./hoc/Layout/Layout";
import Quiz from "./containers/Quiz/Quiz";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";
import {Route, Switch, Redirect} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import Logout from "./components/Logout/Logout";
import {autoLogin} from "./redux/actions/auth";

function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.auth.token)

  useEffect(() => {
    dispatch(autoLogin())
  }, [dispatch])

  let routes = (
    <Switch>
      <Route path='/auth' component={Auth}/>
      <Route path='/quiz/:id' component={Quiz}/>
      <Route path='/' component={QuizList} exact/>
      <Redirect to='/'/>
    </Switch>
  )

  if (!!isAuth) {
    routes = (
      <Switch>
        <Route path='/quiz-creator' component={QuizCreator}/>
        <Route path='/quiz/:id' component={Quiz}/>
        <Route path='/logout' component={Logout}/>
        <Route path='/' component={QuizList} exact/>
        <Redirect to='/'/>
      </Switch>
    )
  }

  return (
      <Layout>
        {routes}
      </Layout>
  );
}

export default App;
