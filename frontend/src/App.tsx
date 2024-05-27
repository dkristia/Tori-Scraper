import { useState } from "react";
import styles from "./App.module.css";
import { TextField, Typography } from "@mui/material";
import InputSlider from "./InputSlider";
import { Button } from "@mui/base";
import CityInput from "./CityInput";

import "dayjs/locale/fi";
import makeRequest from "./makeRequest";

function App() {
  const [inputtedItem, setInputtedItem] = useState("");
  const [priceRange, setPriceRange] = useState([50, 100]);
  const [city, setCity] = useState<string | undefined>();
  const [distance, setDistance] = useState(50);
  const [email, _setEmail] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [productNotFound, setProductNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleButton = async () => {
    setProductNotFound(false);
    setIsLoading(true);
    console.log(productNotFound);
    const result = await makeRequest({
      product: inputtedItem,
      priceMin: Math.min(...priceRange),
      priceMax: Math.max(...priceRange),
      city: city || "PLACEHOLDER",
      distance,
      email,
      data: [],
    });
    setData(result);
    console.log(result.length)
    if (result.length === 0) {
      setProductNotFound(true);
    } else {
      setProductNotFound(false);
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.app}>
      <TextField
        label="Mitä tuotetta tahdot etsiä?"
        value={inputtedItem}
        onChange={(event) => {
          setInputtedItem(event.target.value);
        }}
        required
      />

      <InputSlider
        name="Hinta (€)"
        value={priceRange}
        setValue={setPriceRange}
        min={0}
        max={4000}
        valueLabelDisplay="on"
        marks={[
          { value: 100, label: "100€" },
          { value: 500, label: "500€" },
          { value: 1000, label: "1000€" },
          { value: 2000, label: "2000€" },
          { value: 3000, label: "3000€" },
          { value: 4000, label: "4000€" },
        ]}
      />
      <CityInput selectedCity={city} setCity={setCity}></CityInput>
      <InputSlider
        name="Maksimi Etäisyys (km)"
        value={distance}
        setValue={setDistance}
        min={10}
        max={800}
        step={10}
        valueLabelDisplay="on"
        marks={[
          { value: 100, label: "100km" },
          { value: 200, label: "200km" },
          { value: 300, label: "300km" },
          { value: 400, label: "400km" },
          { value: 500, label: "500km" },
          { value: 600, label: "600km" },
          { value: 700, label: "700km" },
          { value: 800, label: "800km" },
        ]}
      />

      <Button onClick={handleButton}>Aloita haku</Button>
      <Typography>
        {isLoading
          ? "Haetaan tietoja..."
          : productNotFound
          ? "Tuotetta ei löytynyt rajauksien sisällä, yritä hakea suuremmalla etäisyydellä tai hintahaarukalla."
          : ""}
      </Typography>
      {data.map(
        (item) =>
          Array.isArray(item) && (
            <div className={styles.content}>
              {item.map((content: any) => (
                <>
                  <Typography>{content}</Typography>
                  <br />
                </>
              ))}
            </div>
          )
      )}
    </div>
  );
}

export default App;
