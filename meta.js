module.exports = {
    "prompts": {
        "name": {
            "type": "input",
            "required": true,
            "message": "Project name"
        },
        "description": {
            "type": "input",
            "required": false,
            "message": "Project description",
            "default": "A Mtime web project"
        },
        "author": {
            "type": "input",
            "message": "Author"
        },
        // "router": {
        //     "type": "confirm",
        //     "message": "Install vue-router?"
        // },
        // "vuex": {
        //     "type": "confirm",
        //     "message": "Install vuex?"
        // },
        "elementUi": {
            "type": "confirm",
            "message": "Install element-ui?"
        },
        "elementTheme": {
            "when": "elementUi",
            "type": "confirm",
            "message": "Install element-theme?"
        }
    },
    "completeMessage": "开始开发"
};