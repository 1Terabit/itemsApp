import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from '../../../services/items.service';
import { Item } from '../../../interfaces/item.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  itemForm?: FormGroup;
  itemId?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private itemsService: ItemsService
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.itemId = Number(id);
      this.itemsService.getItem(this.itemId).subscribe({
        next: (item) => {
          this.initForm(item);
        },
        error: (error) => {
          console.error('Error al cargar el item:', error);
        }
      });
    }
  }

  initForm(item: Item) {
    this.itemForm = this.fb.group({
      title: [item.title, Validators.required],
      description: [item.description, Validators.required],
      price: [item.price, Validators.required]
    });
  }

  onSubmit() {
    if (this.itemForm?.valid && this.itemId) {
      console.log('Form values:', this.itemForm.value); // Debug

      const updatedItem: Item = {
        ...this.itemForm.value
      };

      console.log('Updated item:', updatedItem); // Debug

      this.itemsService.updateItem(this.itemId, updatedItem).subscribe({
        next: (response) => {
          console.log('Response:', response); // Debug
          this.router.navigate(['/items', this.itemId]);
        },
        error: (error) => {
          console.error('Error al actualizar el item:', error);
        }
      });
    }
  }
}

