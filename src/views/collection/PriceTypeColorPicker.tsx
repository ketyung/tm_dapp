import { FC } from "react";
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

    const onChange = (color : any ) =>{
        if (setSelectedColorCode) {
            setSelectedColorCode(color.color);
        }
    }

    return  <ColorPicker color={selectedColorCode} onChange={onChange}>
        <Button className="react-custom-trigger" shape="circle" 
        style={{background:selectedColorCode}}>&nbsp;</Button>
    </ColorPicker>

}