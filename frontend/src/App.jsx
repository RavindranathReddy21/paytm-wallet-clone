import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SignUp } from "./components/SignUp"
import { SignIn } from "./components/SignIn"
import { Dashboard } from "./components/Dashboard"
import { SendMoney } from "./components/SendMoney"
import { useState } from "react"
function App() {
  const [login, setLogin] = useState(0);
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sendmoney" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
