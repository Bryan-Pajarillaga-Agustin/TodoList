import "./Header.css"
export default function Header({setSBarState}){

	return (
		<>	
			<header>
				<img src="./Images/TodoList.png" width={70} height={60} />
				<h1>Todo List</h1>

				<button className="TripleSideBar" onClick={()=>setSBarState(1)}>≡</button>
			</header>
		</>
	)
}