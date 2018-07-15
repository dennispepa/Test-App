"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var sign_in_component_1 = require("./components/sign-in.component");
var sign_up_component_1 = require("./components/sign-up.component");
var forum_component_1 = require("./components/forum.component");
var appRoutes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'signin', component: sign_in_component_1.SignInComponent },
    { path: 'signup', component: sign_up_component_1.SignUpComponent },
    { path: 'forum', component: forum_component_1.ForumComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map