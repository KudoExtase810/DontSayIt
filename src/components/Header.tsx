import useLocalStorage from "use-local-storage";

const Header = () => {
    const [socialCredits] = useLocalStorage("social-credits", 0);
    const [racistCount] = useLocalStorage("racist-count", 0);

    return (
        <header className="bg-accent mb-8">
            <div className="p-4 py-6 flex justify-around items-center text-lg font-medium text-accent-content">
                <span>Social credit: {socialCredits}</span>
                <span>Times you've been racist: {racistCount}</span>
            </div>
        </header>
    );
};

export default Header;
