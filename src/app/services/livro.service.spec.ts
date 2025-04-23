import { livros } from './../mock-livros';
import { Livro } from '../componentes/livro/livro';
import { LivroService } from './livro.service';

describe('LivroService', () => {
  let service: LivroService;

  beforeEach(() => {
    service = new LivroService();
  });

  it('deveria ser criado', () => {
    expect(service).toBeTruthy();
  });

  //AAA Arrange Act Assert
  it('deveria adicionar um novo livro', () => {
    const novoLivro: Livro = {
      classificacao: 5,
      titulo: 'O Senhor dos Anéis',
      autoria: 'J.R.R. Tolkien',
      genero: { id: 'romance', value: 'Romance' },
      imagem: 'https://example.com/livro.jpg',
      dataLeitura: '2023-10-01',
    };

    service.adicionarLivro(novoLivro);
    const livrosPorGenero = service.obterLivrosPorGenero('romance');
    expect(livrosPorGenero).toContain(novoLivro);
  });

  it('deveria recuperar corretamente os livros por gênero', () => {
    const livrosPorGenero = service.obterLivrosPorGenero('romance');
    const livrosEsperados = livros.filter(livro => livro.genero.id === 'romance');
    expect(livrosPorGenero).toEqual(livrosEsperados);
  });
});
