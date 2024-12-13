
const back = document.getElementById("home_background"); // element to animate
let textCard = document.getElementsByClassName('cardMd')
let textCardCar = document.getElementsByClassName('card-carousel')

let selectionCard = (cardMD, CardCar) => {

    for (let index = 0; index < cardMD.length; index++) {

        cardMD.item(index).onmouseenter = () => {
            gameHover(cardMD.item(index).classList[2], true, true)
            cardMD.item(index).classList.add('d-none')
        }

        const cardImg = document.getElementById(cardMD.item(index).classList[2])

        cardImg.onmouseleave = () => {
            gameHover(cardMD.item(index).classList[2], false, true)
            cardMD.item(index).classList.remove('d-none')
        }
    }

    for (let index = 0; index < CardCar.length; index++) {

        CardCar.item(index).onmouseenter = () => {
            gameHover(cardMD.item(index).classList[2] + '-carousel', true, false)
            CardCar.item(index).classList.add('d-none')
        }

        const cardImgCarousel = document.getElementById(CardCar.item(index).classList[2] + '-carousel')
        cardImgCarousel.onmouseleave = () => {
            gameHover(CardCar.item(index).classList[2] + '-carousel', false, false)
            CardCar.item(index).classList.remove('d-none')
        }

    }
}

selectionCard(textCard, textCardCar)

function gameHover(name, x, y) {

    let animateCardTiming = { duration: 450, easing: "ease-in-out", fill: "both", }
    if (y) {
        if (x) {

            let animateCard = [{ maxWidth: '100%' }, { maxWidth: '110%' },]
            cardSwitch(name, animateCard, animateCardTiming)

        } else {

            let animateCard = [{ maxWidth: '110%' }, { maxWidth: '100%' },]
            cardSwitch(name, animateCard, animateCardTiming)

        }
    } else {
        if (x) {

            let animateCard = [{ maxWidth: '100%' }, { maxWidth: '110%' },]
            cardSwitch(name, animateCard, animateCardTiming)

        } else {

            let animateCard = [{ maxWidth: '110%' }, { maxWidth: '100%' },]
            cardSwitch(name, animateCard, animateCardTiming)

        }
    }
    if (name === 'jogos') {
        if (x) {
            let animateCard = [{ fontSize: '100%' }, { fontSize: '110%' },]
            cardSwitch(name, animateCard, animateCardTiming)

        } else {

            let animateCard = [{ fontSize: '110%' }, { fontSize: '100%' },]
            cardSwitch(name, animateCard, animateCardTiming)

        }
    }
}

let cardSwitch = (name, card, timing) => {

    let cardImg = document.getElementById(name)


    switch (name) {
        case 'kipon':
            cardImg.animate(card, timing);
            break;

        case 'robotrix':
            cardImg.animate(card, timing);
            break;

        case 'treasure':
            cardImg.animate(card, timing);
            break;

        case 'kipon-carousel':
            cardImg.animate(card, timing);
            break;

        case 'robotrix-carousel':
            cardImg.animate(card, timing);
            break;

        case 'treasure-carousel':
            cardImg.animate(card, timing);
            break;
        case 'jogos':
            cardImg.animate(card, timing);
            break;
    }
}

const timeline = new ScrollTimeline({
    source: document.documentElement,
    axis: "block",
});


back.animate(
    {
        backgroundPositionX: '100%',
    },
    {
        timeline,
    },
);
