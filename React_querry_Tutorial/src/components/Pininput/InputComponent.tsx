import "./OtpInput.css";
import { useMemo } from "react";
import { RE_DIGIT } from "./constants";

export type props = {
  value: string;
  valueLength: number;
  onChange: (value: string) => void;
};

export default function InputPin({ value, valueLength, onChange }: props) {
  // 1) FIRST VALUEARRAY SCONVERTS THE NUMBER STING TO AN ARRARY BY USING THE SPILT
  // 2) SECOND WE LOOP THROUGH AND SAVES THE VALUE FROM THE VALUE ARRAY INTO A CHAR
  // 3) AFTER WE CHECK TO SEE IF THE CHAR CONTAINS A VULAUE. THEN WE PUSH IT INTO THE ARRYA
  // 4) ELSE WE PUSH AN EMPTY STING INTO THE VALUE ARRAY
  // 5) THEN WE RETURN THE ITEMS NOW AN ARRAY
  // 6) THE WE RETURN THE LIST  VALUES AND VAUEARRAY
  const valueItems = useMemo(() => {
    const valueArray = value.split("");
    const items: Array<string> = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];

      if (RE_DIGIT.test(char)) {
        items.push(char);
      } else {
        items.push("");
      }
    }

    return items;
  }, [value, valueLength]);

  const focusToNextInput = (target: HTMLElement) => {
    const nextElementSibling =
      target.nextElementSibling as HTMLInputElement | null;

    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };
  const focusToPrevInput = (target: HTMLElement) => {
    const previousElementSibling =
      target.previousElementSibling as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };

  // HANDLING ON CHANGE EVENT
  // WE TEST TO SEE IF THE INPUT IS A NUMBER IT ID. THEN  WE GET THE VAULE
  const inputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const target = e.target;
    let targetValue = target.value;
    const isTargetValueDigit = RE_DIGIT.test(targetValue);

    // CCHECK IF THERE IS NO DIGIT AND NO EMPTY STRING
    if (!isTargetValueDigit && targetValue !== "") {
      return;
    }

    const nextInputEl = target.nextElementSibling as HTMLInputElement | null;

    // only delete digit if next input element has no value
    if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== "") {
      return;
    }

    // ?THEN GET THE LENGTH OF THE TARGET VALUE
    targetValue = isTargetValueDigit ? targetValue : " ";
    const targetValueLength = targetValue.length;
    // CHECK IF THE TARGET VALUE IS ===1 THE GET THE SUBSTRING AND THE VALUE FROM 0 AND THE TO THE LAST INDEX VALUE
    if (targetValue.length === 1) {
      const newValue =
        value.substring(0, idx) + targetValue + value.substring(idx + 1);

      onChange(newValue);
      // WE CHECK TO SEE IF THE TVALUE IS NOT A NUMBER THEN WE RETURN
      // Allow deleting digits from input boxes
      if (!isTargetValueDigit) {
        return;
      }
      focusToNextInput(target);
    } else {
      // THEN WE HANDLE THE NEXT ELEMENT
      // THIS HANDLES PASTE EVENTS
      const nextElementSibling =
        target.nextElementSibling as HTMLInputElement | null;

      // WE CHECK IF THERE IS NEXTE ELEMENT, THEN THE MOUSEE DHOULD FOCUS ON THE NEXT ELEMENT
      if (nextElementSibling) {
        nextElementSibling.focus();
        // ELSE IF THE FOCUS IS ON THE LAST ELEMENT, THEN THE MOUSEE SHOULD BLUR
      } else if (targetValueLength === valueLength) {
        onChange(targetValue);

        target.blur();
      }
    }
  };

  // DALLOWING BACSPACE DELETING. THIS ALLOWS USER TO DELETE ON BACKSPACE
  // *****iNPUT ON KEY dOWN *****
  const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;

    // keep the selection range position
    // if the same digit was typed
    // target.setSelectionRange(0, targetValue.length);

    if (key === "ArrowRight" || key === "ArrowDown") {
      e.preventDefault();
      return focusToNextInput(target);
    }

    if (key === "ArrowLeft" || key === "ArrowUp") {
      e.preventDefault();
      return focusToPrevInput(target);
    }
    const targetValue = target.value;

    if (e.key !== "Backspace" || targetValue !== "") {
      return;
    }
    focusToPrevInput(target);

    const previousElementSibling =
      target.previousElementSibling as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };

  // *******iNPUT ON FOCUSED *******
  const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { target } = e;

    // keep focusing back until previous input
    // element has value
    const prevInputEl =
      target.previousElementSibling as HTMLInputElement | null;

    if (prevInputEl && prevInputEl.value === "") {
      return prevInputEl.focus();
    }

    target.setSelectionRange(0, target.value.length);
  };
  return (
    <div className="otp-group">
      {valueItems.map((digit, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1}"
          maxLength={valueLength}
          className="otp-input"
          value={digit}
          onChange={(e) => inputOnChange(e, idx)}
          onKeyDown={inputOnKeyDown}
          onFocus={inputOnFocus}
        />
      ))}
    </div>
  );
}
