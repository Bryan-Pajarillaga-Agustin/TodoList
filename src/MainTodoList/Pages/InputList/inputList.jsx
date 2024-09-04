import { useEffect, useRef, useState } from "react"
import "./inputList.css"
import Tasks from "./Tasks"
export default function InputList({ pagination }){
	const [taskLists, setTaskLists] = useState([])
	const [currentAddedTask, setCurrentAddedTask] = useState() 
	const [selected, setSelected] = useState(null)
	const [stateOfTasks, setStateOfTasks] = useState(0)
	const inputTask = useRef(null)

	function handleKey(e){
		if(e.key === "Enter" && inputTask.current.value != ""){
			addTask()
		}
	}
	
	function handleStateTasks(param){
		setStateOfTasks(param)
		var data = JSON.parse(localStorage.getItem("TodoList"))
		for(let i = 0; i < data.length; i++){
			if(data[i].isChecked === "true"){
				data[i].isChecked = "false"
			}
		}

		setSelected(0)
		localStorage.setItem("TodoList", JSON.stringify(data))
		setTaskLists([...data])
	}

	function addTask(){

		var newTask = {Task: inputTask.current.value,
							State: "Pending",
						   isChecked: "false"}
		var updateList = taskLists
		if(taskLists == null){
			updateList = []
		} 

		updateList.unshift(newTask)
		setTaskLists([...updateList])
		setToStorage()

		inputTask.current.value = null

		function setToStorage(){
			var TaskList = updateList
			var current = []
			localStorage.setItem("TodoList", JSON.stringify(TaskList))
			setTaskLists([...TaskList])

			for(let i = 2; i >= 0; i--){
				if(TaskList[i] != null){
					current.unshift(TaskList[i])
				}

			}
			localStorage.setItem("Current", JSON.stringify(current))
			setCurrentAddedTask(current)
		}
	}

	function optionSelection(par){
		var data = JSON.parse(localStorage.getItem("TodoList"))
		console.log(data)
		for(let i = data.length - 1; i > -1; i--){
			if(data[i].isChecked == "true" && data[i].State == "Pending" && par == 0){
				data[i].State = "Finished"
			} else if(data[i].isChecked == "true" && par == 1) {
				data.splice(i, 1)
			}

		}

		setTaskLists([...data])
		setSelected(0)
		localStorage.setItem("TodoList", JSON.stringify(data))
	}

	useEffect(()=>{
		var dataTask = JSON.parse(localStorage.getItem("TodoList"))
		setTaskLists(dataTask)
		var current = JSON.parse(localStorage.getItem("Current"))
		setCurrentAddedTask(current)
	}, [])

	useEffect(()=>{
		window.onload = ()=>{
			var data = JSON.parse(localStorage.getItem("TodoList"))
			for(let i = 0; i < data.length ; i++){
				data[i].isChecked = "false"
			}
	
			setTaskLists([...data])
			localStorage.setItem("TodoList", JSON.stringify(data))
		}
	}, [taskLists])

	return(
		<div className={pagination == 0 ? "InputLists" : "InputLists None"}>
			<div className="left">
				<button id={stateOfTasks === 0 ? "onFocus" : " "} onClick={()=>handleStateTasks(0)}>Write Task</button>
				<button id={stateOfTasks === 1 ? "onFocus" : " "} onClick={()=>handleStateTasks(1)}>All Task</button>
				<button id={stateOfTasks === 2 ? "onFocus" : " "} onClick={()=>handleStateTasks(2)}>Pending</button>
				<button id={stateOfTasks === 3 ? "onFocus" : " "} onClick={()=>handleStateTasks(3)}>Finished</button>
			</div>
			<div className="right">
				
				<div className="WrapElements">
					<div className="wrapInputTag">
						<input type="text" ref={inputTask} id="" onFocus={window.onkeydown = (e) => {handleKey(e)}} placeholder="Write New Tasks..." />
						<button id="SubmitBtn" onClick={()=>addTask()} >Submit</button>
					</div>
				</div>

				<div className={stateOfTasks == 1 ? "DisplayFew" : "DisplayTasks"}>
					<div className={stateOfTasks > 1 && selected == 1  ? "SelectTasksPopUp" : "DisplayNone"}>
						<button className={stateOfTasks === 2 ? "MarkAsFinished" : "DisplayNone"} onClick={()=>optionSelection(0)}> Mark As Finished </button>
						<button className={stateOfTasks >= 2 ? "Delete" : "DisplayNone"} onClick={()=>optionSelection(1)}>Delete Selected Task</button>
					</div>

					<Tasks taskLists={taskLists} state={stateOfTasks} setSelected={(i)=>setSelected(i)} selected={selected} current={currentAddedTask}></Tasks>
				</div>
			</div>
		</div>
	)
}

// if(currentAddedTask.length == 0){
		// 	setTaskLists(newTask)
		// 	setCurrentAddedTask(newTask)
		// 	setToStorage()
		// }
		// else if(currentAddedTask.length < 4){
		// 	setTaskLists(...taskLists, newTask)
		// 	setCurrentAddedTask(...currentAddedTask, currentAddedTask)
		// 	setToStorage()
		// } else {
		// 	setTaskLists(...taskLists, newTask)
		// 	var addedTasks = currentAddedTask
		// 	addedTasks.splice( addedTasks.length-1, 1)
		// 	addedTasks.unshift(newTask)
		// 	setCurrentAddedTask(addedTasks)
		// 	setToStorage()
		// }
		// var dataAddedTask = JSON.parse(localStorage.getItem("currendAdded"))
		// setCurrentAddedTask(dataAddedTask)