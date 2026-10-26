import entry from "../assets/HouseEntryIMG/1 (2).png";
import pool from "../assets/OutdoorIMG/5.png";
import poolside from "../assets/OutdoorIMG/2 (1).png";
import poolDinner from "../assets/OutdoorIMG/3.png";
import outdoorDining from "../assets/OutdoorIMG/1.png";
import pavilion from "../assets/OutdoorIMG/6.png";
import driveway from "../assets/OutdoorIMG/10.png";
import court from "../assets/OutdoorIMG/7.png";
import pickleball from "../assets/OutdoorIMG/8.png";
import yoga from "../assets/OutdoorIMG/9.png";
import outdoorSeating from "../assets/OutdoorIMG/4 (1).png";
import living from "../assets/LivingRoomIMG/4 (2).png";
import livingDetail from "../assets/LivingRoomIMG/1 (2).png";
import dining from "../assets/DinningIMG/3 (4).png";
import diningEmpty from "../assets/DinningIMG/1 (4).png";
import kitchen from "../assets/KitchenIMG/3 (3).png";
import kitchenDetail from "../assets/KitchenIMG/1 (3).png";
import bedroomOne from "../assets/BedroomIMG/1 (7).png";
import bedroomTwo from "../assets/BedroomIMG/2 (7).png";
import bedroomThree from "../assets/BedroomIMG/3 (7).png";
import bedroomPortrait from "../assets/BedroomIMG/4 (4).png";
import bar from "../assets/BarIMG/1 (8).png";

const photo = (src, alt, w = 1536, h = 1024, focus = "center", caption = alt) => ({ src, alt, w, h, focus, caption });

export const assets = {
  entry: photo(entry, "Villa Modaro entrance with landscaped lawns and trees"),
  pool: photo(pool, "Blue-tiled swimming pool framed by palms and greenery"),
  poolside: photo(poolside, "Shaded seating beside the villa pool"),
  poolDinner: photo(poolDinner, "Guests sharing an evening meal at an outdoor table", 1536, 1024, "center 55%"),
  outdoorDining: photo(outdoorDining, "Covered outdoor dining area prepared for a gathering"),
  pavilion: photo(pavilion, "Open garden pavilion surrounded by lawn and greenery"),
  driveway: photo(driveway, "Tree-lined driveway leading to Villa Modaro"),
  court: photo(court, "Outdoor pickleball court set among the gardens"),
  pickleball: photo(pickleball, "Guests playing pickleball on the garden court"),
  yoga: photo(yoga, "Yoga mats on the lawn beside the pickleball court"),
  outdoorSeating: photo(outdoorSeating, "Outdoor dining table beside the pool under a garden umbrella"),
  living: photo(living, "Friends relaxing together in the villa living room"),
  livingDetail: photo(livingDetail, "Warm living room with sofa seating and a television"),
  dining: photo(dining, "Guests sharing dinner around the villa dining table"),
  diningEmpty: photo(diningEmpty, "Villa dining table set for an evening meal"),
  kitchen: photo(kitchen, "Bright contemporary kitchen with a central island"),
  kitchenDetail: photo(kitchenDetail, "Kitchen worktop and breakfast preparation area"),
  bedroomOne: photo(bedroomOne, "Warmly lit villa bedroom with a double bed"),
  bedroomTwo: photo(bedroomTwo, "Villa bedroom with a double bed and lounge chair"),
  bedroomThree: photo(bedroomThree, "Villa bedroom with television and reading chair"),
  bedroomPortrait: photo(bedroomPortrait, "Vertical view of a villa bedroom doorway", 1024, 1536),
  bar: photo(bar, "Guests gathered around the villa bar and pool table"),
};
