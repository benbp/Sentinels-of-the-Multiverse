var Bunker = {
    name: 'Bunker',
    health: 28,
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
        
    }
];

Decks.push(Bunker);
