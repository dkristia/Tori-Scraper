import { Button } from "@mui/base";
import { TextField } from "@mui/material";
import { useState } from "react";
import styles from "./CityInput.module.css";
import cities from "./cities.json";

const search = (currentlyTyped: string) => {
  const possibleCities = [];
  for (const city of cities) {
    let comparisonResult = currentlyTyped.localeCompare(
      city.slice(0, currentlyTyped.length),
      undefined,
      { sensitivity: "accent" }
    );
    if (comparisonResult === 0) {
      possibleCities.push(city);
      if (possibleCities.length === 15) {
        break;
      }
    } else if (comparisonResult === -1) {
      break;
    }
  }
  return possibleCities;
};
function CityInput({
  selectedCity,
  setCity,
}: {
  selectedCity: string | undefined;
  setCity: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const [currentlyTyped, setCurrentlyTyped] = useState("");
  const [possibleCities, setPossibleCities] = useState<string[]>([]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentlyTyped(event.target.value);
    setPossibleCities(search(event.target.value));
    setCity(undefined);
  };
  const handleClose = () => {
    if (possibleCities[0]) {
      setCity(possibleCities[0]);
    }
  };
  return (
    <div>
      <TextField
        value={selectedCity || currentlyTyped}
        label="Valitse asuinkuntasi"
        onChange={handleInputChange}
        onBlur={handleClose}
      />
      <div className={styles.cities}>
        {!selectedCity &&
          currentlyTyped !== "" &&
          possibleCities.map((city) => (
            <Button onClick={() => setCity(city)}>{city}</Button>
          ))}
      </div>
    </div>
  );
}
export default CityInput;
