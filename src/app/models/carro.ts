import { Acessorio } from "./acessorio";
import { Marca } from "./marca";

export class Carro {

    id!: number;
    nome!: string;
    ano!: number;
    marca: Marca | null | undefined;
    acessorios: Acessorio[] = []

    constructor(nome: string, ano: number, marca: Marca | null){


      this.nome = nome;
      this.ano = ano;
      if(marca)this.marca = marca;

    }

}
