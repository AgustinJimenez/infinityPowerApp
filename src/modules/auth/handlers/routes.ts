import Login from "../pages/Login";
import Register from "../pages/Register";
import Onboarding from "../pages/Onboarding";
import Splash from "../pages/Splash";
import ConfirmEmail from "../pages/ConfirmEmail";

export const AuthStack = [{
    name: "Splash",
   component: Splash
},
{
     name: "Login",
    component: Login
},
{
    name: "Register",
    component: Register
}, {
    name: "Onboarding",
    component: Onboarding
}, {
    name: "ConfirmEmail",
    component: ConfirmEmail
}]