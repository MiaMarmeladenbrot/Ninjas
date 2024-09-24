import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';

@Controller('ninjas') //--> prefix /ninjas for all routes
export class NinjasController {
  // instantiate an instance of the ninja-service:
  constructor(private readonly ninjasService: NinjasService) {}

  // GET /ninjas?weapon=stars => [] with a query
  @Get() // --> decorator that announces that the following function is a http-get-route
  // create a function for getting all ninjas
  getNinjas(@Query('weapon') weapon: 'stars' | 'nunchucks') {
    return this.ninjasService.getNinjas(weapon);
  }

  // GET /ninjas/:id => {}
  @Get(':id')
  // param-decorator takes the parameter from the Get-Decorator and transports it into the get-function:
  getOneNinja(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.ninjasService.getNinja(id);
    } catch (error) {
      console.log(error);
      throw new NotFoundException();
    }
  }

  // POST /ninjas
  @Post()
  createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    return this.ninjasService.createNinja(createNinjaDto);
  }

  // PATCH /ninjas/:id => {}
  @Put(':id')
  updateNinja(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNinjaDto: UpdateNinjaDto,
  ) {
    return this.ninjasService.updateNinja(+id, updateNinjaDto);
  }

  // DELETE /ninjas/:id
  @Delete(':id')
  deleteNinja(@Param('id', ParseIntPipe) id: number) {
    console.log(id);

    return this.ninjasService.removeNinja(id);
  }
}
