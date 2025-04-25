import { Marca } from "./marca";

export class Carro {

    id!: number;
    nome!: string;
    ano!: number;
    marca: Marca | null | undefined;

    constructor(nome: string, ano: number, marca: Marca | null){


      this.nome = nome;
      this.ano = ano;
      if(marca)this.marca = marca;

    }

}
