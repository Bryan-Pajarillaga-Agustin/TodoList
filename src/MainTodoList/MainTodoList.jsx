import "./MainTodoList.css"
import Header from "./Header/Header.jsx"
import Sidebar from "./SideBar/Sidebar.jsx"
import InputList from "./Pages/InputList/InputList.jsx"
import PDocumentation from "./Pages/PhotoDocumentation/PDocumentation.jsx"
import { useEffect, useState, useRef } from "react"

const database = firebase.database()
const storage = firebase.storage()

export default function MainTodoList(){

	const [sBarState, setSBarState] = useState(0)
	const [pagination, setPagination] = useState(0)
	const [data, setData] = useState(null)
	const [userRootName, setUserRootName] = useState(null)
	const [RootFolder, setRootFolder] = useState(null)


	const update = useEffect(()=>{
		const dataLocal = JSON.parse(localStorage.getItem("data"))
		const rootFolder = JSON.parse(localStorage.getItem("RootFolder"))
		if(dataLocal != null && rootFolder != null) {
			setRootFolder(rootFolder)
			setData(dataLocal)
		}
	}, [])
	useEffect(()=>{
		var UserRootName = JSON.parse(localStorage.getItem("RootFolder"))
		
		if(UserRootName != null){
			setUserRootName(UserRootName)
		}
	}, [])
	return(
		<>	
		<div className="MainContents">
			<Header setSBarState={(param)=>setSBarState(param)}></Header>
			<div className="Pages">
				<InputList pagination={pagination}></InputList>
				<PDocumentation pagination={pagination} update={()=>update()} data={data} setData={(item)=>setData(item)} handleDataUpdate={(item)=>handleDataUpdate(item)} userRootName={userRootName} RootFolder={RootFolder}></PDocumentation>
			</div>
			<div className={sBarState == 1 ? "blurr" : "not-blurred"}></div>
		</div>
			<Sidebar pagination={pagination} setPagination={(param)=>setPagination(param)} sBarState={sBarState} setSBarState={(param)=>setSBarState(param)}></Sidebar>
		</>
	)
}