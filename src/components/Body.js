import RestaurantCard from "./RestaurantCard";
import { useState } from "react";
import resList from "../utils/mockdata";
const Body = () => {
    const [listOfRestaurants,setListOfRestaurants] = useState(resList);
    return (
    <div className="body">
        <div className="filter">
            <button className="filter-btn" 
            onClick={() => 
            {
                const filteredList = listOfRestaurants.filter(
                    (res) => res.info.avgRating > 4.3
                );
                setListOfRestaurants(filteredList);
            }}>
            Top Rated Restaurants</button>
        </div>
        <div className="res-container">
           {
                listOfRestaurants.map((restaurant) => <RestaurantCard key = {restaurant.info.id} resData={restaurant} />)
           }
            
        </div>
    </div>
    )
}
export default Body;