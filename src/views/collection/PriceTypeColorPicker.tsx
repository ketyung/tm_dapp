import { FC, useState } from "react";
import 'rc-color-picker/assets/index.css';
import { Button } from "antd";
const ColorPicker = require('rc-color-picker');

type Props = {
    selectedColorCode? : string,

    setSelectedColorCode? : ( color : string) => void, 
}

export const PriceTypeColorPicker : FC <Props> = ({
    selectedColorCode, setSelectedColorCode
}) =>{

    const [colorCode, setColorCode] = useState(selectedColorCode ?? "#34c");

    const onChange = (color : any ) =>{
        setColorCode(color.color);
        if (setSelectedColorCode) {
            setSelectedColorCode(color.color);
        }
    }

    return  <ColorPicker color={colorCode} onChange={onChange}>
        <Button className="react-custom-trigger" shape="circle" style={{background:colorCode}}>&nbsp;</Button>
    </ColorPicker>

}