import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { SignUp } from '../pages/signup'

function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={<Signin/>} />
          <Route path="/dashboard" element={<DashBoard />}/>
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
