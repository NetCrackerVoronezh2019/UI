import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable} from '@angular/core';

@Injectable()
export class GroupListService
{
    constructor(private http: HttpClient, private fb:FormBuilder) {}

    groupCreationForm=this.fb.group(
            {
                "groupSection":[""],
                "groupName":["",[Validators.required,Validators.minLength(5),Validators.maxLength(15)]]
            }
          )
    groupSearchPanel=this.fb.group(
            {
                "groupSection":[""],
                "searchName":["",[Validators.maxLength(15)]]
            }
        )



    getUser() {
      return this.http.get('http://localhost:9080/userAndGroup/getThisUser',
                          {params:new HttpParams()});
      }
      
    getGroupCreationForm(): FormGroup  {
       return this.groupCreationForm;
      }
    getGroupSearchPanel():FormGroup {
      return this.groupSearchPanel;
    }

    showGroupList() {
      return this.http.get('http://localhost:9080/groups/getThisUserGroups',{params:new HttpParams()})
    }

   CreateGroup(){
            const body = {
                       name: this.groupCreationForm.value.groupName,
                       subjectName: this.groupCreationForm.value.groupSection
                  };
        return this.http.post('http://localhost:9080/userAndGroup/createGroup/',body);

    }

    search() {
      const name =this.groupSearchPanel.value.searchName;
      return this.http.get('http://localhost:9080/group/search',{params:new HttpParams().set('name',name).set("subjectName",this.groupSearchPanel.value.groupSection)})
    }

    getAllSubjects() {
      return this.http.get('http://localhost:9080/groups/getAllSubjects')
    }
}