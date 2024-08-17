import { Link } from "react-router-dom"
import { Button } from "./ui/button"

const Header = () => {
  return (
   <nav className="w-full text-2xl flex items-center px-4 h-16 bg-slate-800 text-white select-none font-medium justify-between">
    <Link to="/"><h3>CodeRun</h3></Link>
    <ul>
      <li>
        <Link to="/compiler"><Button variant="outline">Compiler</Button></Link>
      </li>
    </ul>
   </nav>
  )
}

export default Header
