import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router";
import { MENU_API } from "../utils/constants";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);

  const { resId } = useParams();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(MENU_API + resId);
    const json = await data.json();
    console.log(json);
    setResInfo(json.data);
  };

  if (resInfo == null) return <Shimmer />;

  // Find restaurant info dynamically
  const restaurantInfo = resInfo?.cards?.find(
    (card) => card?.card?.card?.info
  )?.card?.card?.info;

  // Find menu items dynamically
  const menuCard = resInfo?.cards?.find(
    (card) =>
      card?.groupedCard?.cardGroupMap?.REGULAR?.cards?.some(
        (c) => c?.card?.card?.itemCards
      )
  );

  const itemCards = menuCard?.groupedCard?.cardGroupMap?.REGULAR?.cards?.find(
    (c) => c?.card?.card?.itemCards
  )?.card?.card?.itemCards;

  return (
    <div className="menu">
      <h1>{restaurantInfo?.name || "Restaurant Name"}</h1>
      <h4>
        {restaurantInfo?.cuisines?.join(", ") || "Cuisines not available"} -{" "}
        {restaurantInfo?.costForTwoMessage || "N/A"}
      </h4>
      <h2>Menu</h2>
      <ul>
        {Array.isArray(itemCards) ? (
          itemCards.map((item) => (
            <li key={item.card.info.id}>
              {item.card.info.name} - ₹
              {item.card.info.price / 100 || item.card.info.defaultPrice / 100}
            </li>
          ))
        ) : (
          <li>Menu is not available for this restaurant</li>
        )}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
