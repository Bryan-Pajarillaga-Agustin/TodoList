export default function Images({item}){

	if(item != "null"){
		return (
			<img src={item} width={100} height={100} className="EachPicture" />
		)
	}
	
}