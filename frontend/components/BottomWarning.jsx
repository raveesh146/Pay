import { Link } from "react-router-dom";

export function BottomWarning ({label,to,linkText}){
return(<div className="flex justify-center">
<div className="text-sm">{label}</div>
<div> <Link  to={to} className="text-sm">{linkText}</Link></div>
</div>)
}