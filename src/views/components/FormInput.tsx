import { FC, useRef, useEffect, ReactElement } from "react";
import { Form, Input } from "antd";
import { FormLabelAlign } from "antd/lib/form/interface";

export const FORM_INPUT_FOCUS_EVENT = "FORM_INPU_FOCUS_EVENT";

export const FORM_INPUT_BLUR_EVENT = "FORM_INPU_BLUR_EVENT";

export const emitFormInputEvent = (type : string) => {

    const event = new Event( type );
    event.preventDefault();
    document.dispatchEvent(event);
}

export interface FormInputProps {
	    
    style? : React.CSSProperties | undefined,

    formItemStyle? : React.CSSProperties | undefined,

    className? : string, 

    name? : string,

    label? : string|ReactElement,

    labelAlign? : FormLabelAlign,

    readOnly? : boolean,

    required? : boolean,

    value? : string, 

    onChange? : (e: React.ChangeEvent<HTMLInputElement>) => void,

    onClick? : (e: React.FormEvent<HTMLInputElement>) => void,
 
    onDoubleClick? : (e: React.FormEvent<HTMLInputElement>) => void,
 
    isSecure? : boolean, 

    defaultValue? : string;

    onPressEnter? : (e: React.FormEvent<HTMLInputElement>) => void,

    focus? : boolean,

    setFocus? : (f : boolean) => void, 

    maxLength? : number,

    placeholder? : string, 
}

export const FormInput : FC <FormInputProps> = ({
    style, formItemStyle, className, name, label, 
    labelAlign, readOnly, required, value, onChange, 
    onDoubleClick, onClick, isSecure, defaultValue, 
    placeholder, onPressEnter, focus, setFocus, maxLength}) =>{

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

    return <Form.Item label={label} labelAlign={labelAlign ?? "right"}
    rules = {[{required : required ? required : false, message :"Missing " + name}]}
    style={formItemStyle ? formItemStyle : {fontWeight:"500"}} name={name}>
        {
            isSecure ?
            <Input.Password style={style} ref={focusField} className={className}
            id={name} value={value ? value : ""} maxLength={maxLength}
            onChange={onChange} onClick={onClick} onDoubleClick={onDoubleClick} 
            onFocus={()=>{
                emitFormInputEvent(FORM_INPUT_FOCUS_EVENT);  
            }}
            onBlur={()=>{
                emitFormInputEvent(FORM_INPUT_BLUR_EVENT);
            }} />
            : 
            <Input style={style} className={className} readOnly={readOnly ? readOnly : false } ref={focusField}
            id={name} value={value ? value : ""} defaultValue={defaultValue} maxLength={maxLength}
            placeholder={placeholder} onChange={onChange} onClick={onClick} onDoubleClick={onDoubleClick} onPressEnter={onPressEnter}
            onFocus={()=>{
                emitFormInputEvent(FORM_INPUT_FOCUS_EVENT);  
            }}
            onBlur={()=>{
                emitFormInputEvent(FORM_INPUT_BLUR_EVENT);
            }}
            />
       
        }
    </Form.Item>

}