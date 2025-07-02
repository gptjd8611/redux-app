
import { ReducerExView } from "../pages/main/ReducerExView"
import  StudentList  from "../pages/main/StudentList"
import ProjectLinks from "../pages/main/ProjectLinks";

const publicRoutes = [
    {
        path: "/",
        name: "home",
        component: ProjectLinks,
    },
    {
        path: "/banking",
        name: "reducer",
        component: ReducerExView,
    },
    {
        path: "/attendance",
        name: "attend",
        component: StudentList,
    }
]

export default  publicRoutes
