import React from "react"
import './App.css';
import { Routes , Route, Link } from "react-router-dom"
import { NotFoundMetadata } from "./pages/notFound/NotFoundMetadata.js"
import publicRoutes from "./router/routes.js";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route
                exact
                path="/*"
                name="Page 404"
                element={<NotFoundMetadata/>}
            />
            {publicRoutes.map((route, idx) => {
                return (
                    route.component && (
                        <Route
                            key={idx}
                            path={route.path}
                            exact={route.exact}
                            name={route.name}
                            element={
                                <route.component  />
                            }
                        />
                    )
                )
            })}
        </Routes>

    </div>
  );
}

export default App;
