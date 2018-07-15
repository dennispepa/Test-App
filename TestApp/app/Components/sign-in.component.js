"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var common_service_1 = require("../service/common.service");
var global_1 = require("../Shared/global");
var SignInComponent = /** @class */ (function () {
    function SignInComponent(fb, _commonService, _router) {
        this.fb = fb;
        this._commonService = _commonService;
        this._router = _router;
        this.indLoading = false;
    }
    SignInComponent.prototype.ngOnInit = function () {
        this.loginForm = this.fb.group({
            UserName: ['', forms_1.Validators.required],
            Password: ['', forms_1.Validators.required]
        });
        this.resetForm();
    };
    SignInComponent.prototype.resetForm = function () {
        this.loginForm.reset();
    };
    SignInComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.indLoading = true;
        this._commonService.post(global_1.Global.BASE_AUTH_ENDPOINT, formData.value).subscribe(function (data) {
            if (data == 1) {
                _this._router.navigate(["/forum"]);
            }
            else {
                _this.msg = "Incorrect username or password";
            }
            _this.indLoading = false;
        }, function (error) {
            _this.msg = error;
        });
        this.resetForm();
    };
    SignInComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/components/sign-in.component.html',
            providers: [common_service_1.CommonService]
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            common_service_1.CommonService,
            router_1.Router])
    ], SignInComponent);
    return SignInComponent;
}());
exports.SignInComponent = SignInComponent;
//# sourceMappingURL=sign-in.component.js.map