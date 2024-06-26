import { Input, Slider, SliderOwnProps, Typography } from "@mui/material";
import styles from "./InputSlider.module.css";

interface inputSliderProps extends SliderOwnProps {
  name: string;
  setValue:
    | React.Dispatch<React.SetStateAction<number>>
    | React.Dispatch<React.SetStateAction<number[]>>;
  value: number | number[];
}
function NumberInput({
  value,
  onChange,
  min,
}: {
  value: number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  min: number | undefined;
}) {
  return (
    <div className={styles.numberInput}>
      <Input
        value={value}
        size="small"
        onChange={onChange}
        inputProps={{
          step: 10,
          min: min,
          type: "number",
        }}
      />
    </div>
  );
}
function InputSlider(props: inputSliderProps) {
  const handleChange = (_event: Event, newValue: number | number[]) => {
    props.setValue(newValue as number & number[]);
  };

  const setNumberInputValue = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const inputValue =
      event.target.value === "" ? 0 : Number(event.target.value);
    const value =
      typeof props.value === "number"
        ? inputValue
        : id === 0
        ? [inputValue, props.value[1]]
        : [props.value[0], inputValue];
    props.setValue(value as number & number[]);
  };

  return (
    <div className={styles.inputSlider}>
      <div className={styles.name}>
        <Typography>{props.name}</Typography>
      </div>
      <div className={styles.inputs}>
        <div className={styles.slider}>
          <Slider
            onChange={handleChange}
            min={props.min}
            max={props.max}
            marks={props.marks}
            step={props.step}
            value={props.value}
            valueLabelDisplay="auto"
          />
        </div>
        {typeof props.value === "number" && (
          <NumberInput
            value={props.value}
            onChange={(event) => {
              setNumberInputValue(event, 0);
            }}
            min={props.min}
          />
        )}
        {typeof props.value !== "number" && (
          <>
            <NumberInput
              value={props.value[0]}
              onChange={(event) => {
                setNumberInputValue(event, 0);
              }}
              min={props.min}
            />
            <Typography variant="h3">-</Typography>
            <NumberInput
              value={props.value[1]}
              onChange={(event) => {
                setNumberInputValue(event, 1);
              }}
              min={props.min}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default InputSlider;
