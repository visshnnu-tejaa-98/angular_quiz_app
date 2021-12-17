import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
	name: string;
	email: string;

	constructor(private router: Router) {}

	ngOnInit(): void {}

	registerUser() {
		console.log(this.name, this.email);
		localStorage.setItem('user', JSON.stringify({ name: this.name, email: this.email }));
		this.router.navigateByUrl('/quiz');
	}
}
