import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from '../../../services/items.service';
import { Item } from '../../../interfaces/item.interface';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  item?: Item;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemsService: ItemsService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.itemsService.getItem(Number(id)).subscribe({
        next: (data) => {
          this.item = {
            ...data,
            price: Number(data.price)
          };
        },
        error: (error) => {
          console.error('Error al cargar el item:', error);
        }
      });
    }
  }

  async deleteItem() {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Está seguro que desea eliminar este item?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            if (this.item?.id) {
              this.itemsService.deleteItem(this.item.id).subscribe({
                next: () => {
                  this.router.navigate(['/items']);
                },
                error: (error) => {
                  console.error('Error al eliminar el item:', error);
                }
              });
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
