import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-result',
	templateUrl: './result.component.html',
	styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
	result: any;
	constructor(private router: Router) {}

	ngOnInit(): void {
		this.getResult();
		console.log(this.result);
	}

	getResult() {
		this.result = JSON.parse(localStorage.getItem('result')!);
	}

	logout() {
		localStorage.removeItem('user');
		localStorage.removeItem('result');
		this.router.navigateByUrl('/');
	}
}
