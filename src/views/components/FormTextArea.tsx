import { FC, useRef, useEffect } from "react";
import { Form, Input } from "antd";
import { FORM_INPUT_BLUR_EVENT,FORM_INPUT_FOCUS_EVENT, emitFormInputEvent } from "./FormInput";
import { FormLabelAlign } from "antd/lib/form/interface";

export interface FormTextAreaProps {
	    
    style? : React.CSSProperties | undefined ;

    formItemStyle? : React.CSSProperties | undefined ;

    name? : string;

    label? : string;

    readOnly? : boolean;

    required? : boolean;

    value? : string, 

    onChange? : (e: React.FormEvent<HTMLTextAreaElement>) => void,

    onClick? : (e: React.FormEvent<HTMLTextAreaElement>) => void,
 
    onDoubleClick? : (e: React.FormEvent<HTMLTextAreaElement>) => void,
 
    minRows? : number,

    maxRows? : number, 

    rows? : number, 

    labelAlign? : FormLabelAlign,

    maxLength? : number, 

    placeHolder? : string, 

    focus? : boolean,

    setFocus? : (f : boolean) => void, 

  
}

const { TextArea } = Input;

export const FormTextArea : FC <FormTextAreaProps> = ({
    style, formItemStyle, name, label, readOnly, 
    required, value, onChange, onDoubleClick, rows, labelAlign,
    onClick, minRows, maxRows, maxLength, placeHolder,
    focus, setFocus}) =>{

  
    const focusField = useRef<any>(null);

    useEffect(() => {
        if ( focus ){
            focusField.current.focus();
            
            if ( setFocus)
                setFocus(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [focus]);


    const setReadOnlyBackground = () =>{

        if (readOnly){

            if ( !style) {
            
                style = {backgroundColor: "#dff"}
    
            }
            else {
    
                style['backgroundColor'] = "#dff";
    
            }
        }
      
    }
  
    setReadOnlyBackground();

    return <Form.Item label={label ? label : ""} 
    rules = {[{required : required ? required : false, message :"Missing " + name}]}
    style={formItemStyle ? formItemStyle : {fontWeight:"500"}} name={name} labelAlign={labelAlign ?? "right"}>
        {
           <TextArea value={value}
           onChange={onChange}
           onDoubleClick={onDoubleClick}
           onClick={onClick}
           readOnly={readOnly ? readOnly : false}
           placeholder={placeHolder}
           style={style} maxLength={maxLength}
           ref={focusField}
           rows = {rows ?? 2}
           autoSize={ (minRows || maxRows) ? {minRows : minRows ?? 2, maxRows : maxRows ?? 5} : {}}
           onFocus={()=>{
              emitFormInputEvent(FORM_INPUT_FOCUS_EVENT);  
           }}
           onBlur={()=>{
              emitFormInputEvent(FORM_INPUT_BLUR_EVENT);
           }}/>
        }
    </Form.Item>

}