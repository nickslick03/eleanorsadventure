import { Show, createSignal } from "solid-js";
import { Title } from "./Title";
import background from "./assets/background.jpg";
import { Instructions } from "./Instructions";
import { Game } from "./Game";

function App() {

  const showInstructions = createSignal(false);
  const [isGameStart, setIsGameStart] = createSignal(false);

  const startGame = () => {
    showInstructions[1](true);
    setIsGameStart(true);
  };

  return (
    
    <Show 
      when={isGameStart()} 
      fallback={
        <div 
          style={{
            "height": "100dvh",
            "background-image":  `url(${background})`,
          }}>
          <div class="w-full h-full bg-white bg-opacity-50 px-4 py-8 overflow-x-hidden">
          <Title startGame={startGame} />
          </div>
        </div>}>
      <Game />
      <Show when={showInstructions[0]()}>
        <Instructions 
          visible={showInstructions}
          first={true} />
      </Show>
    </Show>
  )
}

export default App;
