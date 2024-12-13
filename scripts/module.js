Hooks.once('init', async function() {

});

Hooks.once('ready', async function() {

});


Hooks.on('updateActor', async function(actor, data, options) { 

    const portraitImagePath = actor.img;
    const tokenImagePath = actor.prototypeToken.texture.src;
    const actorId = actor.id;
    const tokens = game.canvas.tokens.placeables.filter(function(token){ return token.actor?.id === actorId});


    if (data.prototypeToken?.texture?.src !== undefined) {
        console.log("Token updated. Updating portrait to match.");
        await actor.update({img: tokenImagePath});
        await tokens.forEach(function(token) {
            token.img = tokenImagePath;
        });
    };

    if (data.img !== undefined) {
        console.log("Portrait updated. Updating token to match.");
        await actor.update({"prototypeToken.texture.src": portraitImagePath});
        await tokens.forEach(async function(token) {
            token.document.update({"texture.src": portraitImagePath});
        });
    };

    return true;
});