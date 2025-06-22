import React from "react";
import Feeding from "./Feeding";
import Health from "./Health";
import Breeding from "./Breeding";
import Equipment from "./Equipment";
import Breeds from "./Breeds";

export function getGuideComponent(name) {
  switch (name) {
    case "Żywienie":
      return <Feeding />;
    case "Zdrowie":
      return <Health />;
    case "Rozród":
      return <Breeding />;
    case "Wyposażenie":
      return <Equipment />;
    case "Rasy":
      return <Breeds />;
    default:
      return null;
  }
}