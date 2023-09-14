import { useState } from "react";
import Header from "./components/Header";
import TextInput from "./components/TextInput";
import WinningScreen from "./components/WinningScreen";
import { Howler } from "howler";
// @ts-ignore
import Preload from "react-preload";
import r from "./utils/randomize";

import * as mostAssets from "./mostAssets";

// You can access them like this:
const {
    onesc,
    ftsc,
    nnsc,
    smurfcat,
    lightskin,
    malphitels,
    lightskinar,
    frame1,
    frame2,
    frame3,
    frame4,
    frame5,
    minus30sc,
    minus69420sc,
    fnafnword,
    goku,
    sonic,
    therock,
    trollface,
    boom,
    prowler,
    fnaf,
    amongus,
    trollface_creepy,
    sc_siren,
    spiderman,
    chineseman,
} = mostAssets;

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

    const imageAudioCombos = [
        { img: therock, audio: boom },
        { img: goku, audio: prowler },
        { img: fnafnword, audio: fnaf },
        { img: trollface, audio: r([amongus, trollface_creepy]) },
        { img: minus30sc, audio: r([sc_siren, chineseman]) },
        { img: minus69420sc, audio: r([sc_siren, chineseman]) },
        { img: sonic, audio: r([spiderman, prowler]) },
    ];

    const Loader = (
        <div className="h-screen w-screen flex items-center justify-center overflow-hidden">
            <div className="loading text-primary loading-infinity w-64"></div>
        </div>
    );

    // The images we wanna initally load so that the user only has to wait for them
    // the first time they enter the website
    const allImagesToLoad = [
        frame1,
        frame2,
        frame3,
        frame4,
        frame5,
        minus30sc,
        minus69420sc,
        fnafnword,
        goku,
        sonic,
        therock,
        trollface,
        onesc,
        ftsc,
        nnsc,
        lightskin,
        lightskinar,
        smurfcat,
        malphitels,
    ];

    return (
        <Preload
            loadingIndicator={Loader}
            images={allImagesToLoad}
            autoResolveDelay={8000}
        >
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
                    <WinningScreen
                        images={[
                            onesc,
                            ftsc,
                            nnsc,
                            smurfcat,
                            lightskin,
                            malphitels,
                            lightskinar,
                        ]}
                    />
                ) : (
                    <TextInput
                        imageAudioCombos={imageAudioCombos}
                        frames={[frame1, frame2, frame3, frame4, frame5]}
                        text={text}
                        setText={setText}
                        isRacist={isRacist}
                        setIsRacist={setIsRacist}
                        setHasWon={setHasWon}
                    />
                )}
            </div>
        </Preload>
    );
}

export default App;
