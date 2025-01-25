
import Shimmer from "./Shimmer";
import { useParams } from "react-router";
import { MENU_API } from "../utils/constants";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

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
