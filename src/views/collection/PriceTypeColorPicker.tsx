import { FC, useState } from "react";
import 'rc-color-picker/assets/index.css';
import { Button } from "antd";
const ColorPicker = require('rc-color-picker');

export const PriceTypeColorPicker : FC = () =>{

    const [colorCode, setColorCode] = useState("#34c");

    const onChange = (color : any ) =>{
        setColorCode(color.color);
    }

    return  <ColorPicker color={colorCode} onChange={onChange}>
        <Button className="react-custom-trigger" shape="circle" style={{background:colorCode}}>&nbsp;</Button>
    </ColorPicker>

}