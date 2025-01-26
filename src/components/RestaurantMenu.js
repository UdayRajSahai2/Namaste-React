import Shimmer from "./Shimmer";
import { useParams } from "react-router";
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
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
        {restaurantInfo?.name || "Restaurant Name"}
      </h1>
      <h4 className="text-lg text-gray-600 text-center mb-6">
        {restaurantInfo?.cuisines?.join(", ") || "Cuisines not available"} -{" "}
        <span className="font-semibold">
          {restaurantInfo?.costForTwoMessage || "N/A"}
        </span>
      </h4>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">
          Menu
        </h2>
        <ul className="space-y-3">
          {Array.isArray(itemCards) ? (
            itemCards.map((item) => (
              <li
                key={item.card.info.id}
                className="flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition-all"
              >
                <span className="text-gray-700 font-medium">
                  {item.card.info.name}
                </span>
                <span className="text-green-600 font-semibold">
                  ₹
                  {item.card.info.price / 100 || item.card.info.defaultPrice / 100}
                </span>
              </li>
            ))
          ) : (
            <li className="text-gray-500 text-center">
              Menu is not available for this restaurant
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantMenu;

