import { JSXElement } from "solid-js";

export const Button = (props: { children: JSXElement }) => 
    <button class="bg-orange-600 text-white text-lg px-10 py-6 mb-4">
        {props.children}
    </button>