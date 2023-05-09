import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';


@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.scss']
})
export class CoursesFormComponent implements OnInit{

  form: FormGroup;

  constructor(
    private formBulider:FormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute){
    this.form = this.formBulider.group({
      _id: [''],
      name: [null],
      category: [null]
    });
  }

  onSubmit(){
    this.service.save(this.form.value)
    .subscribe(result => this.onSucces(), error => this.onError());
  }

  onCancel(){
    this.location.back();
  }

  private  onError(){
    this.snackBar.open('Error ao salvar curso', '', {duration: 5000});
  }

  private onSucces(){
    this.snackBar.open('Curso salvo com sucesso', '', {duration: 5000});
    this.location.back();
  }

  ngOnInit(): void {
    const course:Course = this.route.snapshot.data['course'];
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category
    })
  }

}
