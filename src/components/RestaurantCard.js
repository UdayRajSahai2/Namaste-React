import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) =>{
    const {resData} = props;
    const{cloudinaryImageId,name,cuisines,avgRating,costForTwo} = resData?.info;
    const{deliveryTime} = resData?.info?.sla;
    return(
        <div className="m-4 p-4 max-w-md rounded-lg bg-gray-300 hover:bg-gray-700">
            <img className="rounded-lg" alt="res-logo" src=
            {CDN_URL + cloudinaryImageId}></img>
            <h3 className="font-bold py-3 text-lg">{name}</h3>
            <h4 className="break-all">{cuisines.join(",")}</h4>
            <h4>{avgRating} stars</h4>
            <h4>{costForTwo}</h4>
            <h4>{deliveryTime} minutes</h4>
        </div>
    )
}
export default RestaurantCard;