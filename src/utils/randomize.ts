const shuffleArray = (array: any[]) => {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

const randomize = (items: any[]) => {
    if (!items || items.length === 0) {
        return null; // Handle empty array
    }

    if (!(items as any).__shuffled) {
        items = shuffleArray([...items]); // Clone and shuffle the array
        (items as any).__shuffled = true; // Mark the array as shuffled
    }

    return items.pop();
};

export default randomize;
