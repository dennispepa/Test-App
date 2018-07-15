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
var common_service_1 = require("../service/common.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../Shared/enum");
var global_1 = require("../Shared/global");
var ForumComponent = /** @class */ (function () {
    function ForumComponent(fb, _commonService) {
        this.fb = fb;
        this._commonService = _commonService;
        this.indLoading = false;
    }
    ForumComponent.prototype.ngOnInit = function () {
        this.forumFrm = this.fb.group({
            Id: [''],
            Title: ['', forms_1.Validators.required],
            Description: ['']
        });
        this.LoadForums();
    };
    ForumComponent.prototype.LoadForums = function () {
        var _this = this;
        this.indLoading = true;
        this._commonService.get(global_1.Global.BASE_FORUM_ENDPOINT)
            .subscribe(function (forums) { _this.forums = forums; _this.indLoading = false; }, function (error) { return _this.msg = error; });
    };
    ForumComponent.prototype.addForum = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Forum";
        this.modalBtnTitle = "Add";
        this.forumFrm.reset();
        this.modal.open();
    };
    ForumComponent.prototype.editForum = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Forum";
        this.modalBtnTitle = "Update";
        this.forum = this.forums.filter(function (x) { return x.Id == id; })[0];
        this.forumFrm.setValue(this.forum);
        this.modal.open();
    };
    ForumComponent.prototype.deleteForum = function (id) {
        this.dbops = enum_1.DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.forum = this.forums.filter(function (x) { return x.Id == id; })[0];
        this.forumFrm.setValue(this.forum);
        this.modal.open();
    };
    ForumComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._commonService.post(global_1.Global.BASE_FORUM_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data == 1) //Success
                     {
                        _this.msg = "Data successfully added.";
                        _this.LoadForums();
                    }
                    else {
                        _this.msg = "Oops! Something went wrong.";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.update:
                this._commonService.put(global_1.Global.BASE_FORUM_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data == 1) //Success
                     {
                        _this.msg = "Data successfully updated.";
                        _this.LoadForums();
                    }
                    else {
                        _this.msg = "Oops! Something went wrong.";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.delete:
                this._commonService.delete(global_1.Global.BASE_FORUM_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data == 1) //Success
                     {
                        _this.msg = "Data successfully deleted.";
                        _this.LoadForums();
                    }
                    else {
                        _this.msg = "Oops! Something went wrong.";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
        }
    };
    ForumComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.forumFrm.enable() : this.forumFrm.disable();
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], ForumComponent.prototype, "modal", void 0);
    ForumComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/components/forum.component.html',
            providers: [common_service_1.CommonService]
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, common_service_1.CommonService])
    ], ForumComponent);
    return ForumComponent;
}());
exports.ForumComponent = ForumComponent;
//# sourceMappingURL=forum.component.js.map