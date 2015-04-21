LEAKYWEEK.day = {
    create: function(){
        this.day = 'monday';
    },
    enter: function(){
        this.scenario = LEAKYWEEK.SCENARIOS[LEAKYWEEK.title.selection];
        this.days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        if(this.scenario.id === 0){
            var scene1 = this.setup(this.scenario.dayintros[this.day], "dayintro");
            scene1.callback = function(){
                if(this.day === 'monday'){
                    var scene2 = this.setup(this.scenario.conversations[this.day], "conversation");
                    scene2.callback = function(){
                        this.day = this.days[this.days.indexOf(this.day)+1];
                        this.app.setState(LEAKYWEEK.day);
                    }
                    scene2.init();
                } else if(this.day === 'saturday'){
                    this.day = this.days[this.days.indexOf(this.day)+1];
                    this.app.setState(LEAKYWEEK.day);
                } else if(this.day === 'sunday'){
                    var scene2 = this.setup(this.scenario.conversations[this.day], "conversation");
                    scene2.callback = function(){
                        var scene3 = this.setup(this.scenario.dayintros.end, "dayintro");
                        scene3.init();
                    }
                    scene2.init();
                } else{
                    var scene2 = this.setup(this.scenario.maps[this.day], "map");
                    scene2.callback = function(){
                        var scene3 = this.setup(this.scenario.conversations[this.day], "conversation");
                        scene3.callback = function(){
                            this.day = this.days[this.days.indexOf(this.day)+1];
                            this.app.setState(LEAKYWEEK.day);
                        }
                        scene3.init();
                    }
                    scene2.init();
                }
            }
            scene1.init();
        }
    },
    setup: function(scene, type, screenshot) {
        if(type === "dayintro" || screenshot) scene.screenshot = this.app.layer.cache();
        scene.parent = this;
        scene.init = function(){
            LEAKYWEEK[type].scene = scene;
            scene.parent.app.setState(LEAKYWEEK[type]);
        }
        return scene;
    }
}