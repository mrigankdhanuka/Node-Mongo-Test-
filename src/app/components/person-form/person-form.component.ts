import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PeopleService } from '../../services/people.service';
import { Person } from '../../models/person';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container">
      <h2>{{ isEditMode ? 'Edit Person' : 'Add Person' }}</h2>
      <form (ngSubmit)="onSubmit()" #personForm="ngForm">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" [(ngModel)]="person.name" required>
        </div>
        
        <div class="form-group">
          <label for="age">Age:</label>
          <input type="number" id="age" name="age" [(ngModel)]="person.age" required>
        </div>
        
        <div class="form-group">
          <label for="gender">Gender:</label>
          <select id="gender" name="gender" [(ngModel)]="person.gender" required>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="mobileNumber">Mobile Number:</label>
          <input type="tel" id="mobileNumber" name="mobileNumber" [(ngModel)]="person.mobileNumber" required>
        </div>
        
        <div class="button-group">
          <button type="submit" [disabled]="!personForm.form.valid">Save</button>
          <button type="button" (click)="cancel()">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 500px;
      margin: 0 auto;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    input, select {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
    }
    .button-group {
      margin-top: 20px;
    }
    button {
      padding: 10px 20px;
      margin-right: 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button[type="submit"] {
      background: #4CAF50;
      color: white;
    }
    button[type="button"] {
      background: #f44336;
      color: white;
    }
    button:disabled {
      background: #cccccc;
    }
  `]
})
export class PersonFormComponent implements OnInit {
  person: Person = {
    name: '',
    age: 0,
    gender: 'Male',
    mobileNumber: ''
  };
  isEditMode = false;

  constructor(
    private peopleService: PeopleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.peopleService.getPerson(id).subscribe(
        person => this.person = person
      );
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.peopleService.updatePerson(this.person._id!, this.person).subscribe(() => {
        this.router.navigate(['/people']);
      });
    } else {
      this.peopleService.createPerson(this.person).subscribe(() => {
        this.router.navigate(['/people']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/people']);
  }
}