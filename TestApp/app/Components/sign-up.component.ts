import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../service/common.service';
import { Global } from '../Shared/global';

@Component({
    templateUrl: 'app/components/sign-up.component.html',
    providers: [CommonService]
})
export class SignUpComponent implements OnInit {
    userRegistrationForm: FormGroup;
    msg: string;
    indLoading: boolean = false;
    emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

    constructor(private fb: FormBuilder, private _commonService: CommonService) { }

    ngOnInit() {
        this.userRegistrationForm = this.fb.group({
            Id: [''],
            UserName: ['', Validators.required],
            Password: ['', Validators.required],
            FirstName: ['', Validators.required],
            LastName: ['', Validators.required]
        });

        this.resetForm();
    }

    resetForm() {
        this.userRegistrationForm.reset();
    }

    onSubmit(formData: any) {
        this.indLoading = true;
        this._commonService.post(Global.BASE_USER_ENDPOINT, formData.value).subscribe(
            data => {
                if (data == 1)
                {
                    this.msg = "Registration Successful!";
                }
                else {
                    this.msg = "Oops! Something went wrong.";
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
