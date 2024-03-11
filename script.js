const card = document.querySelector(".card");

const calculateCenter = (e, border) => {
    const mouseX = e.clientX - border.x;
    const mouseY = e.clientY - border.y;

    return {
        x: mouseX - border.width / 2,
        y: mouseY - border.height / 2,
    };
};

const calculateDistance = (center) => {
    return Math.sqrt(center.x ** 2 + center.y ** 2);
};

const setTransform = (card, center, distance) => {
    card.style.transform = `scale3d(1, 1, 1) rotate3d(${center.y / 100}, ${
        -center.x / 100
    }, 0, ${Math.log(distance) * 2}deg)`;
};

const setReflectBackground = (reflect, center, border) => {
    reflect.style.backgroundImage = `radial-gradient(circle at ${
        center.x * 2 + border.width / 2
    }px ${center.y * 2 + border.height / 2}px, #ffffff4b, #74747413)`;
};

const perspectiveHover = (e) => {
    const border = card.getBoundingClientRect();
    const center = calculateCenter(e, border);
    const distance = calculateDistance(center);
    setTransform(card, center, distance);
    setReflectBackground(card.querySelector(".reflect"), center, border);
};

card.addEventListener("mouseenter", () => {
    document.addEventListener("mousemove", perspectiveHover);
});

card.addEventListener("mouseleave", () => {
    document.removeEventListener("mousemove", perspectiveHover);
    card.style.transform = "";
    card.style.background = "";
});
