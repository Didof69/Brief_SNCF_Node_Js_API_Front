import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plant } from 'src/app/models/plant';
import { UpdatePlant } from 'src/app/models/updatePlant';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-plant-update',
  templateUrl: './plant-update.component.html',
  styleUrls: ['./plant-update.component.css'],
})
export class PlantUpdateComponent {
  @Output() updatedPlant = new EventEmitter();

  plant!: Plant;

  constructor(
    private route: ActivatedRoute,
    private plantService: PlantService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const routeParam = this.route.snapshot.paramMap;
    // console.log("route param : ",routeParam);
    const plantIdFromRoute = Number(routeParam.get('plantId'));
    // console.log('plantidfromroute : ', plantIdFromRoute);

    // console.log('plantservice : ', PlantService);

    this.plantService.getPlantsById(plantIdFromRoute).subscribe((plant) => {
      // console.log('ce que je recupère', plant.data);

      this.plant = plant.data;
      // console.log(this.plant);
    });
  }

  updatePlant(
    nom: string,
    soleil: string,
    arrosage: number,
    categorie: string,
    image: string
  ) {
    let retourApi!: UpdatePlant;
    let infoPlant = {
      nom: nom,
      soleil: soleil,
      arrosage: arrosage,
      categorie: categorie,
      image: image,
    };

    // console.log('info plante dans update', infoPlant);

    this.plantService
      .updatePlant(this.plant.id, infoPlant)
      .subscribe((resp) => {
        retourApi = resp.data;
        console.log('retour api update', retourApi);
        if (resp.status == 'OK') {
          alert(`La plante id ${this.plant.id} a été modifiée.`);
          this.router.navigate([`/plant/${this.plant.id}`]);
        }
      });
  }
}
