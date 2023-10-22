import { Button } from "./Button";
import logo from "./assets/logo.png";

export const Title = (props: {
    startGame: () => any;
}) => {

    return (
        <div class="w-full h-full flex flex-col items-center">
            <div class="grow flex items-center">
                <img src={logo} class="animate-grow text-xl" />
            </div>
            <div onclick={() => props.startGame()}>
                <Button>
                    Play
                </Button>    
            </div>    
        </div>
    );
};