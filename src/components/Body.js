import RestaurantCard from "./RestaurantCard";
import { useState, useEffect, use } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";
const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const[filteredRestaurant,setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  console.log("Body rendered",listOfRestaurants);
  
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.5822999&lng=77.0499762&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    //console.log(json);
    setListOfRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant( json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  };

  const onlineStatus = useOnlineStatus();
  if(onlineStatus === false) return <h1>Looks like you're offline !!!! Please check your internet connection</h1>

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="m-4 p-4">
          <input
            type="text"
            className="border border-black border-solid  p-2 rounded-lg focus:outline-none"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            value={searchText}
             placeholder="Search restaurants..."
          />
          <button className="px-4 py-2 bg-green-400 m-2 rounded-lg hover:bg-green-600"
            onClick={() => {
              const filteredRestaurant = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <div className="m-4 p-4 flex items-center">
        <button
          className="px-4 py-1 bg-amber-200 text-black m-1 rounded-lg cursor-pointer hover:bg-amber-500"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4.3
            );
            setFilteredRestaurant(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
        </div>       
      </div>
      <div className="flex flex-wrap">
        {filteredRestaurant.map((restaurant) => (
          <Link
          key={restaurant.info.id} 
          to = {"/restaurants/" + restaurant.info.id }>
          <RestaurantCard  resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Body;
