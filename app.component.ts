import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ProfessorSub} from "./professor-sub";
import {MatTableModule} from '@angular/material/table';
import {AppService} from "./app.service";
import {Professor} from "./professor";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatInputModule, MatTableModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {professors: Professor[] = [];
  professorSub: ProfessorSub | undefined;
  dataSource: ProfessorSub[] = [];
  private readonly service: AppService;

  constructor(service: AppService) {
    this.service = service;
    this.getAllProfessor();
  }

  formControl = new FormControl<ProfessorSub | null>(null, Validators.required);
  displayedColumns: string[] = ['ID', 'Nombre', 'Asignaturas', 'Estudiantes'];

  getAllProfessor() {
    this.service.getAllProfessor().subscribe({
      next: (data) => {
        this.professors = data;
      },
      error: (error) => {
        console.error('Error fetching professor data', error);
      },
      complete: () => {
        console.log('Complete');
      }
    });
  }

  execute(id: number | undefined) {
    this.service.getProfessor(id).subscribe({
      next: (data) => {
        this.professorSub = data;

        if (this.dataSource != null)
          this.dataSource = [];

        if (this.professorSub)
          this.dataSource = [...this.dataSource, this.professorSub];
      },
      error: (error) => {
        console.error('Error fetching professor details', error);
      }
    });
  }
}
