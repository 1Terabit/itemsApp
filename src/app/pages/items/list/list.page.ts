import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../../services/items.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Item } from '../../../interfaces/item.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class ListPage implements OnInit {
  items: any[] = [];

  constructor(
    private itemsService: ItemsService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.itemsService.getItems().subscribe({
      next: (data: any[]) => {
        this.items = data;
      },
      error: (error: any) => {
        console.error('Error:', error);
      }
    });
  }

  editItem(item: any) {
    this.router.navigate(['/items/edit', item.id]);
  }

  async deleteItem(item: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro que deseas eliminar este item?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.itemsService.deleteItem(item.id).subscribe({
              next: () => {
                this.loadItems(); // Recargar la lista después de eliminar
              },
              error: (error: any) => {
                console.error('Error al eliminar:', error);
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }
}
