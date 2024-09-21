import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable() // => signifies a service-file, tells nestjs that this is a class it's in charge of instantiating
// => nextjs automatically injects this to the controller behind the scenes
export class NinjasService {
  private ninjas = [
    { id: 0, name: 'Ninja A', weapon: 'stars' },
    { id: 1, name: 'Ninja B', weapon: 'nunchucks' },
  ];

  getNinjas(weapon?: 'stars' | 'nunchucks') {
    if (weapon) {
      return this.ninjas.filter((ninja) => ninja.weapon === weapon);
    }

    return this.ninjas;
  }

  getNinja(id: number) {
    const ninja = this.ninjas.filter(
      (ninja) => ninja.id.toString() === id.toString(),
    );

    if (ninja.length === 0) {
      throw new Error('ninja not found');
    }

    return ninja;
  }

  createNinja(createNinjaDto: CreateNinjaDto) {
    const newNinja = {
      id: Date.now(),
      ...createNinjaDto,
    };

    this.ninjas.push(newNinja);
    return newNinja;
  }

  updateNinja(id: number, updateNinjaDto: UpdateNinjaDto) {
    this.ninjas = this.ninjas.map((ninja) => {
      if (ninja.id.toString() === id.toString()) {
        return { ...ninja, ...updateNinjaDto };
      }
      return ninja;
    });
    return this.getNinja(id);
  }

  removeNinja(id: number) {
    const removedNinja = this.getNinja(id);
    this.ninjas = this.ninjas.filter(
      (ninja) => ninja.id.toString() !== id.toString(),
    );
    return removedNinja;
  }
}
