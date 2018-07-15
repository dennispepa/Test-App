import { Component } from "@angular/core"

@Component({
    selector: "user-app",
    template: `
                <div>
                    <nav class='navbar navbar-inverse'>
                        <div class='container-fluid'>
                            <ul class='nav navbar-nav'>
                                <li><a [routerLink]="['signin']">Sign-In</a></li>
                                <li><a [routerLink]="['signup']">Sign-Up</a></li>
                            </ul>
                        </div>
                    </nav>
                    <div class='container'>
                        <router-outlet></router-outlet>
                    </div>
                 </div>
                <footer>
                    <p>&copy; Dennis Pepa</p>
                </footer>
                `
})

export class AppComponent {

}