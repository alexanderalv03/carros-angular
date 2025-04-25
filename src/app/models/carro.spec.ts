import { Carro } from './carro';

describe('Carro', () => {
  it('should create an instance', () => {
    expect(new Carro("", 0)).toBeTruthy();
  });
});
