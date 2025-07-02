import {  Route } from "react-router-dom"
import React from "react";
import publicRoutes from "../router/routes.js"


export const CommonLayout = (props) => {
    return (
        <div>
            {/* header */}
            {/* contents */}

                {publicRoutes.map((route, idx) => {
                    return (
                        route.component && (
                            <Route
                                key={idx}
                                path={route.path}
                                exact={route.exact}
                                name={route.name}
                                render={(props) =>
                                        <route.component {...props} />
                                  }
                            />
                        )
                    )
                })}

            {/* footer */}
        </div>
    )
}