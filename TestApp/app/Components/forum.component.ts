import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../service/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';
import { Forum } from '../model/forum';

@Component({
    templateUrl: 'app/components/forum.component.html',
    providers: [CommonService]
})

export class ForumComponent implements OnInit {

    @ViewChild('modal') modal: ModalComponent;
    forums: Forum[];
    forum: Forum;
    msg: string;
    indLoading: boolean = false;
    forumFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;

    constructor(private fb: FormBuilder, private _commonService: CommonService) { }

    ngOnInit(): void {
        this.forumFrm = this.fb.group({
            Id: [''],
            Title: ['', Validators.required],
            Description: ['']
        });
        this.LoadForums();
    }

    LoadForums(): void {
        this.indLoading = true;
        this._commonService.get(Global.BASE_FORUM_ENDPOINT)
            .subscribe(forums => { this.forums = forums; this.indLoading = false; },
            error => this.msg = <any>error);
    }

    addForum() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Forum";
        this.modalBtnTitle = "Add";
        this.forumFrm.reset();
        this.modal.open();
    }

    editForum(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Forum";
        this.modalBtnTitle = "Update";
        this.forum = this.forums.filter(x => x.Id == id)[0];
        this.forumFrm.setValue(this.forum);
        this.modal.open();
    }

    deleteForum(id: number) {
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.forum = this.forums.filter(x => x.Id == id)[0];
        this.forumFrm.setValue(this.forum);
        this.modal.open();
    }

    onSubmit(formData: any) {
        this.msg = "";
   
        switch (this.dbops) {
            case DBOperation.create:
                this._commonService.post(Global.BASE_FORUM_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully added.";
                            this.LoadForums();
                        }
                        else
                        {
                            this.msg = "Oops! Something went wrong.";
                        }
                        
                        this.modal.dismiss();
                    },
                    error => {
                      this.msg = error;
                    }
                );
                break;
            case DBOperation.update:
                this._commonService.put(Global.BASE_FORUM_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully updated.";
                            this.LoadForums();
                        }
                        else {
                            this.msg = "Oops! Something went wrong.";
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.delete:
                this._commonService.delete(Global.BASE_FORUM_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully deleted.";
                            this.LoadForums();
                        }
                        else {
                            this.msg = "Oops! Something went wrong.";
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;

        }
    }

    SetControlsState(isEnable: boolean)
    {
        isEnable ? this.forumFrm.enable() : this.forumFrm.disable();
    }
}