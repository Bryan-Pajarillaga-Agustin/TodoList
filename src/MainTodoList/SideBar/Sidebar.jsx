import "./Sidebar.css"
export default function Sidebar({sBarState, setSBarState, pagination, setPagination}){

	return(
		<div className={sBarState == 1 ? "SidebarShow" : "SidebarNone"}>
		<button id="back" onClick={()=>setSBarState(0)}>↵</button>
			<div className="WrapSideBar">
				<h1>More Options</h1>

				<button className="options" id={pagination == 0 ? "highlight" : "notHighlighted"} onClick={()=>{setPagination(0)}}>My List</button>
				<button className="options" id={pagination == 1 ? "highlight" : "notHighlighted"} onClick={()=>{setPagination(1)}}>Developer</button>
				<button className="options" id={pagination == 2 ? "highlight" : "notHighlighted"} onClick={()=>{setPagination(2)}}>Photo Documentation</button>
			</div>
		</div>
		

	)
}