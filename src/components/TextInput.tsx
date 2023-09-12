import { useEffect, useState } from "react";

import gokudont from "../assets/images/goku-dont-say-nword.jpg";
import cattu from "../assets/images/cat-tu.gif";

import r from "../utils/randomize";
import useLocalStorage from "use-local-storage";
import { Howl } from "howler";

interface props {
    isRacist: boolean;
    setIsRacist: React.Dispatch<React.SetStateAction<boolean>>;
    frames: string[];
    setHasWon: React.Dispatch<React.SetStateAction<boolean>>;
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;

    imageAudioCombos: {
        img: string;
        audio: any;
    }[];
}
const TextInput = ({
    frames,
    isRacist,
    setIsRacist,
    setHasWon,
    text,
    setText,
    imageAudioCombos,
}: props) => {
    const [socialCredits, setSocialCredits] = useLocalStorage(
        "social-credits",
        0
    );
    const [racistCount, setRacistCount] = useLocalStorage("racist-count", 0);

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
