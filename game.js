PlayGame = function (heroes, villian, environment) {
    var state = {
        heroes: heroes.map(function (hero) {
                    return {
                        class: hero
                        health: hero.health,
                        deck: [],
                        hand: [],
                        played: [],
                        trash: [],
                        phases: [
                            [
                                function (state, hero) {
                                    state.promptPlayCard(hero);
                                }
                            ],
                            [
                                function (state, hero) {
                                    state.promptUsePower(hero);
                                }
                            ],
                            [
                                function (state, hero) {
                                    state.drawCard(hero);
                                }
                            ]
                        ]
                    };
                }),
        villian: {
                     class: villian,
                     health: villian.health,
                     flipped: false,
                     deck: [],
                     played: [],
                     trash: []
                 }
        environment: {
                        class: environment,
                        deck: [],
                        played: [],
                        trash: []
                     },
        drawCard: function (hero) {
                     if (!hero) {
                         hero = state.currentPlayer;
                     }
                     if (!hero.deck.length) {
                        hero.deck = state.shuffle(hero.trash);
                        hero.trash = [];
                     }
                     hero.hand.push(hero.deck.pop());
                  },
        drawVillianCard: function () {
                            if (!state.villian.deck.length) {
                                state.villian.deck = state.shuffle(state.villian.trash);
                                state.villian.trash = [];
                            }
                            state.playVillianCard(state.villian.deck.pop());
                         },
        playVillianCard: function (cardClass) {
                            var card = {
                                class: cardClass
                            };
                            if (card.type !== 'oneshot') {
                                if (card.class.health) {
                                    card.health = card.class.health;
                                }
                                state.villian.played.push(card);
                            }
                            if (card.class.played) {
                                card.class.played(state);
                            }
                         }

    };
    state.heroes.forEach(function (hero) {
        state.drawCards(hero, 4);
    });
    var exec = function (func) {
        func(state);
    });
    for ( ;; ) {
        exec(state.startTurn);
        state.villian.startTurnActions.forEach(exec);
        state.drawVillianCard();
        state.villian.endTurnActions.forEach(exec);

        state.heroes.forEach(function (hero) {
            exec(state.startTurn);
            hero.phases.forEach(function (phase) {
                phase.forEach(exec);
            });
        });

        exec(state.startTurn);
        state.environment.startTurnActions.forEach(exec);
        state.drawEnvironmentCard();
        state.environment.endTurnActions.forEach(exec);
    }
};
