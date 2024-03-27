import React, { ChangeEvent, useState } from "react";
import styles from './colorpicker.module.css';

interface ColorPickerProps {
  onChange: (color: string) => void;
}


const ColorPicker: React.FC<ColorPickerProps> = ({onChange}) => {
  const [color, setColor] = useState("#FFFFFF");

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
    onChange(e.target.value);
  }

  return(
    <div>
      <div className={styles.picker}>
        <label>Select a color:</label>
        <input type="color" value={color} onChange={handleColorChange} id={styles.colorPicker} />
        {/* <div style={{backgroundColor: color}} className={styles.backGr}></div> */}
      </div>
    </div>
  )
}

export default ColorPicker;