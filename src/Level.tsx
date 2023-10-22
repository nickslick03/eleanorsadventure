import { Accessor, Setter, Show } from "solid-js";
import { Modal } from "./Modal";
import { Button } from "./Button";
import level1img from "./assets/level1.jpg";
import level2img from "./assets/level2.jpg";
import level3img from "./assets/level3.jpg";
import level4img from "./assets/level4.jpg";
import level5img from "./assets/level5.jpg";
import level6img from "./assets/level6.jpg";
import level7img from "./assets/level7.jpg";

const levelData = [
    {
        location: 'Union Booth',
        password: 'time',
        img: level1img,
    },
    {
        location: 'Solly 214',
        password: 'tap',
        img: level2img,
    },
    {
        location: 'Frey 166',
        password: 'center',
        img: level3img,
    },
    {
        location: 'The Falcon',
        password: 'foundation',
        img: level4img,
    },
    {
        location: 'Climenhaga Orange Creamsicle Sunset Practice Room',
        password: 'words',
        img: level5img,
    },
    {
        location: 'Breeches Bench',
        password: 'eyes',
        img: level6img,
    },
    {
        location: 'Back 40',
        password: 'play',
        img: level7img,
    },
];

export const Level = (props: {
    selectedLevel: Accessor<number>
    currLevel: Accessor<number>,
    visible: [Accessor<boolean>, Setter<boolean>],
    nextLevel: () => void,
    }) => {

    let input: HTMLInputElement | undefined;
    
    const checkPassword = () => {
        if (input?.value.toLowerCase() === levelData[props.selectedLevel()].password) {
            alert('You got it!');
            props.nextLevel();
            props.visible[1](false);
        } else {
            alert('Try again!');
        }
    };

    return (
        <Modal visible={props.visible}>
            <div class="h-full flex flex-col items-center justify-between">
                <h1 class="text-4xl">
                    Level {props.selectedLevel() + 1}
                </h1>
                <p class="text-xl text-center">
                    Location: 
                    <br />
                    {levelData[props.selectedLevel()]?.location}
                </p>
                <img src={levelData[props.selectedLevel()]?.img} />
                <Show 
                    when={props.selectedLevel() === props.currLevel()}
                    fallback={
                        <div class="text-green-500 text-2xl">
                            {levelData[props.selectedLevel()].password} ✅
                        </div>}>
                    <div class="flex gap-4">
                        <span>Password:</span>
                        <input type="text" ref={input} class="w-52 inline border-black border-2"/>    
                    </div>
                </Show>
                <div 
                    class="mb-4"
                    classList={{
                        invisible: props.selectedLevel() !== props.currLevel()
                    }}
                    onclick={() => checkPassword()}>
                    <Button>
                        Enter
                    </Button>
                </div>
            </div>
        </Modal>
    );
};