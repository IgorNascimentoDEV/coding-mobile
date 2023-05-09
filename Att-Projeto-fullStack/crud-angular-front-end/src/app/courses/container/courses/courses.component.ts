import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit{

  public courses$!: Observable<Course[]>;



  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router:Router,
    private route:ActivatedRoute,
    private snackBar: MatSnackBar
    ) {

    this.refresh();
  }

  private refresh(){
    this.courses$ = this.coursesService.list().pipe(
      catchError(error => {
        this.onError('Erro ao carregar cursos.')
        return of ([])
      })
    )
  }

  public onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  public onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  public onEdit(curso:Course){
    this.router.navigate(['edit', curso._id], {relativeTo: this.route})
  }

  public onRemove(curso:Course){
    this.coursesService.remove(curso._id).subscribe(
      () => {
        this.refresh();
        this.snackBar.open('Curso removido com sucesso', 'X', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      },
      error => this.onError('Error ao tentar remover curso')
    );
  }

  ngOnInit(): void {}


}
