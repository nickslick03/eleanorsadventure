import { Accessor, Setter } from "solid-js"
import { Modal } from "./Modal";
import { Button } from "./Button";

export const Instructions = (props: {
    visible: [Accessor<boolean>, Setter<boolean>],
    first: boolean,
}) => {

    return (
        <Modal visible={props.visible}>
            <div class="h-full flex flex-col items-center pb-4">
                <div class="grow [&>*]:mb-5 text-lg">
                    <h1 class="text-2xl">Greetings Eleanor!</h1>
                    <p>This game contains 7 levels at meaningful locations across campus. In each location exists a hidden notecard (usually under a chair or table) with the challenge for that level. These challenges are either solo, competitive or cooperative, but they are all activities we’ve enjoyed during our time together. Upon completing each challenge, you’ll receive a password to unlock the location for the next level. Keep the password slips, as you’ll need them all at the end. Let’s go on an adventure together!</p>
                    <p>Happy 1 month anniversary,</p>
                    <p><em>Nick ❤️</em></p>    
                </div>
                <div onclick={() => props.visible[1](false)}>
                    <Button>
                        {props.first ? 'Start!' : 'Resume'}
                    </Button>     
                </div>
            </div>
        </Modal>
    );
};