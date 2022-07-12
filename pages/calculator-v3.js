import { useButton } from "@react-aria/button";
import { useRef } from "react";

function Button(props) {
  let ref = useRef();
  let { buttonProps, isPressed } = useButton(props, ref);
  let { children } = props;

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={`${
        isPressed ? "bg-gray-200" : ""
      } rounded border border-gray-300 px-3 py-2`}
    >
      {children}
    </button>
  );
}

export default function CalculatorPage() {
  return (
    <div className="p-8">
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nisi eum
        quasi dignissimos distinctio excepturi, corrupti cum hic. Numquam,
        pariatur. Minus nobis quae aliquid adipisci facere! Voluptatem ullam
        culpa amet? Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Vero nisi eum quasi dignissimos distinctio excepturi, corrupti cum hic.
        Numquam, pariatur. Minus nobis quae aliquid adipisci facere! Voluptatem
        ullam culpa amet? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Vero nisi eum quasi dignissimos distinctio excepturi, corrupti cum
        hic. Numquam, pariatur. Minus nobis quae aliquid adipisci facere!
        Voluptatem ullam culpa amet? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Vero nisi eum quasi dignissimos distinctio excepturi,
        corrupti cum hic. Numquam, pariatur. Minus nobis quae aliquid adipisci
        facere! Voluptatem ullam culpa amet? Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Vero nisi eum quasi dignissimos distinctio
        excepturi, corrupti cum hic. Numquam, pariatur. Minus nobis quae aliquid
        adipisci facere! Voluptatem ullam culpa amet? Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Vero nisi eum quasi dignissimos distinctio
        excepturi, corrupti cum hic. Numquam, pariatur. Minus nobis quae aliquid
        adipisci facere! Voluptatem ullam culpa amet?
      </div>

      <div className="py-8">
        <Button onPress={() => console.log("Button pressed!")}>Test</Button>
      </div>

      <div>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod nesciunt
        nihil ipsum dolorum, cum quidem? Aperiam omnis ut, modi beatae, unde
        veritatis, minus ipsum harum tenetur maiores est voluptatibus illum?
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod nesciunt
        nihil ipsum dolorum, cum quidem? Aperiam omnis ut, modi beatae, unde
        veritatis, minus ipsum harum tenetur maiores est voluptatibus illum?
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod nesciunt
        nihil ipsum dolorum, cum quidem? Aperiam omnis ut, modi beatae, unde
        veritatis, minus ipsum harum tenetur maiores est voluptatibus illum?
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod nesciunt
        nihil ipsum dolorum, cum quidem? Aperiam omnis ut, modi beatae, unde
        veritatis, minus ipsum harum tenetur maiores est voluptatibus illum?
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod nesciunt
        nihil ipsum dolorum, cum quidem? Aperiam omnis ut, modi beatae, unde
        veritatis, minus ipsum harum tenetur maiores est voluptatibus illum?
      </div>
    </div>
  );
}
