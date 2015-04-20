LEAKYWEEK.addScenario({
    "title": "Paula Layer",
    "id": 0,
    "description": "31, Working at a bank",
    "difficulty": "medium",
    "thumbnail": "player",
    "maps": {
        "tuesday": {
            tileSize: 32,
            floor: [
                [{f: 1},{f: 1},{f: 1},{f:12},{f:12},{f:12},{f:12},{f:12},{f:12},{f:12},{f:12},{f:12},{f:12},{f:12},{f:12}],
                [{f: 1},{f: 1},{f: 1},{f:12},{f:10},{f:10},{f:10},{f:10},{f:10},{f:10},{f:10},{f:10},{f:10},{f:10},{f:12}],
                [{f: 1},{f: 1},{f: 1},{f:12},{f: 3, collisionEvent: 0},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f: 3},{f:12}],
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
            collisionEvents: [
                function(map){
                    var scene = this.setup({text:['Test']}, "conversation", true);
                    scene.callback = function(){
                        var scene2 = this.setup(this.scenario.maps[this.day], "map");
                        scene2.init();
                    };
                    scene.init();
                }
            ],
            me: 0,
            parent: this
        }
    },
    "conversations": {
        "monday": {
            text: [
                "Good evening, Miss Layer.",
                "I know that you aren't happy at your current job.",
                "You realized that your job may provide some money to you but is not at all working towards a better world. Because you work at a bank.",
                "You help capitalism growing bigger and meaner than ever, you play with money that isn't yours and you destroy lifes.",
                "I want to change those things and give evidence, that your bank's hands are covered in blood. If you're with me, help me.",
                "I can't reveal my identity right now but i know you. This is your chance to do something good in your life.",
                "For tomorrow i want you to get your coworkers files about your infrastructure, copy them, and bring them tomorrow evening.",
                "Same place, same time. Don't disappoint me."
            ],
            name: 'Stranger',
            image: 'shadyguy'
        },
        "tuesday": {
            text: [
                "Very good, Miss Layer! I knew i could count on you!",
                "For tomorrow i have a task thats probably a lot simpler to you: I want you to find out in which room the IT-Department is",
                "And tomorrow you'll meet me here again."
            ],
            name: 'Stranger',
            image: 'shadyguy'
        },
        "wednesday": {
            text: [
                "Great work! Now that we know that, you should go down to the basement after they're away",
                "Look out for things like written down passwords or similar data"
            ],
            name: 'Stranger',
            image: 'shadyguy'
        },
        "thursday": {
            text: [
                "Wonderful! With the password we can get database access!",
                "Here, take this USB-Stick and run the commands i wrote on this paper."
            ],
            name: 'Stranger',
            image: 'shadyguy'
        },
        "friday": {
            text: [
                "I can't thank you enough.",
                "You did something amazing, that'll change everyones lifes.",
                "I'd suggest watching the news the next days"
            ],
            name: 'Stranger',
            image: 'shadyguy'
        },
        "sunday": {
            text: [
                "Dear P.Layer,",
                ""
            ],
            name: 'Letter',
            image: 'shadyletter'
        }
    },
    "dayintros": {
        "monday": {
            title: '-monday-',
            text: "It's late evening and you are done for today. As you're walking home a stranger appears in a dark alley and starts talking to you with a deep voice."
        },
        "tuesday": {
            title: "-tuesday-",
            text: "Early morning. The sun is shining and you make your way to your working place. The pure idea of you changing something in your boring life, you are living for years now, makes your stomach tingle."
        },
        "wednesday": {
            title: "-wednesday-",
            text: "This really seems like an easy task, you think while eating breakfast. But you sure wonder if the mysterious guy will actually use the data you give him for good."
        },
        "thursday": {
            title: "-thursday-",
            text: "dontquestionthestrangerwholetsyoudocriminalstuff. dontquestionthestrangerwholetsyoudocriminalstuff. dontquestionthestrangerwholetsyoudocriminalstuff. dontquestionthestrangerwholetsyoudocriminalstuff."
        },
        "friday": {
            title: "-friday-",
            text: "You ignore all the fears you haveof losing your job or helping a criminal. There is no going back now. Let's do this!"
        },
        "saturday": {
            title: "-saturday-",
            text: "You really enjoy your free day"
        },
        "sunday": {
            title: "-sunday-",
            text: "Oh look! You got mail! On a sunday. Since when does the postman deliver mail on sunday? You shrug and open up the letter…"
        }
    }
});
