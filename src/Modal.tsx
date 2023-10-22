import { Accessor, JSXElement, Setter } from "solid-js"

export const Modal = (props: {
    children: JSXElement,
    visible: [Accessor<boolean>, Setter<boolean>]
}) => {

    return (
        <div
            style="height: 100dvh;" 
            class="fixed top-0 left-0 w-screen bg-white px-4 py-8 overflow-y-scroll">
            <button
                class="absolute top-2 right-4 text-xl"
                onClick={() => props.visible[1](false)}>
                x
            </button>
            {props.children}
        </div>
    )
}