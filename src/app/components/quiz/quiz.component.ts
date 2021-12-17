import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { QuizService } from 'src/app/services/quiz.service';
import { QUESTIONS } from 'src/mock-questions';

@Component({
	selector: 'app-quiz',
	templateUrl: './quiz.component.html',
	styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
	questions: any;
	currentQuestion: number = 0;
	correctAnswers: number = 0;
	inCorrectAnswers: number = 0;
	points: number = 0;
	unAnsweredQuestion: number;
	result: any = {};
	interval: any;
	counter: any = 600;
	timeLeft: any;
	timeConsumend: any;
	timerInterval: any;

	btnStyle: string;

	constructor(private quizService: QuizService, private router: Router) {}

	ngOnInit(): void {
		this.getQuestions();
		// this.counter = this.questions.length * 60;
		this.startCounter();
		this.unAnsweredQuestion = this.questions.length;
		console.log(this.questions);
	}

	getQuestions() {
		this.quizService.getQuestions().subscribe((data) => {
			console.log(data);
			return (this.questions = data);
		});
	}

	getPrevQuestion() {
		if (this.currentQuestion > 0) {
			this.currentQuestion--;
		}
	}

	getNextQuestion() {
		if (this.currentQuestion < this.questions.length - 1) {
			this.currentQuestion++;
		}
	}

	onSelectOption(currentQuestion: number, option: any) {
		if (option.correct) {
			this.correctAnswers++;
			this.points++;
			this.getNextQuestion();
		} else {
			this.inCorrectAnswers++;
			this.getNextQuestion();
		}
		this.unAnsweredQuestion = this.questions.length - this.inCorrectAnswers - this.correctAnswers;
		if (currentQuestion == this.questions.length - 1) {
			this.onSubmit();
		}
	}

	onSubmit() {
		clearInterval(this.timerInterval);
		localStorage.setItem(
			'result',
			JSON.stringify({
				answeredQuestions: this.correctAnswers + this.inCorrectAnswers,
				correctAnswers: this.correctAnswers,
				unAnsweredQuestion: this.unAnsweredQuestion,
				points: this.points,
				inCorrectAnswers: this.inCorrectAnswers,
				timeConsumend: this.timeConverter(600 - this.counter),
			})
		);
		this.router.navigateByUrl('/result');
	}

	timeConverter(counter: number) {
		let min: any;
		let sec: any;
		min = Math.floor(counter / 60);
		sec = counter % 60;
		if (min < 10 && min > 0) {
			min = `0${min}`;
		}
		if (sec < 10 && min > 0) {
			sec = `0${sec}`;
		}
		return `${min}:${sec}`;
	}

	startCounter() {
		this.timerInterval = setInterval(() => {
			this.counter--;
			this.timeLeft = this.timeConverter(this.counter);
			if (this.counter == 0) {
				this.onSubmit();
			}
		}, 1000);
	}
	stopCounter() {
		clearInterval(this.timerInterval);
		this.counter = 0;
	}
}
