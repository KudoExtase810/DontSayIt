import { useState } from "react";
import Header from "./components/Header";
import TextInput from "./components/TextInput";
import WinningScreen from "./components/WinningScreen";
import { Howler } from "howler";
// @ts-ignore
import Preload from "react-preload";

// winning images
import onesc from "./assets/images/1-social-credit.jpg";
import ftsc from "./assets/images/15-social-credit.jpg";
import nnsc from "./assets/images/999999-social-credit.jpg";
import smurfcat from "./assets/images/smurfcat.jpg";
import lightskin from "./assets/images/lightskin.jpg";
import malphitels from "./assets/images/malhpitels.jpg";
import lightskinar from "./assets/images/lightskin-ar.jpg";

// trollface frames
import frame1 from "./assets/images/trollface-frames/frame1.jpg";
import frame2 from "./assets/images/trollface-frames/frame2.jpg";
import frame3 from "./assets/images/trollface-frames/frame3.jpg";
import frame4 from "./assets/images/trollface-frames/frame4.jpg";
import frame5 from "./assets/images/trollface-frames/frame5.jpg";

// on racism images & gifs
import minus30sc from "./assets/images/-30-social-credit.jpg";
import minus69420sc from "./assets/images/-69420-social-credit.jpg";
import fnafnword from "./assets/images/fnaf-did-u-say-nword.webp";
import goku from "./assets/images/goku.jpeg";
import sonic from "./assets/images/sonic.jpg";
import therock from "./assets/gifs/the-rock.gif";
import trollface from "./assets/gifs/trollface.gif";

// on racism audio
import boom from "./assets/audio/boom-super-bass.mp3";
import prowler from "./assets/audio/goku-prowler.mp3";
import fnaf from "./assets/audio/fnaf-hallway.mp3";
import amongus from "./assets/audio/amongus-sus.mp3";
import trollface_creepy from "./assets/audio/trollface-smile.mp3";
import sc_siren from "./assets/audio/social-credits-siren.mp3";
import spiderman from "./assets/audio/spiderman-migue-ohara.mp3";
import chineseman from "./assets/audio/chinese-man.mp3";

import r from "./utils/randomize";

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
