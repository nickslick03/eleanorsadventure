import { For, Show, batch, createSignal } from "solid-js";
import levelBorder from "./assets/level_border.png";
import levelRouteHorizontal from "./assets/level_route_horizontal.png";
import levelRouteVertical from "./assets/level_route_vertical.png";
import { Instructions } from "./Instructions";
import background from "./assets/background.jpg";
import eleanor from "./assets/eleanor.png";
import { Level } from "./Level";
import level1img from "./assets/level1.jpg";
import level2img from "./assets/level2.jpg";
import level3img from "./assets/level3.jpg";
import level4img from "./assets/level4.jpg";
import level5img from "./assets/level5.jpg";
import level6img from "./assets/level6.jpg";
import level7img from "./assets/level7.jpg";
import { End } from "./End";

const LEVEL_IMGS = [
    level1img,
    level2img,
    level3img,
    level4img,
    level5img,
    level6img,
    level7img
];

const MAP_IMGS = ['', levelBorder, levelRouteHorizontal, levelRouteVertical];

const GameCell = (props: {
    type: number | string
}) => {

    let propIndex: number;
    if (typeof props.type === 'number')
        propIndex = 1;
    else if (props.type === 'h')
        propIndex = 2;
    else if (props.type === 'v')
        propIndex = 3;
    else
        propIndex = 0;

    return (
        <div 
            style={{
                "background-image": `url(${MAP_IMGS[propIndex]})`
            }}
            class="w-full h-full bg-center bg-contain aspect-square"
            classList={{
                "bg-no-repeat": propIndex === 1,
                "bg-repeat-x":  propIndex === 2,
                "bg-repeat-y":  propIndex === 3
            }}>
            
        </div>
    );
};

export const Game = () => {

    // 'e'=empty, number=level, 'h'=levelRouteHorizontal, 'v'=levelRouteVertical
    const cellType = [
        'e','e','e', 6 ,
        'e','e','e','v',
         4 ,'h','h', 5 ,
        'v','e','e','e',
         3 ,'h', 2 ,'e',
        'e','e','v','e',
         0 ,'h', 1 ,'e'];

    const levelPercentages = [
        [0, 0],
        [50, 0],
        [50, 29],
        [0, 29],
        [0, 57],
        [75, 57],
        [75, 86]
    ];

    const showInstructions = createSignal(false);
    const showLevel = createSignal(false);

    const [currLevel, setCurrLevel] = createSignal(0);
    const [selectedLevel, setSelectedLevel] = createSignal(0);

    const [percentages, setPercentages] = createSignal(levelPercentages[0]);

    const [isEnd, setIsEnd] = createSignal(false);

    const showCurrLevel = () => {
        setSelectedLevel(currLevel());
        showLevel[1](true);
    };

    const nextLevel = () => {
        const nextLevelNum = currLevel() + 1;
        if (nextLevelNum > 6) {
            setIsEnd(true);
            return;
        };
        batch(() => {
            setCurrLevel(nextLevelNum);
            setSelectedLevel(nextLevelNum);
            setPercentages(levelPercentages[nextLevelNum]);
        });
    };

    return (
        <div
            style={{
                "height": "100dvh",
                "background-image":  `url(${background})`,
            }} 
            class="flex flex-col pt-8">
            <div class="grow px-4 overflow-y-scroll pb-4">
                <div class="relative grid grid-cols-4">
                    <For each={cellType}>
                    {(type) => 
                        <div 
                            style={{
                                'background-image': 
                                    typeof type === 'number'
                                    && currLevel() >= type
                                    ? `url(${LEVEL_IMGS[type]})`
                                    : ''}}
                            class="bg-cover"
                            onClick={() => {
                                if (typeof type === 'number' && currLevel() >= type) {
                                    setSelectedLevel(type);
                                    showLevel[1](true);
                                }
                            }}>
                            <GameCell type={type}/>
                        </div>}
                    </For>

                    <div
                        onClick={() => showCurrLevel()}>
                        <img 
                            style={{
                                "left": `${percentages()[0]}%`,
                                "bottom": `${percentages()[1]}%`
                            }}
                            class="absolute w-1/4"
                            src={eleanor} 
                            alt="Eleanor G. Mund" />
                    </div>

                </div>   
            </div>
            <nav class="flex justify-around items-end bg-white pb-4 pt-2">
                    <button onClick={() => showInstructions[1](true)}>
                        <div class="text-2xl">📜</div>
                        <div class="text-sm">Instructions</div>
                    </button>
                    <button onclick={() => showCurrLevel()}>
                        <div class="text-2xl">🎯</div>
                        <div class="text-sm">Current Level</div>
                    </button>
            </nav>
            <Show when={showInstructions[0]()}>
                <Instructions 
                    visible={showInstructions} 
                    first={false}/>
            </Show>
            <Show when={showLevel[0]()}>
                    <Level 
                        selectedLevel={selectedLevel}
                        currLevel={currLevel}
                        visible={showLevel}
                        nextLevel={nextLevel}/> 
            </Show>
            <Show when={isEnd()}>
                <End />
            </Show>
        </div>
        
    );
};