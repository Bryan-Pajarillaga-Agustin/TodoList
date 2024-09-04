export default function Folders({ handleIndexFolder, setFolderShown, FolderName, item, i }){
	

	return(
		<button className="eachFolder" onClick={()=>{handleIndexFolder(i, item), setFolderShown(true)}}>
			<p>{FolderName}</p>
		</button>
	)
}