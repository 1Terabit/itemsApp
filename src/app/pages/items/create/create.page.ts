import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemsService } from '../../../services/items.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  itemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private itemsService: ItemsService,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.itemForm.valid) {
      const newItem = {
        ...this.itemForm.value,
        price: Number(this.itemForm.value.price)
      };

      this.itemsService.createItem(newItem).subscribe({
        next: (response) => {
          this.router.navigate(['/items']);
        },
        error: (error) => {
          console.error('Error al crear el item:', error);
        }
      });
    }
  }
}
