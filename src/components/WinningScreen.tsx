import onesc from "../assets/images/1-social-credit.jpg";
import ftsc from "../assets/images/15-social-credit.jpg";
import nnsc from "../assets/images/999999-social-credit.jpg";
import smurfcat from "../assets/images/smurfcat.jpg";
import lightskin from "../assets/images/lightskin.jpg";
import malphitels from "../assets/images/malhpitels.jpg";
import randomize from "../utils/randomize";

import yay from "../assets/audio/kids-yay.mp3";
import { useEffect } from "react";
import useLocalStorage from "use-local-storage";

const WinningScreen = () => {
    const images = [onesc, ftsc, nnsc, smurfcat, lightskin, malphitels];

    const [socialCredits, setSocialCredits] = useLocalStorage(
        "social-credits",
        0
    );
    const randomImg = randomize(images) as string;
    useEffect(() => {
        new Howl({ src: yay }).play();
        const creditsWon = Math.round(Math.random() * 1500);
        setSocialCredits(socialCredits + creditsWon);
    }, []);

    return (
        <section className="flex flex-col gap-4 items-center">
            <img
                src={randomImg}
                alt="You are not racist"
                className="max-h-[95%] max-w-[95%]"
            />
        </section>
    );
};

export default WinningScreen;
