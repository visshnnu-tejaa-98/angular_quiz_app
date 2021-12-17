import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { RegisterComponent } from './components/register/register.component';
import { ResultComponent } from './components/result/result.component';

const routes: Routes = [
	{ path: '', redirectTo: 'register', pathMatch: 'full' },
	{ path: 'register', component: RegisterComponent },
	{ path: 'quiz', component: QuizComponent },
	{ path: 'result', component: ResultComponent },
	{ path: '**', component: PageNotFoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
