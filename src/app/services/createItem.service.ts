import { FormGroup, FormControl, Validators,FormBuilder,AbstractControl} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class CreateService
{
    baseUrl:String='http://localhost:8888';
    constructor(private fb:FormBuilder,private http:HttpClient) {}
    myForm=this.fb.group(
        {
            "name":["",[Validators.required,Validators.minLength(5),Validators.maxLength(15)]],
            "imageurl":["",[Validators.required]],
            "price": ["",[Validators.required]],
            "description": ["",[Validators.required]],
        }
    );

    getMyForm()
    {
        return this.myForm;
    }

    sendInformation(colors:String[],sizes:String[])
    {
        const body = {
            name:this.myForm.value.name, 
            imageUrl: this.myForm.value.imageurl,
            price:this.myForm.value.price,
            description:this.myForm.value.description,
            colors,
            sizes,
          
        };

console.log(body);
    }
}