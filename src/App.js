import ProductList from "./Pages/ProductList"
import Sidebar from "./Components/Sidebar"
import Topbar from "./Components/Topbar"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Home from "./Pages/Home"

import "./App.css"

function App() {
  return (
    <div className="App">
      <Router>
        <Topbar />
        <div className="container">
          <Sidebar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/product">
              <ProductList />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
