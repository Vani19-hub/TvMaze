import { Pipe, PipeTransform } from '@angular/core';

import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {
  let pipe: OrderByPipe;

  beforeEach(() => {
    pipe = new OrderByPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
