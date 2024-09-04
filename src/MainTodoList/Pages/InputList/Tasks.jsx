import "./Tasks.css"

import { useEffect, useState } from "react"

export default function Tasks({taskLists, state, current, setSelected, isChecked}){
	const [TaskLists, setTaskLists] = useState()
	const [currentAdded, setCurrentAdded] = useState()

	function removeFromList(index){
		var taskList = JSON.parse(localStorage.getItem("TodoList"))
		taskList.splice(index, 1)
		localStorage.setItem("TodoList", JSON.stringify(taskList))
		setTaskLists([...taskList])
	}

	
	
	function isChecked(i){
		var data = JSON.parse(localStorage.getItem("TodoList"))
		if(data != null){data[i].isChecked === "true" ? data[i].isChecked = "false" : data[i].isChecked = "true"}
		
		localStorage.setItem("TodoList", JSON.stringify(data))
		setTaskLists([...data])

		for(let i = 0; i < data.length; i++){
			if(data[i].isChecked === "true"){
				isSelected(1) 
				console.log(data)
				break 
			} else { 
				isSelected(0)
			}
		}
		
	}
	function isSelected(param){
		setSelected(param)
	}
	
	useEffect(()=>{
		var dataTask = JSON.parse(localStorage.getItem("TodoList"))
		setTaskLists(dataTask)
	}, [taskLists])
	useEffect(()=>{
		var current = JSON.parse(localStorage.getItem("Current"))
		setCurrentAdded(current)
	}, [current])

	
	if(TaskLists != null){
		if(state == 0 && currentAdded != null){
			return(
				currentAdded.map((item, i)=>(
					<label htmlFor={"Task" + i.toString()} key={i}>
						<p>{item.Task}</p> <button className="removeBtn" onClick={(i)=>removeFromList(i)}>X</button>
					</label>
				))
			)
		} else if (state == 1){
			return(
				TaskLists.map((item, i) => (
					<label htmlFor={"Task" + i.toString()} className={item.State === "Finished" ? "finishedTasks" : "pendingTasks"} key={i}>
						<p>{item.Task}</p> <button className="removeBtn" onClick={(i)=>removeFromList(i)}>X</button>
					</label>
				))
			)
		} else if (state == 2) {
			return(
				TaskLists.map((item, i) => (
					item.State == "Pending" ? 
					<label htmlFor={"Task" + i.toString()} className={item.isChecked == "true" ? "highlight" : "pendingTasks"} key={i} onClick={()=>isChecked(i)}>
						<p>{item.Task}</p> <button className="removeBtn" onClick={()=>removeFromList(i)}>X</button>
					</label>
					: console.log()
				))
			)
		} else if (state == 3){
			return(
				TaskLists.map((item, i) => (
					item.State == "Finished" ? 
					<label htmlFor={"Task" + i.toString()} className={item.isChecked == "true" ? "highlight" : "finishedTasks"} key={i} onClick={()=>isChecked(i)}>
						<p>{item.Task}</p> <button className="removeBtn" onClick={(i)=>removeFromList(i)}>X</button>
					</label>
					: console.log()
				))
			)
		}
	}
	
	
}