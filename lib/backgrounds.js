var backgrounds = {
    "home": "/img/puppy1.jpg",
    "about": "/img/aboutpuppy.jpg",
    "error": "/img/sadpuppy.jpg",
    "upload": "/img/poolpuppy.jpg"
};

exports.getBackground = function(name) {
    return backgrounds[name];
};