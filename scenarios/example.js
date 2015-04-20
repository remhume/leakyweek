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
                [{    },{    },{    },{f:10},{f:10},{f:10},{f:10},{f:10},{f:10},{f:10},{f:10},{f:10},{f:10},{f:10},{f:10}],
                [{    },{    },{    },{f:10},{f: 8},{f: 8},{f: 8},{f: 8},{f: 8},{f: 8},{f: 8},{f: 8},{f: 8},{f: 8},{f:10}],
                [{    },{    },{    },{f:10},{f: 1},{f: 1},{f: 1},{f: 1},{f: 1},{f: 1},{f: 1},{f: 1},{f: 1},{f: 1},{f:10}],
                [{    },{    },{    },{f:10},{f: 1},{f: 1},{f: 1},{f: 1},{f: 1},{f: 1},{f: 1},{f: 1},{f: 1},{f: 1},{f:10}],
                [{f:10},{f:10},{f:10},{f:10},{f: 1},{f: 2},{f: 2},{f: 2},{f: 2},{f: 2},{f: 2},{f: 1},{f: 1},{f: 1},{f:10}],
                [{f:10},{f: 8},{f: 8},{f: 8},{f: 1},{f: 2},{f: 2},{f: 2},{f: 2},{f: 2},{f: 2},{f: 1},{f: 1},{f: 1},{f:10}],
                [{f:10},{f: 1},{f: 1},{f: 1},{f: 1},{f: 2},{f: 2},{f: 2},{f: 2},{f: 2},{f: 2},{f: 1},{f: 1},{f: 1},{f:10}],
                [{f:10},{f: 1},{f: 1},{f: 1},{f: 1},{f: 1},{f: 1},{f: 1},{f: 1},{f: 1},{f: 1},{f: 1},{f: 1},{f: 1},{f:10}],
                [{f:10},{f: 1},{f: 1},{f: 1},{f: 1},{f: 1},{f: 1},{f: 1},{f: 1},{f: 1},{f: 1},{f: 1},{f: 1},{f: 1},{f:10}],
                [{f:10},{f:10},{f:10},{f:10},{f:10},{f:10},{f:10},{f:10},{f:10},{f:10},{f:10},{f:10},{f:10},{f:10},{f:10}]
            ],
            objects: [],
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
    "enter": function(){
        this.maps.monday.floor[3][5].collisionEvent = function(){
            LEAKYWEEK.conversation.scene = LEAKYWEEK.SCENARIOS[LEAKYWEEK.title.selection].conversations.monday;
            LEAKYWEEK.conversation.scene.screenshot = this.app.layer.cache();
            this.app.setState(LEAKYWEEK.conversation);
        }
        this.conversations.monday.callback = function() {
            this.app.setState(LEAKYWEEK.SCENARIOS[LEAKYWEEK.title.selection]);
        }
        PLAYGROUND.Transitions.enabled = false;
        LEAKYWEEK.map.map = this.maps.monday;
        this.app.setState(LEAKYWEEK.map);
    }
});
