LEAKYWEEK.day = {
    enter: function(){
        var scenario = LEAKYWEEK.SCENARIOS[LEAKYWEEK.title.selection];
        this.day = 'monday';
        if(scenario.id === 0){
            var scene1 = this.setup(scenario.dayintros[this.day], "dayintro");
            scene1.callback = function(){
                var scene2 = this.setup(scenario.conversations[this.day], "conversation");
                scene2.callback = function(){
                    var scene3 = this.setup(scenario.maps[this.day], "map");
                    scene3.init();
                }
                scene2.init();
            }
            scene1.init();
        }
    },
    setup: function(scene, type, callback) {
        if(type != "map") scene.screenshot = this.app.layer.cache();
        scene.parent = this;
        scene.init = function(){
            LEAKYWEEK[type].scene = scene;
            scene.parent.app.setState(LEAKYWEEK[type]);
        }
        return scene;
    }
}