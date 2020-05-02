import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Cases } from '../model/cases';

@Component({
  selector: 'app-cases-details',
  templateUrl: './cases-details.component.html',
  styleUrls: ['./cases-details.component.scss']
})
export class CasesDetailsComponent implements OnInit {

  cases: Cases = { id: '', name: '', gender: '', age: null, address: '', city: '', country: '', status: '', updated: null };
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getCasesDetails(this.route.snapshot.params.id);
  }

  getCasesDetails(id: string) {
    this.api.getCasesById(id)
      .subscribe((data: any) => {
        this.cases = data;
        console.log(this.cases);
        this.isLoadingResults = false;
      });
  }

  deleteCases(id: any) {
    this.isLoadingResults = true;
    this.api.deleteCases(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/cases']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
