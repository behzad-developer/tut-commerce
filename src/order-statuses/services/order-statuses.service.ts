import { Injectable } from '@nestjs/common';
import { CreateOrderStatusDto } from '../dto/create-order-status.dto';
import { UpdateOrderStatusDto } from '../dto/update-order-status.dto';

@Injectable()
export class OrderStatusesService {
  create(createOrderStatusDto: CreateOrderStatusDto) {
    return 'This action adds a new orderStatus';
  }

  findAll() {
    return `This action returns all orderStatuses`;
  }

  update(id: number, updateOrderStatusDto: UpdateOrderStatusDto) {
    return `This action updates a #${id} orderStatus`;
  }
}
