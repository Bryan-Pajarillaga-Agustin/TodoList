import { useState, useRef, useEffect } from "react";
import "./PDocumentation.css"
import Folders from "./folder";
import Images from "./Images";
const database = firebase.database()
const storage = firebase.storage()

export default function PDocumentation({ pagination, userRootName, data, setData }){
	const [indexFolder, setIndexFolder] = useState(null)
	const [emptyFolder, setEmptyFolder] = useState(true)
	const [addFilesTo, setAddFilesTo] = useState(null)
	const [folderShown, setFolderShown] = useState(false)
	const [rootFolderBool, setRootFolderBool] = useState(false)
	const [rootFolderName, setRootFolderName] = useState(false)
	const [folderRootName, setFolderRootName] = useState(null)
	const [dataLocal, setDataLocal] = useState(null)
	const [loading, setLoading] = useState(false)

	const loadingBar = useRef(null)
	const ownerFolderValue = useRef(null)
	const ownerFolderDisplay = useRef(null)
	const loadingPercent = useRef(null)

	const [filesTransfered, setFilesTransfered] = useState(null)

	function setName(){
		if(ownerFolderValue.value != ""){
			const setRootFolder = {
				UserRootName: ownerFolderValue.current.value
			}

			localStorage.setItem("RootFolder", JSON.stringify(setRootFolder))
			setRootFolderName(true)
			ownerFolderDisplay.current.textContent = ownerFolderValue.current.value + "'s Folder"
		}
	}

	function UploadFiles(items) {
		const files = items.target.files
		let listOfImages = []
		// looping all the images founded
		for(let i = 0; i < files.length; i++){
			files[i]
			const uniqueId = Date.now().toString();
			const storageRef = storage.ref(folderRootName + "/" + uniqueId + "_" + files[i].name);
		
			// Track upload progress
			const uploadTask = storageRef.put(files[i]);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
				  // Observe state change events such as progress, pause, and resume
				  setLoading(true)
				  const progress = Math.floor(((snapshot.bytesTransferred / snapshot.totalBytes) * 100), 5);
				  loadingBar.current.style.width = progress
				  loadingPercent.current.style.textContent = progress
				  // Update UI with progress information
				},
				(error) => {
				  // Handle unsuccessful uploads
				  console.error("Error uploading file:", error);
				  // Display an error message to the user
				},
				() => {
				  // Handle successful uploads on complete
				 
				  // Get the download URL
				  uploadTask.snapshot.ref.getDownloadURL().then((url) => {
						storeToDB(url) // Setting every downloaded image url into the array
				  });
				}
			);
		}

		setTimeout(()=>{
			setLoading(false)
		}, 1000)
		
	}

	function handleIndexFolder(index, item){
		setIndexFolder(index)
		if(item.folder == "null"){
			setEmptyFolder(false)
		} else {
			setEmptyFolder(true)
		}
	}

	function updateData(){
		localStorage.setItem("")
	}

	function storeToDB(url){
		console.log(indexFolder)
		var RootFolder = JSON.parse(localStorage.getItem("RootFolder"))
		var data = JSON.parse(localStorage.getItem("data"))
		if(data[indexFolder].folder[0] == "null"){
			data[indexFolder].folder.pop()
			data[indexFolder].folder.unshift(url)
		} else {
			data[indexFolder].folder.unshift(url)
		}
		
		setEmptyFolder(true)
		setDataLocal(data)
		localStorage.setItem("data", JSON.stringify(data)) //Saves the data to the local Storage
		// database.ref(RootFolder.UserRootName + "/").set(array) // Saving the data to the firabase database
	}

	function newFolder(){
		if(folderRootName != null){
			let data = JSON.parse(localStorage.getItem("data"))
		let updateData = []
		let object
		let inputFolderName = window.prompt("Name Your Folder: ")
		console.log(inputFolderName)

			if (inputFolderName < 1) {
				let date = new Date();
				let hours = date.getHours();
				let minutes = date.getMinutes();
				let ampm = hours >= 12 ? 'pm' : 'am';
				hours = hours % 12;
				hours = hours ? hours : 12; // Handle midnight
				let currentTime = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;

				object = {

					name: currentTime,
					folder: ["null"]
				} 
			} else if (inputFolderName.length >=1) {
				object = {
					name: inputFolderName,
					folder: ["null"]
				} 
			}

			if(data != null){
				data.unshift(object)
				setData([...data])
				setDataLocal([...data])
				localStorage.setItem("data", JSON.stringify(data))
			} else {
				data = []
				data.unshift(object)
				updateData = data
				setData([...updateData])
				setDataLocal([...updateData])
				localStorage.setItem("data", JSON.stringify(updateData))
			}
		}
		
	}

	useEffect(()=>{
		// const user_ref = database.ref("users")
		// user_ref.on("value", function(snapshot){
		// 	const data = snapshot.val()
		// 	setData(data)
		// })
		let data = JSON.parse(localStorage.getItem("data"))
		let RootFolder = JSON.parse(localStorage.getItem("RootFolder"))
		setDataLocal(data)
		setFolderRootName(RootFolder.UserRootName)
	}, [data])
	
	useEffect(()=>{
		if(userRootName != null){
			setRootFolderBool(true)
			setRootFolderName(true)
			if(ownerFolderDisplay.current != null && root != null) {
				ownerFolderDisplay.current.textContent = userRootName.UserRootName + "'s Folder"
			}
		} else { 
			setRootFolderBool(false) 
		}
	}, [userRootName, pagination])


	if(pagination == 2){
		return (
			<div className="MainPDocs">
				<nav className="NavigationBar">
					<button className="SelectFolder" onClick={()=>{}}>
						Upload File
					</button>
					<button className="NewFolder" onClick={()=>{newFolder()}}>
						New Folder
					</button>
				</nav>

				<div className="RootNameFolder">
					<button onClick={()=>{setRootFolderBool(true)}} className={!rootFolderBool ? "putName" : "None"}>Set a root Folder</button>
					<input type="text" ref={ownerFolderValue} placeholder="✍️ Put Your First Name..." className={rootFolderBool && !rootFolderName ? "owner" : "None"}/>
					<button className={rootFolderBool && !rootFolderName ? "confirmSet" : "None"} onClick={()=>setName()}>Set</button>
					<h1 ref={ownerFolderDisplay} className={rootFolderName ? "displayRootName" : "None"}></h1>
				</div>

				<p id="horizontalLine"></p>

				<div className="FolderContainer">
					{dataLocal != null ? dataLocal.map((item, i)=>(
					<Folders
						key={i}
						i={i}
						FolderName={item.name}
						item={item}
						handleIndexFolder={(index, item)=>handleIndexFolder(index, item)}
						setFolderShown={(par)=>setFolderShown(par)}
					/>
				)) : null}
				</div>
				

				<div className={folderShown ? "selectedFolder" : "notShown"}>
					<div className="firstSection">
						<button id="backButton" onClick={()=>{setFolderShown(false)}}>↵</button>
						<h1>{data != null && indexFolder != null ? data[indexFolder].name : null }</h1> 
					</div>
					<div className="wrapper">
						<input type="file" id="addFiles" multiple onChange={(item)=>{UploadFiles(item)}}/>

						<div className="ImageContainer">
							{
								dataLocal != null && indexFolder != null ? dataLocal[indexFolder].folder.map((item)=>(
									<Images
										key={item}
										item={item}	
									/>
								))
								: null
							}
							<label htmlFor="addFiles" className={emptyFolder ? "addFiles" : "addFilesEmpty"}> <p>+</p> </label>
						</div>
						
						<div className={loading ? "wrapLoadingBar" : "None"}>
							<div className="loadingBar">
								<p className="bar" ref={loadingBar}>
									
								</p>
								<h1 ref={loadingPercent}>0%</h1>
							</div>
						</div>
						
						
					</div>
				</div>

			</div>
		)
		
	}

	
}