var Bunker = {
    name: 'Bunker',
    health: 28,
    powerName: 'Initialize',
    power: function (state) {
        state.currentPlayer.drawCard();
    },
    death: [
        function (state) {
            state.promptHeroes(function (hero) {
                state.promptPlayCard(hero);
            });
        },
        function (state) {
            state.promptHeroes(function (hero) {
                state.preventNextDamage(hero, 2);
            });
        },
        function (state) {
            state.promptHeroes(function (hero) {
                state.promptUntrash(hero);
            });
        }
    ]
};

Bunker.cards = [
    {
        name: 'Decommissioned Hardware',
        type: 'oneshot',
        played: function (state) {
            state.promptTrashedEquipment(function (card) {
                state.play(card);
            });
        }
    },
    {
        name: 'Ammo Drop',
        type: 'ongoing',
        limited: true,
        played: function (state) {
            state.onVillainCardDestroyed(function () {
                state.drawCard();
            });
        },
    {
        name: 'Flak Cannon',
        type: 'equipment',
        limited: true,
        power: function (state) {
            state.promptTargetDamage(3, 'projectile');
        }
    },
    {
        name: 'Omni-Cannon',
        type: 'equipment',
        limited, true,
        turnStart: function (state, thisCard) {
            state.promptSelectCardsOptional(3, function (cards) {
                state.placeUnder(thisCard, cards);
            });
        }
        power: function (state, thisCard) {
            state.promptTargetDamage(thisCard.cardsUnder.length * 2, 'energy');
            state.trash(thisCard.cardsUnder);
            thisCard.cardsUnder = [];
        },
        powerActive: function (state, thisCard) {
            return thisCard.cardsUnder.length;
        }
    }
];

HeroDecks.push(Bunker);
