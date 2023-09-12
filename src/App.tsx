import { useState } from "react";
import Header from "./components/Header";
import TextInput from "./components/TextInput";
import WinningScreen from "./components/WinningScreen";
import { Howler } from "howler";

function App() {
    const [isRacist, setIsRacist] = useState(false);
    const [hasWon, setHasWon] = useState(false);
    const [text, setText] = useState("");

    const handleRestart = () => {
        // stop all audios
        Howler.stop();
        // trigger restart
        setIsRacist(false);
        setHasWon(false);
        setText("");
    };

    return (
        <div>
            {(isRacist || hasWon) && (
                <button
                    className="btn btn-primary fixed top-8 right-8 animate-pulse hover:animate-none"
                    onClick={handleRestart}
                >
                    Restart
                </button>
            )}
            <Header />
            {hasWon ? (
                <WinningScreen />
            ) : (
                <TextInput
                    text={text}
                    setText={setText}
                    isRacist={isRacist}
                    setIsRacist={setIsRacist}
                    setHasWon={setHasWon}
                />
            )}
        </div>
    );
}

export default App;
