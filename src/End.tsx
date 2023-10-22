import { createEffect, createSignal } from "solid-js";
import background from "./assets/background.jpg";
import eleanor from './assets/eleanor.png';
import nick from './assets/nick.png';

export const End = () => {

    let blackDiv: HTMLDivElement;
    let backgroundDiv: HTMLDivElement;
    let eleanorImg: HTMLImageElement;
    let messageDiv: HTMLDivElement;
    
    const [seconds, setSeconds] = createSignal(0);

    const ID = setInterval(() => setSeconds(s => s + 1), 1000);

    setTimeout(() => blackDiv.style.opacity = '1', 5);

    createEffect(() => { 
        switch(seconds()) {
            case 3: 
            {
                blackDiv.style.opacity = '0';
                backgroundDiv.style.visibility = 'visible';
            }
            break;
            case 6:
                eleanorImg.style.bottom = '0';
            break;
            case 12:
                {
                    messageDiv.style.opacity = '1';
                    clearInterval(ID);
                }
            break;
        }
    });

    return (
        <>
        <div 
            ref={blackDiv} 
            class="z-10 w-screen h-screen absolute top-0 left-0 bg-black opacity-0 transition-opacity duration-[3s]"></div>
        <div
            ref={backgroundDiv}
            style={{
                "background-image":  `url(${background})`,
            }} 
            class="w-screen h-screen absolute top-0 left-0 invisible
            flex justify-center items-center [&>img]:h-[64px]">
                <img 
                    class="relative translate-y-1/2 -bottom-1/2 transition-all duration-[6s] ease-in-out" 
                    ref={eleanorImg} 
                    src={eleanor} alt="eleanor" />
                <img 
                    class="relative translate-y-1/2" 
                    src={nick} 
                    alt="nick" />
            </div>
            <div
                ref={messageDiv}
                class="z-10 w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-60 opacity-0 transition-opacity duration-[3s]
                text-white flex flex-col justify-center items-center gap-4">
                    <h1 class="text-3xl">
                        ❤️ You Win! ❤️
                    </h1>
                    <div class="text-xl text-center px-4">
                        Follow Nick to claim your prize!
                    </div>
            </div>
        </>
    );
};