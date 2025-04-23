import { livros } from './../mock-livros';
import { GeneroLiterario, Livro } from '../componentes/livro/livro';
import { ErroGeneroLiterario, LivroService } from './livro.service';

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
    const livrosEsperados = livros.filter(
      (livro) => livro.genero.id === 'romance'
    );
    expect(livrosPorGenero).toEqual(livrosEsperados);
  });

  it('deveria inicializar os gêneros corretamente', () => {
    const generosEsperados: GeneroLiterario[] = [
      { id: 'romance', value: 'Romance' },
      { id: 'misterio', value: 'Mistério' },
      { id: 'fantasia', value: 'Fantasia' },
      { id: 'ficcao-cientifica', value: 'Ficção Científica' },
      { id: 'tecnicos', value: 'Técnicos' },
    ];

    expect(service.generos).toEqual(generosEsperados);

  });

  it('deveria lançar um erro ao tentar cadastrar um livro com gênero desconhecido', () => {
    const livroInvalido: Livro = {
      classificacao: 5,
      titulo: 'Livro Inexistente',
      autoria: 'Autor Desconhecido',
      genero: { id: 'inexistente', value: 'Inexistente' },
      imagem: 'https://example.com/livro.jpg',
      dataLeitura: '2023-10-01',
    };

    expect(() => service.adicionarLivro(livroInvalido)).toThrow(ErroGeneroLiterario);
  });

});
