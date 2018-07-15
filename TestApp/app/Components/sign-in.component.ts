import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../service/common.service';
import { Global } from '../Shared/global';

@Component({
    templateUrl: 'app/components/sign-in.component.html',
    providers: [CommonService]
})
export class SignInComponent implements OnInit {
    loginForm: FormGroup;
    msg: string;
    indLoading: boolean = false;

    constructor(private fb: FormBuilder,
                private _commonService: CommonService,
                private _router: Router) { }

    ngOnInit() {
        this.loginForm = this.fb.group({
            UserName: ['', Validators.required],
            Password: ['', Validators.required]
        });

        this.resetForm();
    }

    resetForm() {
        this.loginForm.reset();
    }

    onSubmit(formData: any) {
        this.indLoading = true;
        this._commonService.post(Global.BASE_AUTH_ENDPOINT, formData.value).subscribe(
            data => {
                if (data == 1) {
                    this._router.navigate(["/forum"]); 
                }
                else {
                    this.msg = "Incorrect username or password";
                }

                this.indLoading = false;
            },
            error => {
                this.msg = error;
            }
        );

        this.resetForm();
    }
}

