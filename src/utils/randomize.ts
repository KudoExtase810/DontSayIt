const randomize = (items: any[]) => {
    const randomIdx = Math.floor(Math.random() * items.length);
    return items[randomIdx];
};

export default randomize;
