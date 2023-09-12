import { useEffect, useState } from "react";
import cattu from "../assets/images/cat-tu.gif";
// trollface frames
import frame1 from "../assets/images/trollface-frames/frame1.jpg";
import frame2 from "../assets/images/trollface-frames/frame2.jpg";
import frame3 from "../assets/images/trollface-frames/frame3.jpg";
import frame4 from "../assets/images/trollface-frames/frame4.jpg";
import frame5 from "../assets/images/trollface-frames/frame5.jpg";
import gokudont from "../assets/images/goku-dont-say-nword.jpg";

// on racism images & gifs
import minus30sc from "../assets/images/-30-social-credit.jpg";
import minus69420sc from "../assets/images/-69420-social-credit.jpg";
import fnafnword from "../assets/images/fnaf-did-u-say-nword.webp";
import goku from "../assets/images/goku.jpeg";
import sonic from "../assets/images/sonic.jpg";
import therock from "../assets/gifs/the-rock.gif";
import trollface from "../assets/gifs/trollface.gif";

// on racism audio
import boom from "../assets/audio/boom-super-bass.mp3";
import prowler from "../assets/audio/goku-prowler.mp3";
import fnaf from "../assets/audio/fnaf-hallway.mp3";
import amongus from "../assets/audio/amongus-sus.mp3";
import trollface_creepy from "../assets/audio/trollface-smile.mp3";
import sc_siren from "../assets/audio/social-credits-siren.mp3";
import spiderman from "../assets/audio/spiderman-migue-ohara.mp3";
import chineseman from "../assets/audio/chinese-man.mp3";

import r from "../utils/randomize";
import useLocalStorage from "use-local-storage";
import { Howl } from "howler";

interface props {
    isRacist: boolean;
    setIsRacist: React.Dispatch<React.SetStateAction<boolean>>;

    setHasWon: React.Dispatch<React.SetStateAction<boolean>>;
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
}
const TextInput = ({
    isRacist,
    setIsRacist,
    setHasWon,
    text,
    setText,
}: props) => {
    const [socialCredits, setSocialCredits] = useLocalStorage(
        "social-credits",
        0
    );
    const [racistCount, setRacistCount] = useLocalStorage("racist-count", 0);
    //  Trollface frames
    const frames = [frame1, frame2, frame3, frame4, frame5];

    const imageAudioCombos = [
        { img: therock, audio: boom },
        { img: goku, audio: prowler },
        { img: fnafnword, audio: fnaf },
        { img: trollface, audio: r([amongus, trollface_creepy]) },
        { img: minus30sc, audio: r([sc_siren, chineseman]) },
        { img: minus69420sc, audio: r([sc_siren, chineseman]) },
        { img: sonic, audio: r([spiderman, prowler]) },
    ];

    const [image, setImage] = useState(gokudont);

    useEffect(() => {
        if (text.length === 6 && !text.toLowerCase().includes("nigger"))
            return setHasWon(true);

        if (!text) {
            setImage(gokudont);
        } else if (text.includes("nigga") || text.includes("nigger")) {
            setImage(frames[4]);
            handleRacism();
        } else if (text.includes("nigg")) {
            setImage(frames[3]);
        } else if (text.includes("nig")) {
            setImage(frames[2]);
        } else if (text.includes("ni")) {
            setImage(frames[1]);
        } else if (text.includes("n")) {
            setImage(frames[0]);
        } else {
            setImage(cattu);
        }
    }, [text]);

    // Play when the user types the full nice word
    const handleRacism = () => {
        setIsRacist(true);

        const randomCombo = r(imageAudioCombos) as {
            img: string;
            audio: string;
        };

        // update scores
        setRacistCount(racistCount + 1);
        const creditsLost = Math.round(Math.random() * 1500);
        setSocialCredits(socialCredits - creditsLost);

        setImage(randomCombo.img);
        new Howl({ src: randomCombo.audio }).play();
    };

    return (
        <section className="flex flex-col gap-4 items-center">
            {isRacist ? (
                <img
                    src={image}
                    alt="You are racist"
                    className="max-h-[95%] max-w-[95%]"
                />
            ) : (
                <>
                    <h2 className="text-2xl font-semibold">
                        Type something (hopefully not racist 😊👍)
                    </h2>
                    <p className="text-lg">
                        You need to type{" "}
                        <span className="text-primary">{6 - text.length}</span>{" "}
                        more characters without being racist in order to{" "}
                        <span className="text-accent">win</span>
                    </p>
                    <input
                        type="text"
                        placeholder="Space movie 1992"
                        className="input input-bordered input-primary w-full max-w-lg"
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                    />
                    <img
                        src={image}
                        alt="Not yet racist"
                        className="rounded-sm max-h-[450px]"
                    />
                </>
            )}
        </section>
    );
};

export default TextInput;
