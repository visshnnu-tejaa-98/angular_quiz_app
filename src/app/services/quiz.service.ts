import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class QuizService {
	constructor(private http: HttpClient) {}

	getQuestions() {
		let apiUrl = 'http://localhost:5000/questions';
		return this.http.get(apiUrl);
	}
}
