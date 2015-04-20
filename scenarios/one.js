LEAKYWEEK.addScenario({
    "title": "Paula Layer",
    "id": 0,
    "description": "31, Working at a bank",
    "difficulty": "medium",
    "thumbnail": "player",
    "maps": {
        "monday": {
            tileSize: 32,
            floor: [
                [{f: 1},{f: 1},{f: 1},{f:12},{f:12},{f:12},{f:12},{f:12},{f:12},{f:12},{f:12},{f:12},{f:12},{f:12},{f:12}],
                [{f: 1},{f: 1},{f: 1},{f:12},{f:10},{f:10},{f:10},{f:10},{f:10},{f:10},{f:10},{f:10},{f:10},{f:10},{f:12}],
                [{f: 1},{f: 1},{f: 1},{f:12},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f:12}],
                [{f: 1},{f: 1},{f: 1},{f:12},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f:12}],
                [{f:12},{f:12},{f:12},{f:12},{f: 3},{f: 4},{f: 4},{f: 4},{f: 4},{f: 4},{f: 4},{f: 3},{f: 3},{f: 3},{f:12}],
                [{f:12},{f:10},{f:10},{f:10},{f: 3},{f: 4},{f: 4},{f: 4},{f: 4},{f: 4},{f: 4},{f: 3},{f: 3},{f: 3},{f:12}],
                [{f:12},{f: 3},{f: 3},{f: 3},{f: 3},{f: 4},{f: 4},{f: 4},{f: 4},{f: 4},{f: 4},{f: 3},{f: 3},{f: 3},{f:12}],
                [{f:12},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f:12}],
                [{f:12},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f:12}],
                [{f:12},{f:12},{f:12},{f:12},{f:12},{f:12},{f:12},{f:12},{f:12},{f:12},{f:12},{f:12},{f:12},{f:12},{f:12}]
            ],
            entities: [
                {
                    startX: 10,
                    startY: 4,
                    maxSpeed: 200,
                    f: 0,
                    atlas: 'player'
                }
            ],
            me: 0,
            parent: this
        }
    },
    "conversations": {
        "monday": {
            text: [
                'LUDUMDARELUDUMDARE LUDUMDARE LUDUMDARELUDUMDARELUDUMDARE LUDUMDARELUDUMDARE LUDUMDARE',
                'hi, test'
            ],
            image: 'shadyguy'
        }
    },
    "dayintros": {
        "monday": {
            title: '-monday-',
            text: "It's early morning. As you're walking to your workplace a stranger appears in a dark side alley and starts talking to you with a deep voice."
        }
    },
    "init": function(){
        this.maps.monday.floor[3][5].collisionEvent = function(){
            LEAKYWEEK.conversation.scene = LEAKYWEEK.SCENARIOS[LEAKYWEEK.title.selection].conversations.monday;
            LEAKYWEEK.conversation.scene.screenshot = this.app.layer.cache();
            this.app.setState(LEAKYWEEK.conversation);
        }
    }
});
