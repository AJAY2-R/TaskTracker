import { AbstractControl,ValidatorFn,ValidationErrors } from "@angular/forms";

export function passwordStrength(min:number=8):ValidatorFn{
    return (control :AbstractControl ):ValidationErrors|null=>{
        const password=control.value;

        const hasNumbers=/\d/.test(password);
        const hasUpperCase=/[A-Z]/.test(password);
        const hasLowerCase=/[a-z]/.test(password);
        const hasSpecial=/[!@#$%^&*({}:",.")?+/*-]/.test(password);
        const isLength=password.length >=min

        const err:ValidationErrors={};

        if(!hasLowerCase)
            err["lowercase"]=true
        if(!hasUpperCase)
            err["uppercase"]=true
        if(!hasSpecial)
            err["specialCharacters"]=true
        if(!isLength)
            err["minLength"]=true
        if(!hasNumbers)
            err["numbers"]=true

        return Object.keys(err).length === 0 ? null : err
    }
}